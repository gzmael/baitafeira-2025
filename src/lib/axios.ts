import axios from 'axios'

import { env } from '@/env'

export const apiLocal = axios.create({
  baseURL: `${env.NEXT_PUBLIC_APP_URL}/api`,
})

export const cepApi = axios.create({
  baseURL: 'https://viacep.com.br/ws/',
})

export const cnpjApi = axios.create({
  baseURL: 'https://api-publica.speedio.com.br/buscarcnpj?cnpj=',
})

export const googleGeocodingApi = axios.create({
  baseURL: 'https://maps.googleapis.com/maps/api/geocode/json?',
  params: {
    key: env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
  },
})
