export const slugify = (slug: string) => {
  return slug
    .split(' ')
    .map(word => {
      return `${word.substring(0, 1).toLocaleUpperCase()}${word.substring(1)}`
    })
    .join('-')
}
