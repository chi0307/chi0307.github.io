import type { CardConfig } from '../CreditCard'

const blackList: string[] = ['全聯']

export const travelConfigs: CardConfig[] = [
  {
    name: '旅人無限卡',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-infinite/',
    blackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 10,
            },
            stores: [],
            payments: [],
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國內消費',
              spendingPerMile: 18,
            },
            stores: [],
            payments: [],
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人御璽卡',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-signature/',
    blackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 15,
            },
            stores: [],
            payments: [],
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國內消費',
              spendingPerMile: 18,
            },
            stores: [],
            payments: [],
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人輕旅卡',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-light/',
    blackList,
    airLines: 'EVA',
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 20,
            },
            stores: [],
            payments: [],
            transactionType: 'Foreign',
          },
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國內消費',
              spendingPerMile: 20,
            },
            stores: [],
            payments: [],
            transactionType: 'Domestic',
          },
        ],
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
]
