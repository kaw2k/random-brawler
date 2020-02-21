import fetch from 'isomorphic-unfetch'
import $ from 'cheerio'

let BRAWLER_IDS: string[] = []

export async function getBrawlers() {
  if (BRAWLER_IDS.length) return BRAWLER_IDS

  const brawlers_url = 'https://www.starlist.pro/brawlers/'
  const $html = $(await (await fetch(brawlers_url)).text())
  const $links = $html.find(`[href^='/brawlers/detail']`)
  const brawlers = $links.toArray().map(link => link.attribs.href.split('/')[3])

  BRAWLER_IDS = brawlers
  return brawlers as string[]
}
