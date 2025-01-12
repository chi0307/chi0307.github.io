import { generateUuid } from '@/utils'

import type { CardConfig, Payment } from '../../CreditCard'
import { cardDescription, getRewardDescription } from './utils'

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

function cubePlanSettings(defaultBackRete: number): CardConfig['plans'] {
  const baseReward: CardConfig['plans'][number]['config']['rewards'][number] = {
    rewardStrategy: {
      type: 'RoundedPercentageReward',
      name: null,
      pointBackRates: [{ rate: 0.3 }],
    },
  }

  return [
    {
      id: generateUuid(),
      config: {
        name: '集精選',
        description: '量販超市, 指定加油, 指定超商, 生活家居',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 2 }],
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
    },
    {
      id: generateUuid(),
      config: {
        name: '玩數位',
        description: '數位/串流平台, 網購平台, 國際電商, 辦公神器',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: defaultBackRete }],
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
              'Max',
              '蝦皮購物',
              'momo購物網',
              'PChome 24h購物(不含儲值及電子票券)',
              '小樹購',
              'Coupang 酷澎(台灣)',
              '淘寶/天貓',
              // 目前只公告到 2025/3/31
              'ChatGPT',
              'Dropbox',
              'Surfshark',
              'NordVPN',
              'McAfee',
              'Microsoft',
              'LinkedIn',
              'Whoscall',
              'Zoom',
            ],
            paymentBlackList: ['Line Pay', '街口支付'],
          },
          { ...baseReward, storeBlackList: ['全聯福利中心'] },
        ],
      },
    },
    {
      id: generateUuid(),
      config: {
        name: '樂饗購',
        description: '國內指定百貨, 國內外送平台, 國內餐飲, 國內藥妝',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: defaultBackRete }],
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
    },
    {
      id: generateUuid(),
      config: {
        name: '趣旅行',
        description:
          '指定海外消費, 日本指定遊樂園, 國內外交通, 指定航空公司, 指定飯店住宿, 旅遊/訂房平台, 指定旅行社',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: defaultBackRete }],
            },
            stores: [
              '海外實體消費',
              '東京迪士尼樂園',
              '東京華納兄弟哈利波特影城',
              '大阪環球影城(USJ)',
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
            ],
            payments,
          },
          { ...baseReward, storeBlackList: ['全聯福利中心'] },
        ],
      },
    },
    {
      id: generateUuid(),
      config: {
        name: '來支付',
        description: 'LINE Pay消費',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 2 }],
            },
            payments: ['Line Pay'],
          },
          { ...baseReward, storeBlackList: ['全聯福利中心'] },
        ],
      },
    },
    {
      id: generateUuid(),
      config: {
        name: '慶生月',
        description:
          '指定百貨/休閒娛樂/國內外送平台 3.5%, 國外精選遊樂園實體消費/國內人氣樂園/指定蛋糕甜點店/指定咖啡廳/指定國內餐廳/KTV/派對/電玩 10%',
        condition: 'Birthday',
        rewards: [
          {
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 10 }],
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
            rewardStrategy: {
              type: 'RoundedPercentageReward',
              name: null,
              pointBackRates: [{ rate: 3.5 }],
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
    },
  ]
}

const cubePointExchanges: CardConfig['pointExchanges'] = [
  {
    id: generateUuid(),
    config: {
      name: '長榮航空哩程',
      airlineCode: 'EVA',
      pointsPerMile: 360,
      milesPerUnit: 1000,
    },
  },
  {
    id: generateUuid(),
    config: {
      name: '長榮航空哩程 + 長榮世界卡',
      airlineCode: 'EVA',
      pointsPerMile: 300,
      milesPerUnit: 1000,
    },
  },
]

