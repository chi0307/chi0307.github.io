import { generateUuid } from '@/utils'

import { Payment, type CardConfig } from '../../CreditCard'
import { getRewardDescription, cardDescription } from './utils'

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

function getStarLuxSpecifyReward(
  spendingPerPoint: number,
): CardConfig['plans'][number]['config']['rewards'][number] {
  return {
    rewardStrategy: {
      type: 'FixedRatePointsReward',
      name: '指定通路里程加速',
      spendingPerPoint,
    },
    transactionType: 'Domestic',
    stores: [
      '星宇航空官方網站/App購票',
      '星宇航空形象門市',
      'béshopping',
      '星宇航空國際航線機上免稅品',
    ],
  }
}

export const starLuxConfigs: CardConfig[] = [
  {
    name: '星宇世界卡',
    description: getRewardDescription('2025/2/28'),
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '星宇航空哩程',
          airlineCode: 'SJX',
          pointsPerMile: 1,
          milesPerUnit: 1,
        },
      },
    ],
    plans: [
      {
        id: generateUuid(),
        config: {
          name: null,
          rewards: [
            {
              rewardStrategy: {
                type: 'FixedRatePointsReward',
                name: '國外消費 (生日兩倍)',
                spendingPerPoint: 5,
              },
              transactionType: 'Foreign',
              condition: 'Birthday',
            },
            getStarLuxSpecifyReward(5),
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
      },
    ],
    updateAt: new Date('2025/01/12 22:00:00').toISOString(),
  },
  {
    name: '星宇商務鈦金卡',
    description: getRewardDescription('2025/2/28'),
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '星宇航空哩程',
          airlineCode: 'SJX',
          pointsPerMile: 1,
          milesPerUnit: 1,
        },
      },
    ],
    plans: [
      {
        id: generateUuid(),
        config: {
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
            getStarLuxSpecifyReward(7.5),
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
      },
    ],
    updateAt: new Date('2025/01/12 22:00:00').toISOString(),
  },
  {
    name: '星宇鈦金卡',
    description: getRewardDescription('2025/2/28'),
    cardUrl:
      'https://www.esunbank.com/zh-tw/personal/credit-card/intro/co-branded-card/starlux-card',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '星宇航空哩程',
          airlineCode: 'SJX',
          pointsPerMile: 1,
          milesPerUnit: 1,
        },
      },
    ],
    plans: [
      {
        id: generateUuid(),
        config: {
          name: null,
          rewards: [
            getStarLuxSpecifyReward(10),
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
      },
    ],
    updateAt: new Date('2025/01/12 22:00:00').toISOString(),
  },
]

const uniCardStoreList = [
  '台灣中油',
  '台灣大車隊',
  '台鐵',
  '台灣高鐵',
  'UBER',
  'Yoxi',
  '桃園機場捷運',
  '新光三越',
  '遠東百貨',
  '遠東SOGO百貨',
  'Big City遠東巨城購物中心',
  '漢神百貨',
  '微風廣場',
  '微風信義',
  '微風南京',
  '微風南山',
  '微風台北車站',
  '台北101',
  '華泰名品城',
  'MITSUI OUTLET PARK 林口',
  'MITSUI OUTLET PARK 台中港',
  'MITSUI OUTLET PARK 台南',
  '京站',
  '美麗華',
  '誠品生活',
  '秀泰生活',
  'Mitsui Shopping Park LaLaport 台中',
  '統領廣場',
  '太平洋百貨',
  '統一時代百貨(台北店)',
  '昇恆昌',
  '采盟',
  'Uber Eats',
  'foodpanda',
  'EZTABLE',
  '王品瘋美食',
  '摩斯漢堡',
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
  'Trip.com',
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
  '寵物公園',
  '家家樂',
  '屈臣氏',
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
  '博客來',
  '日本實體店',
  '韓國實體店',
  '泰國實體店',
  '越南實體店',
  '新加坡實體店',
  '馬來西亞實體店',
  '菲律賓實體店',
  '中國實體店',
  '香港實體店',
  '澳門實體店',
  '美國實體店',
  '加拿大實體店',
  '英國實體店',
  '法國實體店',
  '德國實體店',
  '義大利實體店',
  '澳洲實體店',
  '玉山Wallet愛心捐款-單筆捐款',
  '玉山Wallet愛心捐款-定期定額',
  '特斯拉',
  'Gogoro電池資費',
  'YouBike 2.0',
]
const uniCardSpecifyPayment: Payment[] = [
  'Line Pay',
  '街口支付',
  '悠遊付',
  '全盈+PAY',
  '全支付',
  '橘子支付',
]
const uniCardBaseReward: CardConfig['plans'][number]['config']['rewards'][number] = {
  rewardStrategy: {
    type: 'RoundedPercentageReward',
    name: null,
    pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }],
  },
}
export const uniCardConfigs: CardConfig[] = [
  {
    name: 'UniCard 卡',
    description: cardDescription,
    cardUrl: 'https://www.esunbank.com/zh-tw/personal/credit-card/intro/bank-card/unicard',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '長榮航空哩程',
          airlineCode: 'EVA',
          pointsPerMile: 200,
          milesPerUnit: 300,
        },
      },
    ],
    plans: [
      {
        id: generateUuid(),
        config: {
          name: '任意選 (需要切換店家)',
          description: '玉山Wallet設定8家特店',
          rewards: [
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2.5, limit: 500 }],
              },
              stores: uniCardStoreList,
              payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
            },
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2.5, limit: 500 }],
              },
              payments: uniCardSpecifyPayment,
            },
            uniCardBaseReward,
          ],
        },
      },
      {
        id: generateUuid(),
        config: {
          name: '簡單選',
          rewards: [
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2, limit: 500 }],
              },
              stores: uniCardStoreList,
              payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
            },
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 2, limit: 500 }],
              },
              payments: uniCardSpecifyPayment,
            },
            uniCardBaseReward,
          ],
        },
      },
      {
        id: generateUuid(),
        config: {
          name: 'UP選',
          description: '完成指定任務或99點玉山e point訂閱',
          rewards: [
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 3.5, limit: 2000 }],
              },
              stores: uniCardStoreList,
              payments: ['信用卡', 'Apple Pay', 'Samsung Pay', 'Google Pay'],
            },
            {
              rewardStrategy: {
                type: 'RoundedPercentageReward',
                name: null,
                pointBackRates: [{ rate: 0.3 }, { rate: 0.7 }, { rate: 3.5, limit: 2000 }],
              },
              payments: uniCardSpecifyPayment,
            },
            uniCardBaseReward,
          ],
        },
      },
    ],
    updateAt: new Date('2025/01/12 22:00:00').toISOString(),
  },
]

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const exampleUniCardConfig: CardConfig = uniCardConfigs[0]!
