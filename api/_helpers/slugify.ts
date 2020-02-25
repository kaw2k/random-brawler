export const slugify = (slug: string) => {
  return slug.split(' ').join('-')
}
