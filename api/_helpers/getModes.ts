import $ from 'cheerio'
import { slugify } from './slugify'
import fetch from 'isomorphic-unfetch'

interface GameMode {
  mode: string
  src: string
  friendly: boolean
}

let MODES: GameMode[] = []

export async function getModes() {
  if (MODES.length) return MODES

  const modes_url = 'https://www.starlist.pro/gamemodes/'
  const $html = $(await (await fetch(modes_url)).text())
  const $modes = $html.find('.map-name').toArray()

  MODES = $modes.map($mode => {
    const mode = $($mode).text()

    return {
      mode: mode,
      src: `/assets/gamemode/${slugify(mode)}.png?v=1`,
      friendly:
        mode !== 'Boss Fight' && mode !== 'Robo Rumble' && mode !== 'Big Game',
    }
  }) as GameMode[]

  return MODES
}
