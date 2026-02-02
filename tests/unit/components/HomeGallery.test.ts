import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import HomeGallery from '~/components/sections/HomeGallery.vue'

describe('HomeGallery.vue', () => {
  describe('rendering', () => {
    it('renders gallery section', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const gallery = wrapper.find('.gallery')
      expect(gallery.exists()).toBe(true)
    })

    it('renders two plate images', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const images = wrapper.findAll('img')
      expect(images.length).toBe(2)
    })

    it('images have proper alt text', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const images = wrapper.findAll('img')
      const altTexts = images.map(img => img.attributes('alt'))

      expect(altTexts).toContain('Delicious plate2')
      expect(altTexts).toContain('Delicious plate 1')
    })

    it('renders descriptive text about the restaurant', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      expect(wrapper.text()).toContain('Chef Ramona Murr')
      expect(wrapper.text()).toContain('Lebanese heritage')
      expect(wrapper.text()).toContain('living wages')
      expect(wrapper.text()).toContain('sustainable suppliers')
    })
  })

  describe('layout', () => {
    it('renders two-column flex layout', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const sectionWrap = wrapper.find('.section-wrap')
      expect(sectionWrap.exists()).toBe(true)
    })

    it('first column contains text and image', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const firstColumn = wrapper.findAll('.flex-col')[0]
      expect(firstColumn.exists()).toBe(true)

      // Should have paragraph text and an image
      expect(firstColumn.find('p').exists()).toBe(true)
      expect(firstColumn.find('img').exists()).toBe(true)
    })

    it('second column contains image', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const columns = wrapper.findAll('.flex-col')
      expect(columns.length).toBe(2)

      const secondColumn = columns[1]
      expect(secondColumn.find('img').exists()).toBe(true)
    })
  })

  describe('image sources', () => {
    it('first image points to plate-2.jpg', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const firstImage = wrapper.findAll('img')[0]
      expect(firstImage.attributes('src')).toContain('plate-2.jpg')
    })

    it('second image points to plate-1.jpg', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const images = wrapper.findAll('img')
      const secondImage = images[images.length - 1] // Get second image
      expect(secondImage.attributes('src')).toContain('plate-1.jpg')
    })
  })

  describe('content', () => {
    it('contains story about Chef Ramona Murr', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      expect(wrapper.text()).toContain('Chickpeas Mediterranean Grill')
      expect(wrapper.text()).toContain('manoushe')
      expect(wrapper.text()).toContain('shawarma')
    })

    it('mentions commitment to quality and sustainability', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      expect(wrapper.text()).toContain('living wages')
      // Note: the HTML uses a non-breaking hyphen character
      expect(wrapper.text()).toMatch(/tip[-\u2011]sharing/)
      expect(wrapper.text()).toContain('sustainable suppliers')
    })
  })

  describe('accessibility', () => {
    it('all images have alt attributes', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const images = wrapper.findAll('img')
      images.forEach(img => {
        expect(img.attributes('alt')).toBeTruthy()
      })
    })

    it('content is readable and properly structured', async () => {
      const wrapper = await mountSuspended(HomeGallery)

      const paragraph = wrapper.find('p')
      expect(paragraph.exists()).toBe(true)
      expect(paragraph.text().length).toBeGreaterThan(100) // Has substantial content
    })
  })
})
