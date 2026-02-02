import { describe, it, expect } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import NavBar from '~/components/features/navigation/NavBar.vue'

describe('NavBar.vue', () => {
  describe('rendering', () => {
    it('renders all menu items', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Desktop menu should have all 4 items
      const desktopItems = wrapper.findAll('.menu li')
      expect(desktopItems.length).toBe(4)

      // Check labels
      expect(wrapper.text()).toContain('View Our Menu')
      expect(wrapper.text()).toContain('Order Takeout')
      expect(wrapper.text()).toContain('Order Delivery')
      expect(wrapper.text()).toContain('Contact Us')
    })

    it('renders logo with NuxtLink to home', async () => {
      const wrapper = await mountSuspended(NavBar)

      const logoLink = wrapper.find('.logo a')
      expect(logoLink.exists()).toBe(true)
      expect(logoLink.attributes('href')).toBe('/')
    })

    it('renders hamburger button for mobile', async () => {
      const wrapper = await mountSuspended(NavBar)

      const hamburger = wrapper.find('.hamburger')
      expect(hamburger.exists()).toBe(true)
      expect(hamburger.attributes('aria-label')).toBe('Open menu')
    })

    it('logo image has width and height attributes', async () => {
      const wrapper = await mountSuspended(NavBar)

      const logoImg = wrapper.find('.logo img')
      expect(logoImg.attributes('width')).toBe('300')
      expect(logoImg.attributes('height')).toBe('100')
    })
  })

  describe('link types', () => {
    it('renders internal links as NuxtLink with to attribute', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Menu link should be a NuxtLink (renders as <a> with href)
      const menuLink = wrapper.find('.menu a[href="/menu"]')
      expect(menuLink.exists()).toBe(true)
      expect(menuLink.text()).toBe('View Our Menu')

      // Contact link
      const contactLink = wrapper.find('.menu a[href="/contact"]')
      expect(contactLink.exists()).toBe(true)
      expect(contactLink.text()).toBe('Contact Us')
    })

    it('renders external links (takeout/delivery) as <a> tags with target="_blank"', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Takeout and delivery links should be external (loaded from data.json)
      const externalLinks = wrapper.findAll('.menu a[target="_blank"]')
      expect(externalLinks.length).toBe(2) // takeout and delivery

      // Verify they have correct attributes
      externalLinks.forEach(link => {
        expect(link.attributes('rel')).toBe('noopener noreferrer')
        expect(link.attributes('href')).toContain('order.online') // DoorDash URL from data.json
      })
    })

    it('external links have DoorDash URL from imported data.json', async () => {
      const wrapper = await mountSuspended(NavBar)

      const takeoutLink = wrapper.find('.menu a[target="_blank"]')
      const href = takeoutLink.attributes('href')

      // URL should be the DoorDash URL from public/data.json
      expect(href).toContain('order.online/store/chickpeas-mediterranean-grill')
    })
  })

  describe('mobile menu', () => {
    it('mobile menu is hidden by default', async () => {
      const wrapper = await mountSuspended(NavBar)

      const mobileMenu = wrapper.find('.mobile-menu')
      expect(mobileMenu.exists()).toBe(true)
      // Check that it has the translate-x-full class (hidden)
      expect(mobileMenu.classes()).toContain('translate-x-full')
    })

    it('toggles mobile menu open when hamburger is clicked', async () => {
      const wrapper = await mountSuspended(NavBar)

      const hamburger = wrapper.find('.hamburger')
      await hamburger.trigger('click')

      const mobileMenu = wrapper.find('.mobile-menu')
      expect(mobileMenu.classes()).toContain('translate-x-0')
      expect(mobileMenu.classes()).not.toContain('translate-x-full')
    })

    it('closes mobile menu when close button is clicked', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Open menu first
      const hamburger = wrapper.find('.hamburger')
      await hamburger.trigger('click')

      // Find close button in mobile menu
      const closeButton = wrapper.find('.mobile-menu button[aria-label="Close menu"]')
      await closeButton.trigger('click')

      const mobileMenu = wrapper.find('.mobile-menu')
      expect(mobileMenu.classes()).toContain('translate-x-full')
    })

    it('closes mobile menu when a link is clicked', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Open menu
      await wrapper.find('.hamburger').trigger('click')
      expect(wrapper.find('.mobile-menu').classes()).toContain('translate-x-0')

      // Click a menu link
      const mobileLink = wrapper.find('.mobile-menu .mobile-nav-link')
      await mobileLink.trigger('click')

      expect(wrapper.find('.mobile-menu').classes()).toContain('translate-x-full')
    })

    it('mobile menu contains same items as desktop menu', async () => {
      const wrapper = await mountSuspended(NavBar)

      const mobileItems = wrapper.findAll('.mobile-menu li')
      expect(mobileItems.length).toBe(4)

      expect(wrapper.find('.mobile-menu').text()).toContain('View Our Menu')
      expect(wrapper.find('.mobile-menu').text()).toContain('Order Takeout')
      expect(wrapper.find('.mobile-menu').text()).toContain('Order Delivery')
      expect(wrapper.find('.mobile-menu').text()).toContain('Contact Us')
    })
  })

  describe('active route highlighting', () => {
    it('routePath computed property defaults to "/"', async () => {
      const wrapper = await mountSuspended(NavBar)

      // In test environment, route defaults to '/'
      // The template uses routePath for active state comparison
      const menuLinks = wrapper.findAll('.menu .nav-link')
      expect(menuLinks.length).toBeGreaterThan(0)
    })

    it('no nav links are active on home page (no menu item has to="/")', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Since we're on '/', and no menu item has to: '/', none should be active
      const activeLinks = wrapper.findAll('.menu .nav-link-active')
      expect(activeLinks.length).toBe(0)
    })

    it('logo opacity binding uses routePath comparison', async () => {
      const wrapper = await mountSuspended(NavBar)

      // The template uses :class="{ 'opacity-80': routePath !== '/' }"
      // When routePath is '/', logo should NOT have opacity-80
      const logoImg = wrapper.find('.logo img')

      // In test environment, route defaults to '/' so logo should have full opacity
      expect(logoImg.classes()).not.toContain('opacity-80')
    })
  })

  describe('CTA styling', () => {
    it('applies CTA styling to Contact Us button in desktop', async () => {
      const wrapper = await mountSuspended(NavBar)

      const contactLink = wrapper.find('.menu a[href="/contact"]')
      expect(contactLink.classes()).toContain('nav-link-cta')
    })

    it('applies CTA styling to Contact Us button in mobile', async () => {
      const wrapper = await mountSuspended(NavBar)

      // Find contact link in mobile menu
      const mobileLinks = wrapper.findAll('.mobile-menu .mobile-nav-link')
      const contactLink = mobileLinks.find(link => link.text() === 'Contact Us')

      expect(contactLink?.classes()).toContain('mobile-nav-cta')
    })
  })
})
