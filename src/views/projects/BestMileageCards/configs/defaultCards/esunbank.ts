import type { CardConfig, Payment } from '../../CreditCard'

const storeBlackList: string[] = [
  '政府稅款',
  '公共事業代扣繳',
  '交通違規罰鍰',
  '分期付款',
  '全聯福利中心',
  '7-ELEVEN',
  '全家便利商店',
]
const paymentBlackList: Payment[] = []

export const starLuxConfigs: CardConfig[] = [
  {
    name: '星宇世界卡',
    description: '',
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchangeStrategies: [
      {
        name: '星宇航空哩程',
        airlineCode: 'SJX',
        pointsPerMile: 1,
        milesPerUnit: 1,
      },
    ],
    plans: [
      {
        name: null,
        rewards: [
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外消費',
              spendingPerPoint: 5,
            },
            transactionType: 'Foreign',
            condition: 'Birthday',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外消費',
              spendingPerPoint: 10,
            },
            transactionType: 'Foreign',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國內消費',
              spendingPerPoint: 20,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '星宇商務鈦金卡',
    description: '',
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchangeStrategies: [
      {
        name: '星宇航空哩程',
        airlineCode: 'SJX',
        pointsPerMile: 1,
        milesPerUnit: 1,
      },
    ],
    plans: [
      {
        name: null,
        rewards: [
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外消費',
              spendingPerPoint: 7.5,
            },
            transactionType: 'Foreign',
            condition: 'Birthday',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外消費',
              spendingPerPoint: 15,
            },
            transactionType: 'Foreign',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國內消費',
              spendingPerPoint: 25,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '星宇鈦金卡',
    description: '',
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchangeStrategies: [
      {
        name: '星宇航空哩程',
        airlineCode: 'SJX',
        pointsPerMile: 1,
        milesPerUnit: 1,
      },
    ],
    plans: [
      {
        name: null,
        rewards: [
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外消費',
              spendingPerPoint: 20,
            },
            transactionType: 'Foreign',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國內消費',
              spendingPerPoint: 28,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
]

const uniCardStoreList = [
  '台灣中油-直營',
  '台灣大車隊',
  '台鐵',
  '台灣高鐵',
  'UBER',
  'Yoxi',
  'LINEGO',
  '新光三越',
  '遠東百貨',
  '遠東SOGO百貨',
  '誠品生活',
  '漢神百貨',
  '微風廣場',
  '微風信義',
  '微風南京',
  '微風南山',
  '微風台北車站',
  '環球購物中心',
  '台北101',
  '華泰名品城',
  'MITSUI OUTLET PARK 林口',
  'MITSUI OUTLET PARK 台中港',
  'MITSUI OUTLET PARK 台南',
  'Big City遠東巨城購物中心',
  '昇恆昌',
  '夢時代購物中心',
  '京站',
  '美麗華',
  '南紡購物中心',
  '秀泰生活',
  '台茂購物中心',
  'Mitsui Shopping Park LaLaport 台中',
  '統領廣場',
  '采盟',
  'Uber Eats',
  'foodpanda',
  '星巴克',
  'EZTABLE',
  '王品瘋美食',
  '摩斯漢堡',
  'foodomo',
  '漢來美食',
  '饗Joy',
  '饗食天堂',
  '果然匯',
  '小福利',
  '饗饗',
  '旭集',
  '開飯',
  '饗泰多',
  '真珠',
  '瓦城',
  '非常泰',
  '大心',
  '1010',
  '時時香',
  'BOBO',
  '乾杯集團',
  '路易莎',
  '中華航空',
  '長榮航空',
  '日本航空',
  '台灣虎航',
  '樂桃航空',
  '酷航',
  '立榮航空',
  '華信航空',
  'Agoda',
  'booking.com',
  'Hotels.com',
  'AsiaYo',
  'Expedia',
  'KKday',
  'Klook',
  '雄獅旅遊',
  '可樂旅遊',
  '東南旅行社',
  'Apple直營店',
  '小米台灣',
  '全國電子',
  '燦坤',
  '迪卡儂',
  '屈臣氏',
  '康是美',
  'IKEA',
  '特力屋',
  '特力和樂',
  'UNIQLO',
  'NET',
  '大樹藥局',
  '丁丁藥妝',
  'momo購物網',
  '蝦皮購物',
  '淘寶網',
  'Coupang酷澎',
  '東森購物',
  '雅虎奇摩購物中心',
  '博客來',
  '玉山Wallet愛心捐款-單筆捐款',
  '玉山Wallet愛心捐款-定期定額',
  '特斯拉',
  'Gogoro電池資費',
  'YouBike 2.0',
  '日本實體店',
  '韓國實體店',
  '泰國實體店',
  '越南實體店',
  '新加坡實體店',
  '中國實體店',
  '香港實體店',
  '澳門實體店',
  '美國實體店',
  '英國實體店',
  '法國實體店',
  '德國實體店',
  '義大利實體店',
]
const uniCardBaseReward: CardConfig['plans'][number]['rewards'][number] = {
  rewardStrategy: {
    type: 'TruncatedPercentageReward',
    name: null,
    pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }],
  },
}
export const uniCardConfigs: CardConfig[] = [
  {
    name: 'UniCard 卡',
    description: '',
    cardUrl: 'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
    storeBlackList,
    paymentBlackList,
    pointExchangeStrategies: [
      {
        name: '長榮航空哩程',
        airlineCode: 'EVA',
        pointsPerMile: 200,
        milesPerUnit: 300,
      },
    ],
    plans: [
      {
        name: '任意選 (需要切換店家)',
        rewards: [
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2.5, limit: 500 }],
            },
            stores: uniCardStoreList,
            payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
          },
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2.5, limit: 500 }],
            },
            payments: ['Line Pay', '街口支付', '悠遊付', '橘子支付', 'icash pay'],
          },
          uniCardBaseReward,
        ],
      },
      {
        name: '簡單選',
        rewards: [
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2, limit: 500 }],
            },
            stores: uniCardStoreList,
            payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
          },
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2, limit: 500 }],
            },
            payments: ['Line Pay', '街口支付', '悠遊付', '橘子支付', 'icash pay'],
          },
          uniCardBaseReward,
        ],
      },
      {
        name: 'UP選',
        rewards: [
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 3.5, limit: 2000 }],
            },
            stores: uniCardStoreList,
            payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
          },
          {
            rewardStrategy: {
              type: 'TruncatedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 3.5, limit: 2000 }],
            },
            payments: ['Line Pay', '街口支付', '悠遊付', '橘子支付', 'icash pay'],
          },
          uniCardBaseReward,
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
]
