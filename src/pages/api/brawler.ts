import { shuffle } from '../../utils/shuffle'
import { getBrawlers } from './_helpers/getBrawlers'
import { getBrawler } from './_helpers/getBrawler'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const brawlers = shuffle(await getBrawlers())
  const brawler = await getBrawler(brawlers[0])

  return res.send([brawler])
}
