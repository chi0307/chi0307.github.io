import { Loader } from '@googlemaps/js-api-loader'
import axios from 'axios'
import typia from 'typia'

export async function loadMap(
  elementId: string,
  position: Record<'lat' | 'lng', number> | null,
): Promise<void> {
  const element = document.querySelector(`#${elementId}`)
  if (element === null || !(element instanceof HTMLElement)) {
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    console.error(`element is not instance HTMLElement, ${element}`)
    return
  }
  const loader = new Loader({
    apiKey: googleMapKey,
    version: 'weekly',
    libraries: ['places'],
  })

  const { Map } = await loader.importLibrary('maps')
  const { AdvancedMarkerElement } = await loader.importLibrary('marker')
  const map = new Map(element, {
    center: position,
    zoom: 4,
  })

  new AdvancedMarkerElement({
    map,
    position: {
      lat: 0,
      lng: 0,
    },
  })
}

interface GoogleApiGeolocationResponseData {
  location: {
    lat: number
    lng: number
  }
}
export async function setPosition(): Promise<void> {
  const url = `https://www.googleapis.com/geolocation/v1/geolocate?key=${googleMapKey}`
  const { data }: { data: unknown } = await axios.post(url)
  if (!typia.is<GoogleApiGeolocationResponseData>(data)) {
    await loadMap('map', null)
    return
  }
  console.log('data', data)

  await loadMap('map', data.location)
}
