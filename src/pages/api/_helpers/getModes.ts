import $ from 'cheerio'
import { slugify } from './slugify'

export async function getModes() {
  const modes_url = 'https://www.starlist.pro/gamemodes/'
  const $html = $(await (await fetch(modes_url)).text())
  const $modes = $html.find('.map-name').toArray()

  return $modes.map($mode => {
    const mode = $($mode).text()

    return {
      mode: mode,
      src: `/assets/gamemode/header/${slugify(mode)}.png`,
      friendly:
        mode !== 'Boss Fight' && mode !== 'Robo Rumble' && mode !== 'Big Game',
    }
  }) as { friendly: boolean; mode: string }[]
}
