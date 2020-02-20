import { NowRequest, NowResponse } from '@now/node'
import { getModes, shuffle } from './_helpers'

export default async function(req: NowRequest, res: NowResponse) {
  const modes = await getModes();

  return res.send(modes);
}
