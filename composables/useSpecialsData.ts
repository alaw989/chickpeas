export const useSpecialsData = () => {
  return useAsyncData('specials-data', () => $fetch('/api/specials'), {
    server: true
  })
}
