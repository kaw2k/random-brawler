import $ from 'cheerio'
import { Brawler } from '../../../types/brawler'
import { uuid } from './uuid'

let BRAWLERS: { [brawler: string]: Brawler } = {}

export async function getBrawler(brawler: string): Promise<Brawler> {
  if (BRAWLERS[brawler]) return { ...BRAWLERS[brawler], uuid: uuid() }

  const brawler_url = `https://www.starlist.pro/brawlers/detail/${brawler}`
  const $html = $(await (await fetch(brawler_url)).text())
  const $starPowers = $html.find(`.star-power-title`)

  const fullBrawler: Brawler = {
    uuid: uuid(),
    brawler,
    starPowers: $starPowers.toArray().map(x => x.children[0].data) as string[],
  }

  BRAWLERS[brawler] = fullBrawler

  return fullBrawler
}
