import { NowRequest, NowResponse } from '@now/node'
import { getMaps, getModes, shuffle } from './_helpers'

export default async function(req: NowRequest, res: NowResponse) {
  const modes = (req.query.modes ? (req.query.modes as string).split(',') : (await getModes()).map(({mode}) => mode));

  const mode = shuffle(modes)[0];
  const map = shuffle(await getMaps(mode))[0] as {};

  return res.send({
      mode: mode,
      ...map
  });
}