export const cubeConfigs: CardConfig[] = [
  {
    name: 'Cube 卡',
    description: `Cube 卡 (Level 1) 回饋方案 (${cardDescription})`,
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    plans: cubePlanSettings(2),
    pointExchanges: cubePointExchanges,
  },
  {
    name: 'Cube 卡',
    description: `Cube 卡 (Level 2) 回饋方案 (${cardDescription})`,
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    plans: cubePlanSettings(3),
    pointExchanges: cubePointExchanges,
  },
  {
    name: 'Cube 卡',
    description: `Cube 卡 (Level 3) 回饋方案 (${cardDescription})`,
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/cube/',
    storeBlackList,
    paymentBlackList,
    updateAt: '2024-12-01T00:00:00.000Z',
    plans: cubePlanSettings(3.3),
    pointExchanges: cubePointExchanges,
  },
]

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const exampleCubeConfig: CardConfig = cubeConfigs[1]!

function evaPlanSettings(defaultSpendingPerPoint: number): CardConfig['plans'] {
  return [
    {
      id: generateUuid(),
      config: {
        name: null,
        description: '部分回饋需要另外登錄',
        rewards: [
          // TODO: 有空再想想要怎麼分開做要登錄跟不用登錄的計算
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: `Expedia專屬網頁線上訂房 ${getRewardDescription('2025/12/31')}`,
              spendingPerPoint: 8,
            },
            stores: ['Expedia'],
            payments: [
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '長榮官網購票/機上免稅品',
              spendingPerPoint: 10,
            },
            stores: ['長榮機上免稅品', '長榮官網購票'],
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '海外消費',
              spendingPerPoint: 10,
            },
            transactionType: 'Foreign',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國內旅行社 (需登錄) 銀行並未公告符合商家',
              spendingPerPoint: 10,
            },
            transactionType: 'Domestic',
            stores: [
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
            ],
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '國外自由行、團體旅遊 (需登錄) 銀行並未公告符合商家',
              spendingPerPoint: 10,
            },
            transactionType: 'Foreign',
          },
          {
            rewardStrategy: {
              type: 'FixedRatePointsReward',
              name: '一般消費',
              spendingPerPoint: defaultSpendingPerPoint,
            },
          },
        ],
      },
    },
  ]
}

const evaPointExchanges: CardConfig['pointExchanges'] = [
  {
    id: generateUuid(),
    config: {
      name: '長榮航空哩程 (每1000哩為單位自動轉換至哩程帳戶)',
      airlineCode: 'EVA',
      pointsPerMile: 1000,
      milesPerUnit: 1000,
    },
  },
]

const evaCardDescription = getRewardDescription('2025/3/31')
export const evaConfigs: CardConfig[] = [
  {
    name: '長榮極致無限卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/eva/',
    description: evaCardDescription,
    updateAt: '2024-12-29T00:00:00.000Z',
    plans: evaPlanSettings(20),
    pointExchanges: evaPointExchanges,
  },
  {
    name: '長榮無限卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/eva/',
    description: evaCardDescription,
    updateAt: '2024-12-29T00:00:00.000Z',
    plans: evaPlanSettings(22),
    pointExchanges: evaPointExchanges,
  },
  {
    name: '長榮極致御璽卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/eva/',
    description: evaCardDescription,
    updateAt: '2024-12-29T00:00:00.000Z',
    plans: evaPlanSettings(30),
    pointExchanges: evaPointExchanges,
  },
  {
    name: '長榮御璽卡',
    cardUrl: 'https://www.cathaybk.com.tw/cathaybk/personal/product/credit-card/cards/eva/',
    description: evaCardDescription,
    updateAt: '2024-12-29T00:00:00.000Z',
    plans: [
      {
        id: generateUuid(),
        config: {
          name: null,
          description: null,
          rewards: [
            {
              rewardStrategy: {
                type: 'FixedRatePointsReward',
                name: '一般消費',
                spendingPerPoint: 30,
              },
            },
          ],
        },
      },
    ],
    pointExchanges: evaPointExchanges,
  },
]

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const exampleEvaConfig: CardConfig = evaConfigs[1]!
