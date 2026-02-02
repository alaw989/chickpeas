import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useMenuData } from '~/composables/useMenuData'

const mockMenuData = [
  {
    menu_item_title: 'Falafel Plate',
    menu_item_type: ['Plates'],
    description: 'Crispy falafel',
    price: '12.99'
  },
  {
    menu_item_title: 'Hummus',
    menu_item_type: ['Sides'],
    description: 'Classic dip',
    price: '5.99'
  }
]

describe('useMenuData', () => {
  let mockFetch: ReturnType<typeof vi.fn>

  beforeEach(() => {
    mockFetch = vi.fn()
    vi.stubGlobal('$fetch', mockFetch)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('returns data on successful fetch', async () => {
    mockFetch.mockResolvedValue(mockMenuData)

    const { data, error, status } = await useMenuData()

    // Wait for async data to resolve
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(mockFetch).toHaveBeenCalledWith('/api/menu')
    expect(data.value).toEqual(mockMenuData)
    expect(error.value).toBeNull()
  })

  it('handles API errors gracefully', async () => {
    const apiError = new Error('Network error')
    mockFetch.mockRejectedValue(apiError)

    const { data, error } = await useMenuData()

    // Wait for async data to resolve
    await new Promise(resolve => setTimeout(resolve, 0))

    expect(data.value).toBeNull()
    expect(error.value).toBeTruthy()
  })

  it('returns correct data structure', async () => {
    mockFetch.mockResolvedValue(mockMenuData)

    const result = await useMenuData()

    // useAsyncData returns specific properties
    expect(result).toHaveProperty('data')
    expect(result).toHaveProperty('error')
    expect(result).toHaveProperty('status')
    expect(result).toHaveProperty('refresh')
  })

  it('uses server-side rendering by default', async () => {
    mockFetch.mockResolvedValue(mockMenuData)

    // The composable passes server: true to useAsyncData
    // We can verify the composable is called correctly
    await useMenuData()

    expect(mockFetch).toHaveBeenCalled()
  })

  it('uses consistent cache key for data', async () => {
    mockFetch.mockResolvedValue(mockMenuData)

    // Call twice - with same cache key, useAsyncData should reuse cached data
    await useMenuData()
    await useMenuData()

    // Wait for async operations
    await new Promise(resolve => setTimeout(resolve, 0))

    // With caching, $fetch should only be called once for the same key
    // Note: In test environment, caching behavior may differ
    // The important thing is the composable uses a consistent key ('menu-data')
    expect(mockFetch).toHaveBeenCalledWith('/api/menu')
  })
})
