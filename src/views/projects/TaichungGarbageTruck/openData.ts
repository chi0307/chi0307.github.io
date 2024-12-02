import { createApiClient } from '@chi0307/axios-wrapper'
import typia from 'typia'

export type Time =
  `${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23'}:${'00' | '01' | '02' | '03' | '04' | '05' | '06' | '07' | '08' | '09' | '10' | '11' | '12' | '13' | '14' | '15' | '16' | '17' | '18' | '19' | '20' | '21' | '22' | '23' | '24' | '25' | '26' | '27' | '28' | '29' | '30' | '31' | '32' | '33' | '34' | '35' | '36' | '37' | '38' | '39' | '40' | '41' | '42' | '43' | '44' | '45' | '46' | '47' | '48' | '49' | '50' | '51' | '52' | '53' | '54' | '55' | '56' | '57' | '58' | '59'}`

const apiClient = createApiClient('https://datacenter.taichung.gov.tw/Swagger/OpenData/', [], {
  headers: {
    Accept: 'application/json',
  },
})

interface OpenDataQuery {
  offset?: number
  fields?: string
  limit?: number
  sort?: string
  filters?: string
  q?: string
}

const getGarbageTruckDynamicInformationApi = apiClient.get<
  never,
  OpenDataQuery,
  Record<keyof GarbageTruckDynamicInformationItem, string>[]
>(
  '/c923ad20-2ec6-43b9-b3ab-54527e99f7bc',
  typia.createIs<Record<keyof GarbageTruckDynamicInformationItem, string>[]>(),
)

const getGarbageTruckCollectionLocationApi = apiClient.get<
  never,
  OpenDataQuery,
  Record<keyof GarbageTruckCollectionLocationItem, string>[]
>(
  '/c3f0f94c-1dda-475f-b7cf-824d2e074cad',
  typia.createIs<Record<keyof GarbageTruckCollectionLocationItem, string>[]>(),
)

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
export async function getGarbageTruckCollectionLocationItem(
  options: Parameters<typeof getGarbageTruckDynamicInformationApi>[0] = {},
): Promise<null | GarbageTruckCollectionLocationItem[]> {
  const { data } = await getGarbageTruckCollectionLocationApi(options)
  if (data === null) {
    return null
  }

  const newList: GarbageTruckCollectionLocationItem[] = []
  for (const item of data) {
    if (typia.is<GarbageTruckCollectionLocationItem>(item)) {
      newList.push(item)
    } else {
      // 有可能 Time 會出錯，看過出錯寫 `114:0`, `9:05` 都有...
      console.error(JSON.stringify(item, null, 2))
    }
  }
  return newList
}

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
export async function getGarbageTruckDynamicInformationItem(
  options: Parameters<typeof getGarbageTruckDynamicInformationApi>[0] = {},
): Promise<GarbageTruckDynamicInformationItem[] | null> {
  const { data } = await getGarbageTruckDynamicInformationApi(options)
  if (data === null) {
    return null
  }

  const newList: GarbageTruckDynamicInformationItem[] = []
  for (const item of data) {
    const date = parseTaiwanDateString(item.time)
    if (date === null) {
      console.error(JSON.stringify(item, null, 2))
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
}
