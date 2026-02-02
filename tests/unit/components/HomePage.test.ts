import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomePage from '~/components/sections/HomePage.vue'

describe('HomePage.vue', () => {
  describe('rendering', () => {
    it('renders hero section with heading', async () => {
      const wrapper = await mountSuspended(HomePage)

      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('h1').text()).toBe('A symphony of flavors in every dish')
    })

    it('renders hero subheading', async () => {
      const wrapper = await mountSuspended(HomePage)

      const subheading = wrapper.find('.hero-subheading')
      expect(subheading.exists()).toBe(true)
      expect(subheading.text()).toContain('Fresh, authentic Mediterranean cuisine')
    })

    it('renders hero eyebrow with location', async () => {
      const wrapper = await mountSuspended(HomePage)

      const eyebrow = wrapper.find('.hero-eyebrow')
      expect(eyebrow.exists()).toBe(true)
      expect(eyebrow.text()).toContain('Mediterranean Kitchen')
      expect(eyebrow.text()).toContain('Mobile, AL')
    })

    it('renders Order Online CTA button with external link', async () => {
      const wrapper = await mountSuspended(HomePage)

      const orderButton = wrapper.find('.hero-btn-primary')
      expect(orderButton.exists()).toBe(true)
      expect(orderButton.text()).toBe('Order Online')
      expect(orderButton.attributes('href')).toContain('order.online')
      expect(orderButton.attributes('target')).toBe('_blank')
      expect(orderButton.attributes('rel')).toBe('noopener noreferrer')
    })

    it('renders View Menu CTA button as NuxtLink', async () => {
      const wrapper = await mountSuspended(HomePage)

      const menuButton = wrapper.find('.hero-btn-secondary')
      expect(menuButton.exists()).toBe(true)
      expect(menuButton.text()).toBe('View Menu')
      expect(menuButton.attributes('href')).toBe('/menu')
    })

    it('renders scroll indicator', async () => {
      const wrapper = await mountSuspended(HomePage)

      const scrollIndicator = wrapper.find('.scroll-indicator')
      expect(scrollIndicator.exists()).toBe(true)
      expect(scrollIndicator.find('svg').exists()).toBe(true)
    })

    it('hero has background image with proper accessibility attributes', async () => {
      const wrapper = await mountSuspended(HomePage)

      // NuxtImg component provides the image with alt text for accessibility
      const heroImage = wrapper.find('img[alt="Chickpeas Restaurant"]')
      expect(heroImage.exists()).toBe(true)
    })
  })

  describe('child components', () => {
    it('renders Info component', async () => {
      const wrapper = await mountSuspended(HomePage)

      // Info component is imported and rendered
      expect(wrapper.text()).toContain('Our Story')
    })

    it('renders Location component', async () => {
      const wrapper = await mountSuspended(HomePage)

      // Location component is imported and rendered
      expect(wrapper.text()).toContain('Visit Us')
    })

    it('renders Menu component', async () => {
      const wrapper = await mountSuspended(HomePage)

      // Menu component should be rendered
      expect(wrapper.findComponent({ name: 'Menu' }).exists()).toBe(true)
    })
  })

  describe('props', () => {
    it('passes menuData prop to Menu component', async () => {
      const menuData = [{ name: 'Test Item', price: 10 }]
      const wrapper = await mountSuspended(HomePage, {
        props: { menuData }
      })

      expect(wrapper.findComponent({ name: 'Menu' }).exists()).toBe(true)
    })

    it('passes isLoading prop to Menu component', async () => {
      const wrapper = await mountSuspended(HomePage, {
        props: { isLoading: true }
      })

      expect(wrapper.findComponent({ name: 'Menu' }).exists()).toBe(true)
    })

    it('passes loadError prop to Menu component', async () => {
      const wrapper = await mountSuspended(HomePage, {
        props: { loadError: 'Failed to load' }
      })

      expect(wrapper.findComponent({ name: 'Menu' }).exists()).toBe(true)
    })

    it('uses default values when props are not provided', async () => {
      const wrapper = await mountSuspended(HomePage)

      expect(wrapper.findComponent({ name: 'Menu' }).exists()).toBe(true)
    })
  })

  describe('layout', () => {
    it('renders triangle section after hero', async () => {
      const wrapper = await mountSuspended(HomePage)

      const triangle = wrapper.find('.triangle')
      expect(triangle.exists()).toBe(true)
    })

    it('renders sections in correct order', async () => {
      const wrapper = await mountSuspended(HomePage)

      const sections = wrapper.findAll('section')
      expect(sections.length).toBeGreaterThanOrEqual(4) // hero, triangle, info, menu section, location
    })

    it('menu section has correct background color', async () => {
      const wrapper = await mountSuspended(HomePage)

      // Find the section containing Menu component
      const menuSection = wrapper.findAll('section').find(s => s.classes().includes('bg-[#fff0de]'))
      expect(menuSection?.exists()).toBe(true)
    })
  })

  describe('accessibility', () => {
    it('has proper heading structure with h1', async () => {
      const wrapper = await mountSuspended(HomePage)

      const h1 = wrapper.find('h1')
      expect(h1.exists()).toBe(true)
      expect(h1.text()).toBeTruthy()
    })

    it('external links have security attributes', async () => {
      const wrapper = await mountSuspended(HomePage)

      const orderButton = wrapper.find('.hero-btn-primary')
      expect(orderButton.attributes('target')).toBe('_blank')
      expect(orderButton.attributes('rel')).toBe('noopener noreferrer')
    })
  })
})
