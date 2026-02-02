import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomeInfo from '~/components/sections/HomeInfo.vue'

describe('HomeInfo.vue', () => {
  describe('rendering', () => {
    it('renders the story section with heading', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const heading = wrapper.find('h2')
      expect(heading.exists()).toBe(true)
      expect(heading.text()).toBe('The recipe behind our success')
    })

    it('renders the eyebrow label', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('Our Story')
    })

    it('renders story paragraphs with restaurant info', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('Chef Ramona Murr')
      expect(wrapper.text()).toContain('Lebanese heritage')
      expect(wrapper.text()).toContain('Mobile')
    })

    it('renders Order Online button in story card', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const orderButton = wrapper.findAll('a').find(link => link.text() === 'Order Online')
      expect(orderButton?.exists()).toBe(true)
      expect(orderButton?.attributes('href')).toContain('order.online')
      expect(orderButton?.attributes('target')).toBe('_blank')
      expect(orderButton?.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('location section', () => {
    it('renders visit us heading', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('Visit Us For The Ultimate Mediterranean Dining Experience')
    })

    it('renders address', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('850 Blackburn Dr, Mobile, AL 36608')
    })

    it('renders Google Maps link for address', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const addressLink = wrapper.findAll('a').find(link => link.attributes('href')?.includes('google.com/maps'))
      expect(addressLink?.exists()).toBe(true)
      expect(addressLink?.attributes('target')).toBe('_blank')
      expect(addressLink?.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('hours section', () => {
    it('renders hours label', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('Hours')
    })

    it('renders all days of the week', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('Monday')
      expect(wrapper.text()).toContain('Tue – Thu')
      expect(wrapper.text()).toContain('Fri – Sat')
      expect(wrapper.text()).toContain('Sunday')
    })

    it('renders Monday as closed', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const hoursText = wrapper.html()
      // Should show Monday with "Closed" text nearby
      expect(wrapper.text()).toContain('Monday')
      expect(wrapper.text()).toContain('Closed')
    })

    it('renders Tuesday-Thursday hours', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('6AM – 6PM')
    })

    it('renders Friday-Saturday hours', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const text = wrapper.text()
      // Friday-Saturday should have 6AM – 8PM
      expect(text).toContain('6AM – 8PM')
    })

    it('renders Sunday hours', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      expect(wrapper.text()).toContain('6AM – 4PM')
    })
  })

  describe('Get Directions button', () => {
    it('renders Get Directions button', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const directionsButton = wrapper.findAll('a').find(link => link.text() === 'Get Directions')
      expect(directionsButton?.exists()).toBe(true)
    })

    it('Get Directions links to Google Maps directions', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const directionsButton = wrapper.findAll('a').find(link => link.text() === 'Get Directions')
      expect(directionsButton?.attributes('href')).toContain('maps/dir')
      expect(directionsButton?.attributes('target')).toBe('_blank')
      expect(directionsButton?.attributes('rel')).toBe('noopener noreferrer')
    })
  })

  describe('layout and styling', () => {
    it('has two main content columns', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const infoContainer = wrapper.find('.info-container')
      expect(infoContainer.exists()).toBe(true)
    })

    it('renders restaurant background image', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const bgImage = wrapper.find('.chickpeas-bg')
      expect(bgImage.exists()).toBe(true)
      expect(bgImage.attributes('style')).toContain('background-image')
      expect(bgImage.attributes('role')).toBe('img')
    })
  })

  describe('accessibility', () => {
    it('external links have proper security attributes', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const externalLinks = wrapper.findAll('a[target="_blank"]')
      expect(externalLinks.length).toBeGreaterThan(0)

      externalLinks.forEach(link => {
        expect(link.attributes('rel')).toBe('noopener noreferrer')
      })
    })

    it('images have alt text', async () => {
      const wrapper = await mountSuspended(HomeInfo)

      const images = wrapper.findAll('img')
      expect(images.length).toBeGreaterThan(0)

      images.forEach(img => {
        expect(img.attributes('alt')).toBeTruthy()
      })
    })
  })
})
