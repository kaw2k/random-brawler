import fetch from 'isomorphic-unfetch'
import $ from 'cheerio'

export async function getBrawlers() {
  const brawlers_url = 'https://www.starlist.pro/brawlers/'
  const $html = $(await (await fetch(brawlers_url)).text())
  const $links = $html.find(`[href^='/brawlers/detail']`)
  const brawlers = $links.toArray().map(link => link.attribs.href.split('/')[3])
  return brawlers as string[]
}

export async function getBrawler(brawler: string) {
  const brawler_url = `https://www.starlist.pro/brawlers/detail/${brawler}`
  const $html = $(await (await fetch(brawler_url)).text())
  const $starPowers = $html.find(`.star-power-title`)
  return {
    brawler,
    starPowers: $starPowers.toArray().map(x => x.children[0].data) as string[],
  }
}

export async function getMaps() {
  const events_url = 'https://www.starlist.pro/maps/';
  const $html = $(await (await (fetch(events_url))).text());
  const $mapsContainers = $html.find('.row');

  return $mapsContainers.toArray().reduce((res, $maps) => {
    const event = $($maps).find('h2').text();
    const maps = $($maps).find('.img-fluid img').toArray().map(($mapImage => {
      return {
        event,
        title: $mapImage.attribs.title,
        src: $mapImage.attribs.src
      };
    }))  
    
    return [...res, ...maps];
  }, []);
}

export async function getRandomBrawler() {
  const brawlers = shuffle(await getBrawlers())
  const brawler = await getBrawler(brawlers[0])

  return {
    brawler: brawler.brawler,
    starPower: shuffle(brawler.starPowers)[0],
  }
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


