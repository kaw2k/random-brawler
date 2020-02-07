import { NowRequest, NowResponse } from '@now/node'
import { getBrawler, getBrawlers, shuffle } from './_helpers'

export default async function(req: NowRequest, res: NowResponse) {
  const brawlers = shuffle(await getBrawlers())
  const brawler = await getBrawler(brawlers[0])

  return res.send({
    brawler: brawler.brawler,
    starPower: shuffle(brawler.starPowers)[0],
  })
}
