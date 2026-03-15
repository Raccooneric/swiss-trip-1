// Switzerland Travel PWA — Main Application
(function () {
  'use strict';

  // ---- State ----
  let itinerary = loadItinerary();
  let editMode = false;
  let weatherCache = {};

  // ---- Weather (Open-Meteo) ----
  const WMO_CODES = {
    0: { icon: '☀️', desc: '晴天' },
    1: { icon: '🌤️', desc: '大致晴朗' },
    2: { icon: '⛅', desc: '局部多雲' },
    3: { icon: '☁️', desc: '多雲' },
    45: { icon: '🌫️', desc: '有霧' },
    48: { icon: '🌫️', desc: '霧凇' },
    51: { icon: '🌦️', desc: '小毛雨' },
    53: { icon: '🌦️', desc: '中毛雨' },
    55: { icon: '🌧️', desc: '大毛雨' },
    56: { icon: '🌧️', desc: '凍毛雨' },
    57: { icon: '🌧️', desc: '凍雨' },
    61: { icon: '🌧️', desc: '小雨' },
    63: { icon: '🌧️', desc: '中雨' },
    65: { icon: '🌧️', desc: '大雨' },
    66: { icon: '🌧️', desc: '凍雨' },
    67: { icon: '🌧️', desc: '凍大雨' },
    71: { icon: '🌨️', desc: '小雪' },
    73: { icon: '🌨️', desc: '中雪' },
    75: { icon: '❄️', desc: '大雪' },
    77: { icon: '❄️', desc: '雪粒' },
    80: { icon: '🌦️', desc: '陣雨' },
    81: { icon: '🌧️', desc: '中陣雨' },
    82: { icon: '⛈️', desc: '大陣雨' },
    85: { icon: '🌨️', desc: '小陣雪' },
    86: { icon: '❄️', desc: '大陣雪' },
    95: { icon: '⛈️', desc: '雷暴' },
    96: { icon: '⛈️', desc: '雷暴伴冰雹' },
    99: { icon: '⛈️', desc: '雷暴伴大冰雹' }
  };

  function getWeatherInfo(code) {
    return WMO_CODES[code] || { icon: '🌡️', desc: '未知' };
  }

  async function fetchWeather(lat, lon, date) {
    const cacheKey = `${lat},${lon},${date}`;
    if (weatherCache[cacheKey]) return weatherCache[cacheKey];

    try {
      const dateStr = formatDateForAPI(date);
      // Use forecast for next 16 days, otherwise historical
      const today = new Date();
      const targetDate = parseDateString(date);
      const diffDays = Math.floor((targetDate - today) / (1000 * 60 * 60 * 24));

      let url;
      if (diffDays >= 0 && diffDays <= 16) {
        url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=Europe/Zurich&start_date=${dateStr}&end_date=${dateStr}`;
      } else {
        // Historical or too far ahead — try forecast anyway
        url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max,temperature_2m_min,precipitation_sum,windspeed_10m_max&timezone=Europe/Zurich&start_date=${dateStr}&end_date=${dateStr}`;
      }

      const response = await fetch(url);
      if (!response.ok) throw new Error('Weather API error');
      const data = await response.json();

      if (data.daily && data.daily.time && data.daily.time.length > 0) {
        const result = {
          code: data.daily.weathercode[0],
          tempMax: Math.round(data.daily.temperature_2m_max[0]),
          tempMin: Math.round(data.daily.temperature_2m_min[0]),
          precipitation: data.daily.precipitation_sum[0],
          windSpeed: Math.round(data.daily.windspeed_10m_max[0]),
          date: dateStr
        };
        weatherCache[cacheKey] = result;
        return result;
      }
    } catch (e) {
      console.warn('Weather fetch failed:', e);
    }
    return null;
  }

  function parseDateString(dateStr) {
    // Handle "2026/3/22（日）" format
    const match = dateStr.match(/(\d{4})\/(\d{1,2})\/(\d{1,2})/);
    if (match) {
      return new Date(parseInt(match[1]), parseInt(match[2]) - 1, parseInt(match[3]));
    }
    return new Date(dateStr);
  }

  function formatDateForAPI(dateStr) {
    const d = parseDateString(dateStr);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  // ---- Rendering ----
  function renderApp() {
    const container = document.getElementById('day-list');
    container.innerHTML = '';

    itinerary.forEach((day, dayIndex) => {
      const card = document.createElement('div');
      card.className = 'day-card';
      card.id = `day-${day.dayNumber}`;

      // Header
      const header = document.createElement('div');
      header.className = 'day-card-header';
      header.innerHTML = `
        <div class="day-number">
          <span class="label">Day</span>
          <span class="num">${day.dayNumber}</span>
        </div>
        <div class="day-info">
          <div class="day-date">${day.date}</div>
          <div class="day-location">${day.base}</div>
          ${day.zone ? `<div class="day-zone">📍 ${day.zone}</div>` : ''}
        </div>
        <div class="weather-badge" id="weather-badge-${day.dayNumber}">
          <div class="weather-loading"></div>
        </div>
        <div class="day-chevron">›</div>
      `;

      header.addEventListener('click', () => toggleDay(card, day));

      // Detail
      const detail = document.createElement('div');
      detail.className = 'day-detail';
      detail.innerHTML = `<div class="day-detail-inner" id="detail-inner-${day.dayNumber}"></div>`;

      card.appendChild(header);
      card.appendChild(detail);
      container.appendChild(card);

      // Fetch weather
      loadWeatherForDay(day);
    });
  }

  function toggleDay(card, day) {
    const wasExpanded = card.classList.contains('expanded');
    // Close all others
    document.querySelectorAll('.day-card.expanded').forEach(c => {
      c.classList.remove('expanded');
    });

    if (!wasExpanded) {
      card.classList.add('expanded');
      renderDayDetail(day);
      // Smooth scroll to card
      setTimeout(() => {
        card.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }

  function renderDayDetail(day) {
    const inner = document.getElementById(`detail-inner-${day.dayNumber}`);
    if (!inner) return;

    const dayIndex = itinerary.findIndex(d => d.dayNumber === day.dayNumber);

    let html = '';

    // Weather detail section
    html += `<div class="weather-detail" id="weather-detail-${day.dayNumber}">
      <div style="text-align:center;padding:8px;color:var(--color-text-secondary);font-size:var(--font-size-sm)">載入天氣中...</div>
    </div>`;

    // Activities
    if (editMode) {
      html += renderEditActivities(day, dayIndex);
    } else {
      html += renderViewActivities(day);
    }

    inner.innerHTML = html;

    // Render weather detail
    renderWeatherDetail(day);

    // Bind edit events if in edit mode
    if (editMode) {
      bindEditEvents(dayIndex);
    }
  }

  function renderViewActivities(day) {
    let html = '';
    day.activities.forEach((act, actIndex) => {
      html += `<div class="activity-item">`;

      if (act.route) {
        html += `<div class="activity-route">🚂 ${escapeHTML(act.route)}</div>`;
      }

      if (act.transport) {
        html += `<div class="activity-transport">🎫 ${escapeHTML(act.transport)}</div>`;
      }

      if (act.departTime || act.travelTime) {
        const parts = [];
        if (act.departTime) parts.push(`🕐 出發 ${escapeHTML(act.departTime)}`);
        if (act.travelTime) parts.push(`⏱️ ${escapeHTML(act.travelTime)}`);
        html += `<div style="font-size:var(--font-size-sm);color:var(--color-text-secondary);margin-bottom:var(--spacing-sm)">${parts.join(' · ')}</div>`;
      }

      if (act.mainActivities) {
        html += `<div class="activity-description">${escapeHTML(act.mainActivities)}</div>`;
      }

      if (act.notes) {
        html += `<div class="activity-notes">${escapeHTML(act.notes)}</div>`;
      }

      if (act.foodRecommendations) {
        html += `<div class="activity-food">${escapeHTML(act.foodRecommendations)}</div>`;
      }

      // Action buttons
      const buttons = [];

      if (act.route) {
        // Google Maps link
        const query = encodeURIComponent(act.route.split('→').pop().split('->').pop().trim());
        buttons.push(`<a href="https://maps.google.com/?q=${query}" class="action-btn maps" target="_blank" rel="noopener">📍 Google Maps</a>`);

        // SBB link
        const routeParts = act.route.split(/→|->/).map(s => s.trim());
        if (routeParts.length >= 2) {
          const from = encodeURIComponent(routeParts[0]);
          const to = encodeURIComponent(routeParts[routeParts.length - 1]);
          buttons.push(`<a href="https://www.sbb.ch/en/buying/pages/fahrplan/fahrplan.xhtml?von=${from}&nach=${to}" class="action-btn sbb" target="_blank" rel="noopener">🚆 SBB</a>`);
        }
      }

      if (act.referenceUrl) {
        buttons.push(`<a href="${escapeHTML(act.referenceUrl)}" class="action-btn ref" target="_blank" rel="noopener">🔗 參考資訊</a>`);
      }

      if (day.accommodation && actIndex === 0) {
        const accomUrl = day.accommodation.startsWith('http') ? day.accommodation : '#';
        if (accomUrl !== '#') {
          buttons.push(`<a href="${escapeHTML(accomUrl)}" class="action-btn accommodation" target="_blank" rel="noopener">🏨 住宿地點</a>`);
        }
      }

      if (buttons.length > 0) {
        html += `<div class="action-buttons">${buttons.join('')}</div>`;
      }

      html += `</div>`; // .activity-item
    });
    return html;
  }

  function renderEditActivities(day, dayIndex) {
    let html = '';
    day.activities.forEach((act, actIndex) => {
      html += `<div class="activity-item" data-day="${dayIndex}" data-act="${actIndex}">`;
      html += `<button class="btn-delete-activity" onclick="deleteActivity(${dayIndex}, ${actIndex})" title="刪除">✕</button>`;

      html += `<label class="edit-field-label">路線 Route</label>`;
      html += `<textarea class="edit-field" data-field="route" rows="2">${escapeHTML(act.route || '')}</textarea>`;

      html += `<div class="edit-field-row">`;
      html += `<div style="flex:1"><label class="edit-field-label">交通</label><textarea class="edit-field" data-field="transport" rows="1">${escapeHTML(act.transport || '')}</textarea></div>`;
      html += `<div style="flex:1"><label class="edit-field-label">出發時間</label><textarea class="edit-field" data-field="departTime" rows="1">${escapeHTML(act.departTime || '')}</textarea></div>`;
      html += `</div>`;

      html += `<label class="edit-field-label">主要活動</label>`;
      html += `<textarea class="edit-field" data-field="mainActivities" rows="4">${escapeHTML(act.mainActivities || '')}</textarea>`;

      html += `<label class="edit-field-label">注意事項</label>`;
      html += `<textarea class="edit-field" data-field="notes" rows="2">${escapeHTML(act.notes || '')}</textarea>`;

      html += `<label class="edit-field-label">飲食推薦</label>`;
      html += `<textarea class="edit-field" data-field="foodRecommendations" rows="2">${escapeHTML(act.foodRecommendations || '')}</textarea>`;

      html += `<label class="edit-field-label">參考連結</label>`;
      html += `<textarea class="edit-field" data-field="referenceUrl" rows="1">${escapeHTML(act.referenceUrl || '')}</textarea>`;

      html += `</div>`;
    });

    html += `<button class="btn-add-activity" onclick="addActivity(${dayIndex})">＋ 新增活動</button>`;
    return html;
  }

  function bindEditEvents(dayIndex) {
    const fields = document.querySelectorAll(`.activity-item[data-day="${dayIndex}"] .edit-field`);
    fields.forEach(field => {
      field.addEventListener('input', () => {
        const actIndex = parseInt(field.closest('.activity-item').dataset.act);
        const fieldName = field.dataset.field;
        itinerary[dayIndex].activities[actIndex][fieldName] = field.value;
        saveItinerary(itinerary);
      });
    });
  }

  // ---- Weather rendering ----
  async function loadWeatherForDay(day) {
    const weather = await fetchWeather(day.lat, day.lon, day.date);
    const badge = document.getElementById(`weather-badge-${day.dayNumber}`);
    if (!badge) return;

    if (weather) {
      const info = getWeatherInfo(weather.code);
      badge.innerHTML = `
        <span class="weather-icon">${info.icon}</span>
        <span class="weather-temp">${weather.tempMax}°</span>
      `;
    } else {
      badge.innerHTML = `<span style="font-size:12px;color:var(--color-text-tertiary)">—</span>`;
    }
  }

  async function renderWeatherDetail(day) {
    const container = document.getElementById(`weather-detail-${day.dayNumber}`);
    if (!container) return;

    const weather = await fetchWeather(day.lat, day.lon, day.date);
    if (!weather) {
      container.innerHTML = `<div style="text-align:center;padding:8px;color:var(--color-text-secondary);font-size:var(--font-size-sm)">⚠️ 天氣資料暫時無法取得</div>`;
      return;
    }

    const info = getWeatherInfo(weather.code);
    container.innerHTML = `
      <div class="weather-detail-header">
        <span class="weather-detail-icon">${info.icon}</span>
        <div>
          <div class="weather-detail-temp">${weather.tempMax}° / ${weather.tempMin}°</div>
          <div class="weather-detail-desc">${info.desc}</div>
        </div>
      </div>
      <div class="weather-detail-grid">
        <div class="weather-stat">
          <div class="stat-label">降水</div>
          <div class="stat-value">💧 ${weather.precipitation}mm</div>
        </div>
        <div class="weather-stat">
          <div class="stat-label">風速</div>
          <div class="stat-value">💨 ${weather.windSpeed}km/h</div>
        </div>
        <div class="weather-stat">
          <div class="stat-label">最低溫</div>
          <div class="stat-value">🌡️ ${weather.tempMin}°C</div>
        </div>
      </div>
    `;
  }

  // ---- Edit helpers ----
  window.addActivity = function (dayIndex) {
    itinerary[dayIndex].activities.push({
      route: '',
      transport: '',
      departTime: '',
      travelTime: '',
      referenceUrl: '',
      mainActivities: '',
      notes: '',
      foodRecommendations: ''
    });
    saveItinerary(itinerary);
    renderDayDetail(itinerary[dayIndex]);
    showToast('已新增活動');
  };

  window.deleteActivity = function (dayIndex, actIndex) {
    if (itinerary[dayIndex].activities.length <= 1) {
      showToast('每天至少保留一個活動');
      return;
    }
    itinerary[dayIndex].activities.splice(actIndex, 1);
    saveItinerary(itinerary);
    renderDayDetail(itinerary[dayIndex]);
    showToast('已刪除活動');
  };

  // ---- Edit mode toggle ----
  function toggleEditMode() {
    editMode = !editMode;
    const btn = document.getElementById('btn-edit');
    const body = document.body;

    if (editMode) {
      btn.classList.add('active');
      body.classList.add('edit-mode');
      showToast('✏️ 編輯模式已開啟');
    } else {
      btn.classList.remove('active');
      body.classList.remove('edit-mode');
      showToast('✅ 已儲存變更');
    }

    // Re-render expanded day
    const expandedCard = document.querySelector('.day-card.expanded');
    if (expandedCard) {
      const dayNum = parseInt(expandedCard.id.replace('day-', ''));
      const day = itinerary.find(d => d.dayNumber === dayNum);
      if (day) renderDayDetail(day);
    }
  }

  // ---- Reset data ----
  function handleReset() {
    if (confirm('確定要重設所有行程資料？')) {
      itinerary = resetItinerary();
      renderApp();
      showToast('已重設為原始資料');
    }
  }

  // ---- Toast ----
  function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2200);
  }

  // ---- Utility ----
  function escapeHTML(str) {
    if (!str) return '';
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // ---- Offline detection ----
  function updateOnlineStatus() {
    const banner = document.getElementById('offline-banner');
    if (!navigator.onLine) {
      banner.classList.add('show');
    } else {
      banner.classList.remove('show');
    }
  }

  // ---- Service Worker ----
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js')
        .then(reg => console.log('SW registered:', reg.scope))
        .catch(err => console.warn('SW registration failed:', err));
    }
  }

  // ---- Init ----
  document.addEventListener('DOMContentLoaded', () => {
    registerSW();
    renderApp();

    document.getElementById('btn-edit').addEventListener('click', toggleEditMode);
    document.getElementById('btn-reset').addEventListener('click', handleReset);

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    updateOnlineStatus();
  });

})();
