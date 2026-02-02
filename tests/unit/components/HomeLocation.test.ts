import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomeLocation from '~/components/sections/HomeLocation.vue'

// Mock Leaflet
const mockMap = {
  setView: vi.fn().mockReturnThis(),
  invalidateSize: vi.fn(),
}
const mockMarker = {
  addTo: vi.fn().mockReturnThis(),
  bindPopup: vi.fn().mockReturnThis(),
}

vi.mock('leaflet', () => ({
  default: {
    map: vi.fn(() => mockMap),
    tileLayer: vi.fn(() => ({
      addTo: vi.fn().mockReturnThis(),
    })),
    divIcon: vi.fn(() => ({})),
    marker: vi.fn(() => mockMarker),
  },
}))

describe('HomeLocation.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders location section header', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Visit Us')
    })

    it('renders main heading', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('Visit Us For The Ultimate Mediterranean Dining Experience')
    })

    it('renders address in lead paragraph', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const lead = wrapper.find('.lead')
      expect(lead.exists()).toBe(true)
      expect(lead.text()).toBe('850 Blackburn Dr, Mobile, AL 36608')
    })
  })

  describe('hours section', () => {
    it('renders hours label with icon', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Hours')
    })

    it('renders hours list for all days', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const hoursList = wrapper.find('.hours-list')
      expect(hoursList.exists()).toBe(true)

      const listItems = hoursList.findAll('li')
      expect(listItems.length).toBe(4) // Monday, Tue-Thu, Fri-Sat, Sunday
    })

    it('renders Monday as closed', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Monday')
      expect(wrapper.html()).toContain('Closed')
    })

    it('renders Tuesday-Thursday hours', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Tue – Thu')
      expect(wrapper.text()).toContain('6AM – 6PM')
    })

    it('renders Friday-Saturday hours', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Fri – Sat')
      expect(wrapper.text()).toContain('6AM – 8PM')
    })

    it('renders Sunday hours', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      expect(wrapper.text()).toContain('Sunday')
      expect(wrapper.text()).toContain('6AM – 4PM')
    })
  })

  describe('CTA buttons', () => {
    it('renders Order Online button', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const orderButton = wrapper.findAll('a').find(link => link.text() === 'Order Online')
      expect(orderButton?.exists()).toBe(true)
      expect(orderButton?.attributes('href')).toContain('order.online')
      expect(orderButton?.attributes('target')).toBe('_blank')
      expect(orderButton?.attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders Get Directions button', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const directionsButton = wrapper.findAll('a').find(link => link.text() === 'Get Directions')
      expect(directionsButton?.exists()).toBe(true)
      expect(directionsButton?.attributes('href')).toContain('maps/dir')
      expect(directionsButton?.attributes('target')).toBe('_blank')
      expect(directionsButton?.attributes('rel')).toBe('noopener noreferrer')
    })

    it('buttons are in the info card', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const infoCard = wrapper.find('.info-card')
      expect(infoCard.exists()).toBe(true)

      const ctaRow = infoCard.find('.cta-row')
      expect(ctaRow.exists()).toBe(true)
    })
  })

  describe('map section', () => {
    it('renders map container', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const mapCard = wrapper.find('.map-card')
      expect(mapCard.exists()).toBe(true)
    })

    it('renders map shell with proper attributes', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const mapShell = wrapper.find('.map-shell')
      expect(mapShell.exists()).toBe(true)
    })

    it('renders map canvas element', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const mapCanvas = wrapper.find('.map-canvas')
      expect(mapCanvas.exists()).toBe(true)
      expect(mapCanvas.attributes('aria-label')).toBe('Map showing Chickpea\'s Restaurant location')
    })

    it('renders map badge with hours', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const mapBadge = wrapper.find('.map-badge')
      expect(mapBadge.exists()).toBe(true)
      expect(mapBadge.text()).toContain('Open today')
      expect(mapBadge.text()).toContain('6AM-6PM')
    })
  })

  describe('layout', () => {
    it('renders two-column layout for location grid', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const locationGrid = wrapper.find('.location-grid')
      expect(locationGrid.exists()).toBe(true)
    })

    it('renders info card and map card', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const infoCard = wrapper.find('.info-card')
      const mapCard = wrapper.find('.map-card')

      expect(infoCard.exists()).toBe(true)
      expect(mapCard.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('external links have security attributes', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const externalLinks = wrapper.findAll('a[target="_blank"]')
      expect(externalLinks.length).toBeGreaterThan(0)

      externalLinks.forEach(link => {
        expect(link.attributes('rel')).toBe('noopener noreferrer')
      })
    })

    it('map canvas has aria-label', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const mapCanvas = wrapper.find('.map-canvas')
      expect(mapCanvas.attributes('aria-label')).toBe('Map showing Chickpea\'s Restaurant location')
    })

    it('hours icon has proper SVG attributes', async () => {
      const wrapper = await mountSuspended(HomeLocation)

      const icon = wrapper.find('.hours-header svg')
      expect(icon.exists()).toBe(true)
      expect(icon.attributes('stroke')).toBe('#3f6e4d')
    })
  })
})
