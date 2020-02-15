import { NowRequest, NowResponse } from '@now/node'
import { getBrawler, getBrawlers, shuffle } from './_helpers'

export default async function(req: NowRequest, res: NowResponse) {
  const brawlers = shuffle(await getBrawlers())
  // const team = await getBrawler(brawlers.slice(0, 6))

  let team = []
  let teamIds = brawlers.slice(0, 6)

  for (let i = 0; i < teamIds.length; i++) {
    let brawlerId = teamIds[i]
    let brawler = await getBrawler(brawlerId)
    team.push({
      brawler: brawlerId,
      starPower: shuffle(brawler.starPowers)[0],
    })
  }

  return res.send(team)
}
