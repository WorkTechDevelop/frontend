import axios from 'axios'
import {
  WORKTECH_API_BASE_URL,
  WORKTECH_API_PREFIX,
  WORKTECH_API_VERSION,
} from '../../config'

export const buildApiUrl = (endpoint: string): string => {
  return `${WORKTECH_API_BASE_URL}/${WORKTECH_API_PREFIX}/${WORKTECH_API_VERSION}${endpoint}`
}

export const workTechApi = axios.create({
  baseURL: buildApiUrl(''),
})
