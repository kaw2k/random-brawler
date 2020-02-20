import { NowRequest, NowResponse } from '@now/node'
import { getMaps, shuffle } from './_helpers'

export default async function(req: NowRequest, res: NowResponse) {
  const maps = shuffle(await getMaps())

  return res.send(shuffle(maps)[0]);
}
