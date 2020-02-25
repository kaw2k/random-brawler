export function uuid() {
  return Math.random()
    .toString()
    .slice(4, 20)
}
