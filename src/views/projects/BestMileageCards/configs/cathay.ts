import type { CardConfig, Payment } from '../CreditCard'

const storeBlackList: string[] = ['分期付款']
const paymentBlackList: Payment[] = []

const payments: Payment[] = [
  '信用卡',
  'Apple Pay',
  'Samsung Pay',
  'Google Pay',
  'Fitbit Pay',
  'Garmin Pay',
  'Hami Pay',
]

function planSettings(
  defaultBackRete: number,
  pointsPerMile: number,
  milesPerUnit: number,
): CardConfig['plans'] {
  const baseReward: CardConfig['plans'][number]['rewards'][number] = {
    reward: {
      type: 'RoundedPointsReward',
      name: null,
      pointBackRates: [{ rate: 0.3 }],
      pointsPerMile,
      milesPerUnit,
    },
  }

  return [
    {
      name: '集精選',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: 2 }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            '家樂福',
            'LOPIA台灣',
            '全聯福利中心',
            '台灣中油-直營',
            '7-ELEVEN',
            '全家便利商店',
            'IKEA',
          ],
          payments: [...payments, 'PX Pay', 'My FamiPay', 'OPEN錢包'],
        },
        baseReward,
      ],
    },
    {
      name: '玩數位',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: defaultBackRete }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            'App Store',
            'Apple Music',
            'iCloud',
            'Apple TV+',
            'Apple Arcade',
            'Apple One',
            'iTunes',
            'Google Play',
            'Disney+',
            'Netflix',
            'Spotify',
            'KKBOX',
            'YouTube Premium',
            '蝦皮購物',
            'momo購物網',
            'PChome 24h購物(不含儲值及電子票券)',
            '博客來',
            '小樹購',
            'Coupang 酷澎(台灣)',
            '淘寶/天貓',
          ],
          paymentBlackList: ['Line Pay', '街口支付'],
        },
        { ...baseReward, storeBlackList: ['全聯福利中心'] },
      ],
    },
    {
      name: '樂饗購',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: defaultBackRete }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            '遠東SOGO百貨',
            '遠東Garden City',
            '太平洋百貨',
            '新光三越',
            'SKM Park',
            'BELLAVITA',
            '微風廣場',
            '遠東百貨',
            'Big City遠東巨城購物中心',
            '誠品生活',
            '環球購物中心',
            'CITYLINK',
            '統一時代',
            '台北101',
            'ATT 4 FUN',
            '明曜百貨',
            '京站',
            '美麗華',
            '大葉高島屋',
            '比漾廣場',
            '大江國際購物中心',
            '中友百貨',
            '廣三SOGO',
            'Tiger City',
            '勤美誠品綠園道',
            '大魯閣新時代',
            '耐斯廣場',
            '南紡購物中心',
            '夢時代',
            '漢神百貨',
            '漢神巨蛋',
            'MITSUI OUTLET PARK 林口',
            'MITSUI OUTLET PARK 台中港',
            'MITSUI OUTLET PARK 台南',
            'Mitsui Shopping Park LaLaport 台中',
            '義大世界購物廣場',
            '華泰名品城',
            '義享天地',
            '麗寶OUTLET Mall',
            '秀泰生活',
            '台茂購物中心',
            '新月廣場',
            '三創生活',
            '宏匯廣場',
            '高雄棧貳庫/大港倉',
            'NOKE忠泰樂生活',
            'Uber Eats',
            'foodpanda',
            'foodomo',
            '國內餐飲(不含餐券)',
            '麥當勞',
            '康是美',
            '屈臣氏',
          ],
          payments,
        },
        { ...baseReward, storeBlackList: ['全聯福利中心'] },
      ],
    },
    {
      name: '趣旅行',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: defaultBackRete }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            '海外實體消費',
            '東京迪士尼樂園',
            '東京華納兄弟哈利波特影城',
            '大阪環球影城(USJ)',
            '吉卜力公園',
            'Apple Wallet SUICA',
            'Apple Wallet PASMO',
            'Apple Wallet ICOCA',
            'Uber',
            'Grab',
            '台灣高鐵',
            'yoxi',
            '台灣大車隊',
            'iRent',
            '和運租車',
            '格上租車',
            '中華航空',
            '長榮航空',
            '星宇航空',
            '台灣虎航',
            '國泰航空',
            '樂桃航空',
            '阿聯酋航空',
            '酷航',
            '捷星航空',
            '日本航空',
            '亞洲航空',
            '聯合航空',
            'ANA全日空',
            '新加坡航空',
            '越捷航空',
            '大韓航空',
            '達美航空',
            '土耳其航空',
            '卡達航空',
            '法國航空',
            '國內飯店住宿',
            '星野集團',
            '全球迪士尼飯店',
            '東橫INN',
            'KKday',
            'Agoda',
            'Klook',
            'Airbnb',
            'Hotels.com',
            'Expedia',
            'Booking.com',
            'Trip.com',
            'AsiaYo',
            'ezTravel易遊網',
            '雄獅旅遊',
            '可樂旅遊',
            '東南旅遊',
            '五福旅遊',
            '燦星旅遊',
            '山富旅遊',
            '長汎假期',
            '鳳凰旅行社',
            'Ezfly易飛網',
            '理想旅遊',
            '永利旅行社',
            '三賀旅行社',
            '173WIFI',
            'JetFi mobile',
            '威訊 WaySim',
            'AIRSIM',
            'SIM88',
          ],
          payments,
        },
        { ...baseReward, storeBlackList: ['全聯福利中心'] },
      ],
    },
    {
      name: '來支付',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: 2 }],
            pointsPerMile,
            milesPerUnit,
          },
          payments: ['Line Pay'],
        },
        { ...baseReward, storeBlackList: ['全聯福利中心'] },
      ],
    },
    {
      name: '慶生月',
      condition: 'Birthday',
      rewards: [
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: 10 }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            '東京迪士尼樂園',
            '大阪環球影城(USJ)',
            '名古屋樂高樂園',
            '紅葉蛋糕官方網站',
            '法朋烘焙甜點坊',
            '興波咖啡 華山旗艦店',
            '海底撈火鍋',
            '輕井澤鍋物',
            '老四川巴蜀麻辣燙',
            '二本松涮涮屋',
            '橋山.壽喜燒',
            'Umai屋馬燒肉',
            '老井極上燒肉',
            '燒肉中山(台中大墩)',
            '藏壽司台灣',
            '貳樓',
            '膳馨民間創作料理',
            '馨苑小料理',
            '雅室牛排 仁愛圓環店',
            'ABV餐飲集團',
            'WAT',
            '臺虎精釀(信義 | 西門 | 臺中 | 啜飲室大安)',
            'BAR Bodega',
            'BAR MED',
            'JiN Her 今鶴',
            '錢櫃KTV',
            '好樂迪KTV',
            '星聚點KTV',
            '享溫馨KTV',
            'Nintendo',
            '巴哈姆特動畫瘋',
            '閃動格子CyberCube',
          ],
        },
        {
          reward: {
            type: 'RoundedPointsReward',
            name: null,
            pointBackRates: [{ rate: 3.5 }],
            pointsPerMile,
            milesPerUnit,
          },
          stores: [
            '新光三越',
            'Uber Eats (不含 Uber One)',
            'Agoda',
            'Trip.com',
            'Klook',
            '國內飯店住宿',
            '星野集團',
            '全球迪士尼飯店',
            '東橫INN',
          ],
        },
        { ...baseReward, storeBlackList: ['全聯福利中心'] },
      ],
    },
  ]
}

export const cubeConfigs: CardConfig[] = [
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 1) 回饋方案',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(2, 360, 1000),
  },
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 2) 回饋方案',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(3, 360, 1000),
  },
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 3) 回饋方案',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(3.3, 360, 1000),
  },
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 1) 回饋方案 + 長榮世界卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(2, 300, 1000),
  },
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 2) 回饋方案 + 長榮世界卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(3, 300, 1000),
  },
  {
    name: 'Cube 卡',
    description: 'Cube 卡 (Level 3) 回饋方案 + 長榮世界卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: planSettings(3.3, 300, 1000),
  },
]
