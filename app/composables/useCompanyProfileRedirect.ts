type CompanyProfileKey = 'company_profile_en' | 'company_profile_ar'

export const useCompanyProfileRedirect = async (profileKey: CompanyProfileKey) => {
  const nuxtApp = useNuxtApp()
  const { settings, fetchSettings } = useWebsiteSettings()

  await fetchSettings()

  const profileUrl = settings.value?.[profileKey]

  if (!profileUrl) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Company profile was not found.'
    })
  }

  return nuxtApp.runWithContext(() =>
    navigateTo(profileUrl, {
      external: true,
      redirectCode: 302,
      replace: true
    })
  )
}
