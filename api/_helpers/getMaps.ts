import $ from 'cheerio'
import { slugify } from './slugify'
import fetch from 'isomorphic-unfetch'

let MODES: {} = {}

export async function getMaps(mode: string) {
  let maps = []

  if (!MODES[mode] || !MODES[mode].length) {
    const events_url = `https://www.starlist.pro/gamemodes/detail/${slugify(
      mode
    )}/`
    const $html = $(await (await fetch(events_url)).text())
    const $enabledMaps = $html.find('.container > div').not('#disabled')
    const $maps = $($enabledMaps)
      .find('.map-block .card-title')
      .toArray()
    MODES[mode] = $maps.map($map => {
      const map = $($map).text()

      return {
        src: `/assets/map-low/${slugify(map)}.png`,
        title: map,
        modeSrc: `/assets/gamemode/${slugify(mode)}.png?v=1`,
      }
    })
  }

  return MODES[mode]
}
