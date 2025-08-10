export default defineNuxtRouteMiddleware((to) => {
  const forbiddenRoutes = [
    //
    // '/news',
    // '/about'
  ]

  if (forbiddenRoutes.includes(to.path)) {
    return navigateTo('/')
  }
})
