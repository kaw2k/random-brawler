import { shuffle } from '../../utils/shuffle'
import { getBrawlers } from './_helpers/getBrawlers'
import { getBrawler } from './_helpers/getBrawler'
import { NextApiRequest, NextApiResponse } from 'next'

export interface BrawlersAPIQuery {
  count?: number
  filter?: string[]
}

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const { count = 1, filter = [] } = req.query as BrawlersAPIQuery

  const brawlers = await Promise.all(
    shuffle(await getBrawlers())
      .filter(b => !filter.includes(b))
      .slice(0, count)
      .map(async b => getBrawler(b))
  )

  return res.send(brawlers)
}
