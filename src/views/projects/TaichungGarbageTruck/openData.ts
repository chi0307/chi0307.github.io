import axios from 'axios'
import typia from 'typia'

import type { Time, UUID } from '@/types'

interface OpenDataQuery {
  offset: number
  fields: string
  limit: number
  sort: string
  filters: string
  q: string
}
async function queryOpenData(id: UUID, params: Partial<OpenDataQuery>): Promise<unknown> {
  const url = `https://datacenter.taichung.gov.tw/Swagger/OpenData/${id}`
  const { data }: { data: unknown } = await axios({
    method: 'get',
    url,
    params,
    headers: {
      Accept: 'application/json',
    },
  })

  return data
}

function getOpenDataEvent<Type extends OpenDataKey, I extends OpenDataMapping[Type]>(
  type: Type,
  params: Partial<OpenDataQuery>,
  checkInterfaceEvent: (input: unknown) => input is Record<keyof I, string>[],
  convertData: (list: Record<keyof I, string>[]) => I[],
  // 為了型別推論下面這行的 OpenDataMapping[Type] 不能使用 I 會讓型別推論出現 any
): () => Promise<OpenDataMapping[Type][]> {
  return async (): Promise<I[]> => {
    const list = await queryOpenData(openDataList[type], params)
    if (!checkInterfaceEvent(list)) {
      console.error(list)
      throw new Error(`get open data ${type} interface is not mapping`)
    }
    return convertData(list)
  }
}

interface OpenDataMapping {
  garbageTruckCollectionLocation: GarbageTruckCollectionLocationItem
  garbageTruckDynamicInformation: GarbageTruckDynamicInformationItem
}
type OpenDataKey = keyof OpenDataMapping
const openDataList = {
  garbageTruckCollectionLocation: 'c3f0f94c-1dda-475f-b7cf-824d2e074cad',
  garbageTruckDynamicInformation: 'c923ad20-2ec6-43b9-b3ab-54527e99f7bc',
} as const satisfies Record<keyof OpenDataMapping, UUID>

interface GarbageTruckCollectionLocationItem {
  area: string
  village: string
  car_licence: string
  caption: string
  task_type: '定點' | '沿街'
  g_d1_s: Time | ''
  g_d1_e: Time | ''
  g_d2_s: Time | ''
  g_d2_e: Time | ''
  g_d3_s: Time | ''
  g_d3_e: Time | ''
  g_d4_s: Time | ''
  g_d4_e: Time | ''
  g_d5_s: Time | ''
  g_d5_e: Time | ''
  g_d6_s: Time | ''
  g_d6_e: Time | ''
  g_d7_s: Time | ''
  g_d7_e: Time | ''
  r_d1_s: Time | ''
  r_d1_e: Time | ''
  r_d2_s: Time | ''
  r_d2_e: Time | ''
  r_d3_s: Time | ''
  r_d3_e: Time | ''
  r_d4_s: Time | ''
  r_d4_e: Time | ''
  r_d5_s: Time | ''
  r_d5_e: Time | ''
  r_d6_s: Time | ''
  r_d6_e: Time | ''
  r_d7_s: Time | ''
  r_d7_e: Time | ''
}
export const getGarbageTruckCollectionLocationItem = getOpenDataEvent(
  'garbageTruckCollectionLocation',
  {},
  typia.createIs<Record<keyof GarbageTruckCollectionLocationItem, string>[]>(),
  (list): GarbageTruckCollectionLocationItem[] => {
    const newList: GarbageTruckCollectionLocationItem[] = []
    for (const item of list) {
      if (typia.is<GarbageTruckCollectionLocationItem>(item)) {
        newList.push(item)
      }
    }
    return newList
  },
)

// input: 2024/12/1 上午 12:01:02
function parseTaiwanDateString(dateString: string): Date | null {
  const TaiwanDateStringRegexp =
    /^(?<year>\d{4})\/(?<month>\d{1,2})\/(?<day>\d{1,2}) (?<meridiem>上午|下午) (?<hour>\d{1,2}):(?<minute>\d{1,2}):(?<second>\d{1,2})$/

  const { year, month, day, meridiem, hour, minute, second } =
    TaiwanDateStringRegexp.exec(dateString)?.groups ?? {}
  if (
    year === undefined ||
    month === undefined ||
    day === undefined ||
    meridiem === undefined ||
    hour === undefined ||
    minute === undefined ||
    second === undefined
  ) {
    return null
  }
  const formattedHour = parseInt(hour) + (meridiem === '下午' ? 12 : 0)
  return new Date(`${year}/${month}/${day} ${formattedHour.toString()}:${minute}:${second}`)
}

// 只有截取需要的資料
interface GarbageTruckDynamicInformationItem {
  lineid: number
  car: string
  time: Date
  location: string
  X: number
  Y: number
}
export const getGarbageTruckDynamicInformationItem = getOpenDataEvent(
  'garbageTruckDynamicInformation',
  {},
  typia.createIs<Record<keyof GarbageTruckDynamicInformationItem, string>[]>(),
  (list): GarbageTruckDynamicInformationItem[] => {
    const newList: GarbageTruckDynamicInformationItem[] = []
    for (const item of list) {
      const date = parseTaiwanDateString(item.time)
      if (date === null) {
        continue
      }
      const newItem: GarbageTruckDynamicInformationItem = {
        ...item,
        lineid: parseInt(item.lineid),
        time: date,
        X: parseFloat(item.X),
        Y: parseFloat(item.Y),
      }
      newList.push(newItem)
    }
    return newList
  },
)
