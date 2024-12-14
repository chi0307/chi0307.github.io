import type { CardConfig } from '../CreditCard'

const blackList: string[] = ['全聯']

export const hsbcCards: CardConfig[] = [
  {
    name: '旅人無限卡',
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-infinite/',
    blackList,
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 10,
              airLines: 'EVA',
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
              airLines: 'EVA',
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
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 15,
              airLines: 'EVA',
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
              airLines: 'EVA',
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
    plans: [
      {
        name: null,
        rewards: [
          {
            reward: {
              type: 'DirectMilesAccumulation',
              name: '國外消費',
              spendingPerMile: 20,
              airLines: 'EVA',
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
              airLines: 'EVA',
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
