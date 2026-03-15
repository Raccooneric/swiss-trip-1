// Switzerland 14-Day Itinerary Data
// Parsed from: 20260315版_switzerland_14day_detailed_itinerary.xlsx

const DEFAULT_ITINERARY = [
  {
    dayNumber: 1,
    date: "2026/3/22（日）",
    zone: "蘇黎世",
    base: "Zurich",
    lat: 47.3769,
    lon: 8.5417,
    accommodation: "https://maps.app.goo.gl/92fCf4ii9BJ722fC7",
    activities: [
      {
        route: "Arrival Zurich Airport → Zurich HB",
        transport: "",
        departTime: "06:10",
        travelTime: "~20 min",
        referenceUrl: "https://vocus.cc/article/653f5823fd8978000103698a",
        mainActivities: "Old Town walk, Bahnhofstrasse shopping\n班霍夫大街、林登霍夫山、蘇黎世大教堂、碼頭（遊船）、凱伊橋（Quaibrücke）、聖彼得大教堂",
        notes: "住宿點Ａ逛市區",
        foodRecommendations: "1. Zeughauskeller (軍火庫餐廳)\n2. Sprüngli 巧克力/馬卡龍\n3. 蘇黎世小牛肉 (Geschnetzeltes)"
      }
    ]
  },
  {
    dayNumber: 2,
    date: "2026/3/23（一）",
    zone: "蘇黎世",
    base: "Zurich / Lucerne",
    lat: 47.0502,
    lon: 8.3093,
    accommodation: "",
    activities: [
      {
        route: "Zurich → Lucerne",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.bring-you.info/zh-tw/lucerne",
        mainActivities: "琉森一日遊\n卡貝爾橋 (Chapel Bridge)、獅子紀念碑、舊城區散步、琉森湖遊船",
        notes: "Day trip from Zurich",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 3,
    date: "2026/3/24（二）",
    zone: "蘇黎世",
    base: "Zurich / Rigi or Pilatus",
    lat: 47.0568,
    lon: 8.4848,
    accommodation: "",
    activities: [
      {
        route: "Zurich → Rigi / Pilatus",
        transport: "STP covered",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "瑞吉山 (Rigi) 或皮拉圖斯山 (Pilatus)\n山頂纜車或齒軌火車，飽覽阿爾卑斯全景",
        notes: "視天氣選擇 Rigi 或 Pilatus",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 4,
    date: "2026/3/25（三）",
    zone: "少女峰區",
    base: "Grindelwald",
    lat: 46.6244,
    lon: 8.0413,
    accommodation: "https://maps.app.goo.gl/dWVNfVuWqL3Xqg3d8",
    activities: [
      {
        route: "Zurich → Interlaken → Grindelwald",
        transport: "IR / BOB Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.bring-you.info/zh-tw/grindelwald",
        mainActivities: "轉移至少女峰區，入住 Grindelwald\n抵達後可逛 Grindelwald 小鎮、欣賞艾格峰北壁",
        notes: "Check in at Grindelwald accommodation",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 5,
    date: "2026/3/26（四）",
    zone: "少女峰區",
    base: "Jungfraujoch",
    lat: 46.5474,
    lon: 7.9856,
    accommodation: "",
    activities: [
      {
        route: "Grindelwald Terminal → Eiger Express → Jungfraujoch",
        transport: "Eiger Express + Jungfrau Railway",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.bring-you.info/zh-tw/jungfraujoch",
        mainActivities: "少女峰 (Jungfraujoch) — Top of Europe\n歐洲最高火車站 (3,454m)、斯芬克斯觀景台、冰宮、阿萊奇冰川步道",
        notes: "建議一早出發避開人潮",
        foodRecommendations: ""
      },
      {
        route: "Grindelwald Terminal → Jungfraujoch",
        transport: "Eigergletscher 雪地散步",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "阿萊奇冰川 (Aletsch Glacier)",
        notes: "Return ~15:30",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 6,
    date: "2026/3/27（五）",
    zone: "少女峰區",
    base: "First山頂",
    lat: 46.6590,
    lon: 8.0580,
    accommodation: "",
    activities: [
      {
        route: "Firstbahn 纜車站",
        transport: "Firstbahn Cable Car",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://stellaclife.com/switzerland-grindelwald-first/",
        mainActivities: "可體驗 First Flyer 或 First Glider",
        notes: "",
        foodRecommendations: ""
      },
      {
        route: "First Cliff Walk (懸崖步道)",
        transport: "",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://vocus.cc/article/66f9979afd8978000154765a",
        mainActivities: "First Cliff Walk 懸崖步道",
        notes: "",
        foodRecommendations: ""
      },
      {
        route: "Bachalpsee 冬季健行",
        transport: "",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "Bachalpsee 冬季健行\n此步道在 3 月通常是壓雪處理後的冬季健行道。雖然湖面可能結冰被雪覆蓋，但沿途雪山倒映與開闊感依然絕美。",
        notes: "Return ~18:00",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 7,
    date: "2026/3/28（六）",
    zone: "少女峰區",
    base: "Lauterbrunnen / Mürren",
    lat: 46.5936,
    lon: 7.9085,
    accommodation: "",
    activities: [
      {
        route: "Grindelwald 前往 Lauterbrunnen",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://twoslowbyron.com/lauterbrunnen/",
        mainActivities: "漫步於瀑布鎮，近距離觀賞 297 公尺高的 Staubbach Falls (施陶河瀑布)",
        notes: "哈德庫爾姆 HarderKulm 也不錯\nhttps://vocus.cc/article/66b45a8efd897800010104db",
        foodRecommendations: ""
      },
      {
        route: "從 Lauterbrunnen 搭乘纜車至 Grütschalp，再轉接小火車抵達穆倫",
        transport: "Cable car",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://lohanpush.com/2019/05/29/lauterbrunnen/",
        mainActivities: "穆倫是個無菸小村莊，懸掛在懸崖邊緣。在這裡可以邊喝咖啡邊遠眺少女峰、僧侶峰與艾格峰。",
        notes: "",
        foodRecommendations: ""
      },
      {
        route: "從穆倫返回，搭齒軌火車前往 Wengen",
        transport: "Cogwheel Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "溫根 (Wengen) 短暫停留 — 另一個絕美的懸崖小鎮",
        notes: "Return ~18:00",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 8,
    date: "2026/3/29（日）",
    zone: "策馬特",
    base: "Zermatt",
    lat: 46.0207,
    lon: 7.7491,
    accommodation: "https://maps.app.goo.gl/UuR687N8qe4NKgB19",
    activities: [
      {
        route: "（方案一）Grindelwald → Interlaken Ost → Zermatt（3小時）\n（方案二）Interlaken → Montreux → Zermatt (黃金列車段 5-6小時）",
        transport: "GoldenPass Express",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "轉移至策馬特",
        notes: "",
        foodRecommendations: ""
      },
      {
        route: "Spiez → Visp → Zermatt",
        transport: "Matterhorn Gotthard Bahn",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "策馬特小鎮\n推薦點 1：Kirchbrücke (教堂橋) 拍攝馬特洪峰「日照金山」或夕陽的最佳小鎮取景點。\n推薦點 2：Hinterdorfstrasse (老鼠街) — 保留了 16-18 世紀的傳統瓦萊州木屋，非常有氛圍。\n火車站對面的 Gornergrat 登山火車站或旅遊中心了解未來幾天的天氣預報。",
        notes: "",
        foodRecommendations: "1. Restaurant Julen (黑鼻羊料理)\n2. 瓦萊州風乾肉盤\n3. 策馬特手工啤酒"
      }
    ]
  },
  {
    dayNumber: 9,
    date: "2026/3/30（一）",
    zone: "策馬特",
    base: "Zermatt",
    lat: 46.0207,
    lon: 7.7491,
    accommodation: "",
    activities: [
      {
        route: "Zermatt → Matterhorn Glacier Paradise",
        transport: "小鎮南端的纜車站搭乘",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.leo-travel.idv.tw/60995/swiss-zermatt-matterhorn-glacier-paradise",
        mainActivities: "Matterhorn Glacier Paradise (馬特洪峰冰川天堂)\nGlacier Palace (冰川宮殿)：走進冰川下 15 公尺的冰宮，欣賞冰雕。\n觀景台：360 度環視瑞士、法國、義大利境內的 38 座 4000 公尺以上群峰。",
        notes: "Zermatt - Matterhorn App（查看何時上山）",
        foodRecommendations: ""
      },
      {
        route: "Matterhorn Glacier Paradise",
        transport: "持 STP 購買纜車票享 5 折優惠",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "Schwarzsee (黑湖)\n纜車下山途中在 Schwarzsee 站下車，這裡離馬特洪峰極近。3 月底黑湖可能仍被雪覆蓋，別有一番聖潔美感。",
        notes: "",
        foodRecommendations: ""
      }
    ]
  },
  {
    dayNumber: 10,
    date: "2026/3/31（二）",
    zone: "策馬特",
    base: "Zermatt",
    lat: 46.0207,
    lon: 7.7491,
    accommodation: "",
    activities: [
      {
        route: "Zermatt",
        transport: "策馬特火車站正對面的 Gornergrat 登山鐵路（要去的話早上去買）",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://mimigo.tw/zermatt-matterhorn-travel-guide/",
        mainActivities: "在小鎮享受慢活早餐，或前往 Sunnegga (蘇內加) 觀景台。雖然 5 Lakes Hike 此時多有積雪不建議徒步，但 Sunnegga 的馬特洪峰視角非常經典。",
        notes: "",
        foodRecommendations: ""
      },
      {
        route: "Zermatt → Gornergrat → Rotenboden",
        transport: "票務：持 STP 享 5 折優惠。火車票不需事先預約日期，視當天天氣再臨櫃購買。",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.leo-travel.idv.tw/60873/swiss-zermatt-matterhorn-gornergrat",
        mainActivities: "Gornergrat Afternoon\n搭乘瑞士最早的齒軌火車。特別安排在下午，因為下午的光線照在馬特洪峰東面上最為漂亮。\nRiffelsee (利菲爾湖)：若積雪不深且湖面未完全結冰，可以在 Rotenboden 站下車走 10 分鐘去看馬特洪峰倒影。",
        notes: "",
        foodRecommendations: "1. 3100 Kulmhotel 景觀餐\n2. 瑞士熱巧克力\n3. Riffelalp 露天輕食"
      }
    ]
  },
  {
    dayNumber: 11,
    date: "2026/4/1（三）",
    zone: "日內瓦",
    base: "Geneva",
    lat: 46.2044,
    lon: 6.1432,
    accommodation: "https://maps.app.goo.gl/sfzK7o1YVdzr9drg7",
    activities: [
      {
        route: "Zermatt → Geneva",
        transport: "IC Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.bring-you.info/zh-tw/geneve",
        mainActivities: "萬國宮 (Palais des Nations)\n聯合國歐洲總部。【備註】必須提前在官網預約導覽（Guided Tour），非常熱門。門口的「斷腳長椅」(Broken Chair) 也是必拍的和平象徵。\n\nLake Geneva walk 湖畔漫步與大噴泉 (Jet d'Eau)\n花鐘 (L'horloge fleurie)：位於英國花園內，象徵日內瓦製錶業的精湛。\n\n聖皮耶大教堂 (Cathédrale Saint-Pierre)：位於老城區頂端，建議爬上塔樓俯瞰全城。\n\n在 Bourg-de-Four 廣場一帶享受傳統瑞士料理或起司火鍋",
        notes: "",
        foodRecommendations: "1. 恩加丁核桃派 (Tuorta da nusch)\n2. 聖莫里茨飯店下午茶\n3. 義式風味料理"
      }
    ]
  },
  {
    dayNumber: 12,
    date: "2026/4/2（四）",
    zone: "日內瓦",
    base: "Montreux / Geneva",
    lat: 46.4312,
    lon: 6.9107,
    accommodation: "",
    activities: [
      {
        route: "Geneva → Montreux",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://www.bring-you.info/zh-tw/montreaux",
        mainActivities: "蒙特勒 & 西庸城堡",
        notes: "若是日內瓦實在太無聊可以安排蒙特勒＋伯恩（Bern）一日遊，空出一天去 Glacier 3000 玩樂",
        foodRecommendations: ""
      },
      {
        route: "Montreux → Geneva",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "湖上巡航 (Lake Cruise)\n持 STP 可以免費搭乘日內瓦湖的黃色小船 (Mouettes Genevoises)\n白朗峰大道",
        notes: "",
        foodRecommendations: "1. 湖魚料理 (Filets de perche)\n2. 沃韋市場在地點心\n3. 白葡萄酒"
      }
    ]
  },
  {
    dayNumber: 13,
    date: "2026/4/3（五）",
    zone: "伯恩",
    base: "Bern",
    lat: 46.9480,
    lon: 7.4474,
    accommodation: "",
    activities: [
      {
        route: "Geneva → Bern",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "https://ayumii.com/11-special-fountains-in-bern/",
        mainActivities: "Bern Old Town\n玫瑰園、熊公園、愛因斯坦故居、國會大廈",
        notes: "https://ayumii.com/bern-day-tour/",
        foodRecommendations: "1. 伯恩式大拼盤 (Berner Platte)\n2. 老城區地窖餐廳\n3. 傳統薑餅"
      }
    ]
  },
  {
    dayNumber: 14,
    date: "2026/4/4（六）",
    zone: "蘇黎世",
    base: "Zurich",
    lat: 47.3769,
    lon: 8.5417,
    accommodation: "飛機上",
    activities: [
      {
        route: "Geneva → Zurich HB",
        transport: "Regional Train",
        departTime: "",
        travelTime: "",
        referenceUrl: "",
        mainActivities: "Airport transfer",
        notes: "13:00 一定要出發去蘇黎世",
        foodRecommendations: ""
      }
    ]
  }
];

// Load from localStorage or use defaults
function loadItinerary() {
  const saved = localStorage.getItem('switzerland_itinerary');
  if (saved) {
    try {
      return JSON.parse(saved);
    } catch (e) {
      console.warn('Failed to parse saved itinerary, using defaults');
    }
  }
  return JSON.parse(JSON.stringify(DEFAULT_ITINERARY));
}

function saveItinerary(data) {
  localStorage.setItem('switzerland_itinerary', JSON.stringify(data));
}

function resetItinerary() {
  localStorage.removeItem('switzerland_itinerary');
  return JSON.parse(JSON.stringify(DEFAULT_ITINERARY));
}
