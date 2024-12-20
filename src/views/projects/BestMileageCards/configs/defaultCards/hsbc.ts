import type { CardConfig, Payment } from '../../CreditCard'

const storeBlackList: string[] = ['政府稅款', '公共事業代扣繳', '交通違規罰鍰', '分期付款']
const paymentBlackList: Payment[] = ['全盈+PAY', 'icash pay', 'OPEN錢包', 'My FamiPay']

export const travelConfigs: CardConfig[] = [
  {
    name: '旅人無限卡',
    description: '',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-infinite/',
    storeBlackList,
    paymentBlackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國外消費',
              spendingPerPoint: 10,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國內消費',
              spendingPerPoint: 18,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人御璽卡',
    description: '',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-signature/',
    storeBlackList,
    paymentBlackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國外消費',
              spendingPerPoint: 15,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國內消費',
              spendingPerPoint: 18,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人輕旅卡',
    description: '',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-light/',
    storeBlackList,
    paymentBlackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國外消費',
              spendingPerPoint: 20,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'AccumulatedPointsReward',
              name: '國內消費',
              spendingPerPoint: 20,
              pointsPerMile: 1,
              milesPerUnit: 1,
            },
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
]
