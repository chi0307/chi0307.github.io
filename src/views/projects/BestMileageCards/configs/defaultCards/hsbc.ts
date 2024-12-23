import { generateUuid } from '@/utils'

import type { CardConfig, Payment } from '../../CreditCard'

const storeBlackList: string[] = ['政府稅款', '公共事業代扣繳', '交通違規罰鍰', '分期付款']
const paymentBlackList: Payment[] = ['全盈+PAY', 'icash pay', 'OPEN錢包', 'My FamiPay']

export const travelConfigs: CardConfig[] = [
  {
    name: '旅人無限卡',
    description: null,
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-infinite/',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '長榮航空哩程',
          airlineCode: 'EVA',
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
                type: 'AccumulatedPointsReward',
                name: '國外消費',
                spendingPerPoint: 10,
              },
              transactionType: 'Foreign',
            },
            {
              rewardStrategy: {
                type: 'AccumulatedPointsReward',
                name: '國內消費',
                spendingPerPoint: 18,
              },
              transactionType: 'Domestic',
            },
          ],
        },
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人御璽卡',
    description: null,
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-signature/',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '長榮航空哩程',
          airlineCode: 'EVA',
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
                type: 'AccumulatedPointsReward',
                name: '國外消費',
                spendingPerPoint: 15,
              },
              transactionType: 'Foreign',
            },
            {
              rewardStrategy: {
                type: 'AccumulatedPointsReward',
                name: '國內消費',
                spendingPerPoint: 18,
              },
              transactionType: 'Domestic',
            },
          ],
        },
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
  {
    name: '旅人輕旅卡',
    description: null,
    cardUrl: 'https://www.hsbc.com.tw/credit-cards/products/travel/visa-light/',
    storeBlackList,
    paymentBlackList,
    pointExchanges: [
      {
        id: generateUuid(),
        config: {
          name: '長榮航空哩程',
          airlineCode: 'EVA',
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
                type: 'AccumulatedPointsReward',
                name: '國外消費',
                spendingPerPoint: 20,
              },
              transactionType: 'Foreign',
            },
            {
              rewardStrategy: {
                type: 'AccumulatedPointsReward',
                name: '國內消費',
                spendingPerPoint: 20,
              },
              transactionType: 'Domestic',
            },
          ],
        },
      },
    ],
    updateAt: new Date('2024/12/01 00:00:00').toISOString(),
  },
]

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const exampleTravelConfig: CardConfig = travelConfigs[2]!
