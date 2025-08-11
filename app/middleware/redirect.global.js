import { matchPattern } from '~/utils/route-patterns'

export default defineNuxtRouteMiddleware((to) => {
  const forbiddenRoutes = [
    //
    '/news',
    // '/about',
    // 'product-details/:id'
  ]
  const { matched, pattern, groups } = matchPattern(to.path, forbiddenRoutes, { exact: false })

  if (matched) {
    return navigateTo('/')
  }
})
