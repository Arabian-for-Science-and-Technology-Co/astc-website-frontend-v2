export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.$router.options.scrollBehavior = () => {
    return { top: 0 };
  };

  nuxtApp.hook("page:finish", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});