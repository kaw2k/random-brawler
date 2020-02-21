import fetch from 'isomorphic-unfetch'
import $ from 'cheerio'

interface FullBrawler {
  brawler: string
  starPowers: string[]
}

interface PartialBrawler {
  brawler: string
  starPower: string
}

let BRAWLER_IDS: string[] = []
let BRAWLERS: { [brawler: string]: FullBrawler } = {}

export async function getBrawlers() {
  if (BRAWLER_IDS.length) return BRAWLER_IDS

  const brawlers_url = 'https://www.starlist.pro/brawlers/'
  const $html = $(await (await fetch(brawlers_url)).text())
  const $links = $html.find(`[href^='/brawlers/detail']`)
  const brawlers = $links.toArray().map(link => link.attribs.href.split('/')[3])

  BRAWLER_IDS = brawlers
  return brawlers as string[]
}

export async function getBrawler(brawler: string): Promise<FullBrawler> {
  if (BRAWLERS[brawler]) return BRAWLERS[brawler]

  const brawler_url = `https://www.starlist.pro/brawlers/detail/${brawler}`
  const $html = $(await (await fetch(brawler_url)).text())
  const $starPowers = $html.find(`.star-power-title`)

  const fullBrawler: FullBrawler = {
    brawler,
    starPowers: $starPowers.toArray().map(x => x.children[0].data) as string[],
  }

  BRAWLERS[brawler] = fullBrawler

  return fullBrawler
}

export async function getMaps(mode: string) {
  const events_url = `https://www.starlist.pro/gamemodes/detail/${slugify(mode)}/`;
  const $html = $(await (await (fetch(events_url))).text());
  const $enabledMaps = $html.find('.container > div').not('#disabled');
  const $maps = $($enabledMaps).find('.map-block .card-title').toArray();
  
  return $maps.map(($map) => {
    const map = $($map).text();

    return {
      src: `/assets/map-low/${slugify(map)}.png`,
      title: map
    };
  });
}

export async function getModes() {
  const modes_url = 'https://www.starlist.pro/gamemodes/';
  const $html = $(await (await (fetch(modes_url))).text());
  const $modes = $html.find('.map-name').toArray();

  return $modes.map(($mode) => {
    const mode = $($mode).text();

    return {
      mode: mode,
      src: `/assets/gamemode/header/${slugify(mode)}.png`,
      friendly: mode !== "Boss Fight" && mode !== "Robo Rumble" && mode !== "Big Game",
    }
  }) as {friendly: boolean, mode: string}[]
}

export async function getRandomBrawler(): Promise<PartialBrawler> {
  const brawlers = shuffle(await getBrawlers())
  const brawler = await getBrawler(brawlers[0])

  return {
    brawler: brawler.brawler,
    starPower: shuffle(brawler.starPowers)[0],
  }
}

export const slugify = (slug: string) => {
  return slug.split(" ").map((word) => {
    return `${word.substring(0, 1).toLocaleUpperCase()}${word.substring(1)}`
  }).join("-");
} 

export const shuffle = <T>(originalArray: T[]): T[] => {
  let array = originalArray.slice(0)
  let currentIndex = array.length,
    temporaryValue,
    randomIndex

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1

    // And swap it with the current element.
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }

  return array
}
