import { Brawler } from '../types/brawler'
import { BrawlersAPIQuery } from '../pages/api/brawler'
import { ajax } from './ajax'

export async function getBrawler(options?: BrawlersAPIQuery) {
  return ajax.get<Brawler[]>('/api/brawler', options)
}
