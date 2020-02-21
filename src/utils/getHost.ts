export function getHost(req: any) {
  if (!req) return ''

  const { host } = req.headers

  if (host.startsWith('localhost')) {
    return `http://${host}`
  }
  return `https://${host}`
}
