declare namespace google.maps {
  class Map {
    constructor(mapDiv: Element, opts?: MapOptions)
  }
  interface MapOptions {
    center: LatLng | LatLngLiteral
    zoom: number
  }
  class Marker {
    constructor(opts?: MarkerOptions)
  }
  interface MarkerOptions {
    position: LatLng | LatLngLiteral
    map?: Map
    title?: string
  }
  interface LatLng {
    lat(): number
    lng(): number
  }
  interface LatLngLiteral {
    lat: number
    lng: number
  }
}
