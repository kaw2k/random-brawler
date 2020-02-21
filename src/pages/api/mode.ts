import { getModes } from './_helpers/getModes'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function(req: NextApiRequest, res: NextApiResponse) {
  const modes = await getModes()

  return res.send(modes)
}
