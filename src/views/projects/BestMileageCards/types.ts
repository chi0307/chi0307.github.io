import typia from 'typia'

export type ShowRewardMilesType = 'AllPlanRewardMiles' | 'CurrentPlanRewardMiles'
export const isShowRewardMilesType = typia.createIs<ShowRewardMilesType>()
export const defaultRewardMilesType = 'AllPlanRewardMiles' satisfies ShowRewardMilesType
