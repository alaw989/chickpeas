export const useSiteData = () => {
  return useAsyncData('site-data', () => $fetch('/data.json'), {
    server: true
  })
}
