import type { CardConfig } from '../CreditCard'

// TODO: cube 權益需要修正，目前只是暫時的
export const cubeConfigs: CardConfig[] = [
  {
    name: 'Cube 卡',
    cardUrl: null,
    blackList: [],
    updateAt: '2024-12-01T00:00:00.000Z',
    airLines: 'EVA',
    plans: [
      {
        name: '集精選',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: null,
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: ['台灣中油', '全聯', '7-11', '全家'],
            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
            transactionType: null,
          },
        ],
      },
      {
        name: '來支付',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: null,
              pointBackRate: 2,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: [],
            payments: ['Line Pay'],
            transactionType: null,
          },
        ],
      },
      {
        name: '玩數位',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: null,
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: ['PChome', '蝦皮購物', '博客來', 'momo'],
            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
            transactionType: null,
          },
        ],
      },
      {
        name: '樂饗購',
        rewards: [
          {
            reward: {
              type: 'RoundedPointsRewardPercentage',
              name: null,
              pointBackRate: 3,
              pointsPerMile: 300,
              milesPerUnit: 1000,
            },
            stores: [
              'SOGO百貨',
              '太平洋百貨',
              '新光三越',
              'Uber Eats',
              'foodpanda',
              '康是美',
              '屈臣氏',
            ],

            payments: [
              '信用卡',
              'Apple Pay',
              'Samsung Pay',
              'Google Pay',
              'Fitbit Pay',
              'Garmin Pay',
              'Hami Pay',
            ],
            transactionType: null,
          },
        ],
      },
    ],
  },
]
