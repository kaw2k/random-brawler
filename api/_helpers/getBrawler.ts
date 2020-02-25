import $ from 'cheerio'
import { Brawler } from '../../old_src/types/brawler'
import { uuid } from './uuid'
import fetch from 'isomorphic-unfetch'
import { shuffle } from '../../src/shuffle'

let BRAWLERS: { [brawler: string]: Brawler } = {}

export async function getBrawler(brawler: string): Promise<Brawler> {
  if (BRAWLERS[brawler]) return { ...BRAWLERS[brawler], uuid: uuid() }

  const brawler_url = `https://www.starlist.pro/brawlers/detail/${brawler}`
  const $html = $(await (await fetch(brawler_url)).text())
  const $starPowers = $html.find(`.star-power-title`)

  const fullBrawler: Brawler = {
    uuid: uuid(),
    brawler,
    starPower: shuffle(
      $starPowers.toArray().map(x => x.children[0].data) as string[]
    )[0],
  }

  BRAWLERS[brawler] = fullBrawler

  return fullBrawler
}
