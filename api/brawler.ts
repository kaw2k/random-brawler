import { shuffle } from '../src/shuffle'
import { getBrawlers } from './_helpers/getBrawlers'
import { getBrawler } from './_helpers/getBrawler'
import { NowRequest, NowResponse } from '@now/node'

export interface BrawlersAPIQuery {
  count?: number
  filter?: string[]
}

export default async function(req: NowRequest, res: NowResponse) {
  const { count = 1, filter = [] } = req.query as BrawlersAPIQuery

  const brawlers = await Promise.all(
    shuffle(await getBrawlers())
      .filter(b => !filter.includes(b))
      .slice(0, count)
      .map(async b => getBrawler(b))
  )

  return res.send(brawlers)
}
