// middleware/guard-dynamic-page.ts
export default defineNuxtRouteMiddleware(async (to) => {
  const slug = to.params.slug as string

  // 1) Is it an actual dynamic page?
  const page = await getPageSection(slug).catch(() => null)
  if (Array.isArray(page) && page.length) return

  // 2) Not a page — is it a product alias?
  // Implement this API on your backend if you don’t have it yet.
  // It should accept old/alternate slugs and return the canonical product slug if found.
  const product = await getProductDetails?.(slug).catch(() => null)

  if (product?.slug) {
    return navigateTo(`/product-details/${product.slug}`, {
      redirectCode: 301,
      replace: true
    })
  }

  // 3) Neither? force a 404
  throw createError({ statusCode: 404, statusMessage: 'Not Found' })
})
