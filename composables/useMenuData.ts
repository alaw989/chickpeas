export const useMenuData = () => {
  return useAsyncData('menu-data', () => $fetch('/api/menu'), {
    server: true
  })
}
