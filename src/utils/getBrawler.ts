import { Brawler } from '../types/brawler'

export async function getBrawler(options?: {
  count?: number
  repeats?: boolean
  filter?: string[]
}) {
  return (await (await fetch('/api/brawler')).json()) as Brawler[]
}
