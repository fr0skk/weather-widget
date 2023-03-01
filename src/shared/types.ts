export interface Weather {
  id: string,
  city: string,
  country: string,
  main: string,
  description: string,
  icon: string,
  temp: number,
  humidity: number,
  windSpeed: number
}

export interface Location {
  city: string,
  country: string
}