export const Payment = ['Line Pay', 'Apple Pay', '街口支付', '信用卡'] as const
export type Payment = (typeof Payment)[number]

export interface PaymentInfo {
  store: string
  payment: Payment
  amount: number
}

export interface RewardMileInfo {
  name: string
  miles: number
}
