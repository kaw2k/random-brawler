import { getModes } from './_helpers/getModes'
import { NowRequest, NowResponse } from '@now/node'

export default async function(req: NowRequest, res: NowResponse) {
  const modes = await getModes()

  return res.send(modes.filter(m => m.friendly))
}
