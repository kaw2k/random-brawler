import $ from 'cheerio'
import { slugify } from './slugify'

export async function getMaps(mode: string) {
  const events_url = `https://www.starlist.pro/gamemodes/detail/${slugify(
    mode
  )}/`
  const $html = $(await (await fetch(events_url)).text())
  const $enabledMaps = $html.find('.container > div').not('#disabled')
  const $maps = $($enabledMaps)
    .find('.map-block .card-title')
    .toArray()

  return $maps.map($map => {
    const map = $($map).text()

    return {
      src: `/assets/map-low/${slugify(map)}.png`,
      title: map,
    }
  })
}
