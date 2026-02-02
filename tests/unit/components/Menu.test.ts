import { describe, it, expect, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import Menu from '~/components/features/menu/Menu.vue'

const mockMenuData = [
  {
    id: 1,
    menu_item_title: 'Falafel Plate',
    menu_item_type: 'Plates',
    description: 'Crispy falafel with hummus and pita',
    price: '12.99',
    image: { guid: '/img/falafel.jpg' }
  },
  {
    id: 2,
    menu_item_title: 'Chicken Shawarma',
    menu_item_type: 'Plates',
    description: 'Marinated chicken with garlic sauce',
    price: '14.99',
    image: { guid: '/img/shawarma.jpg' }
  },
  {
    id: 3,
    menu_item_title: 'Hummus',
    menu_item_type: 'Sides',
    description: 'Classic chickpea dip',
    price: '5.99',
    image: null
  },
  {
    id: 4,
    menu_item_title: 'Family Platter',
    menu_item_type: 'Platters',
    description: 'Large platter for sharing',
    price_small: '29.99',
    price_large: '49.99',
    image: null
  }
]

describe('Menu.vue', () => {
  describe('rendering', () => {
    it('renders menu categories from menuData prop', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      const tabs = wrapper.findAll('.menu-header button')
      expect(tabs.length).toBe(3) // Plates, Sides, Platters
      expect(tabs.map(t => t.text())).toContain('Plates')
      expect(tabs.map(t => t.text())).toContain('Sides')
      expect(tabs.map(t => t.text())).toContain('Platters')
    })

    it('shows loading skeleton when isLoading=true', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: [],
          isLoading: true
        }
      })

      // Should show skeleton cards, not text
      expect(wrapper.find('.menu-skeleton').exists()).toBe(true)
      expect(wrapper.findAll('.skeleton-card').length).toBe(4)
      expect(wrapper.find('.skeleton-image').exists()).toBe(true)
    })

    it('displays error message when loadError is set', async () => {
      const errorMessage = 'Failed to load menu data'
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: [],
          loadError: errorMessage
        }
      })

      expect(wrapper.text()).toContain(errorMessage)
      expect(wrapper.find('.text-red-600').exists()).toBe(true)
    })

    it('handles empty menu data gracefully', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: []
        }
      })

      expect(wrapper.find('.menu-header').exists()).toBe(true)
      expect(wrapper.findAll('.menu-header li').length).toBe(0)
    })

    it('uses correct heading level from prop', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData,
          headingLevel: 'h1'
        }
      })

      expect(wrapper.find('h1').exists()).toBe(true)
      expect(wrapper.find('h2').exists()).toBe(false)
    })
  })

  describe('tab filtering', () => {
    it('filters items correctly when switching tabs', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      // First tab (Plates) should be selected by default
      await wrapper.vm.$nextTick()

      // Find Sides tab button and click it
      const sidesTab = wrapper.findAll('.menu-header button').find(btn => btn.text() === 'Sides')
      expect(sidesTab).toBeDefined()
      await sidesTab!.trigger('click')
      await wrapper.vm.$nextTick()

      // Should show only Hummus (the only Sides item)
      const menuItems = wrapper.findAll('.menu-items li')
      expect(menuItems.length).toBe(1)
      expect(wrapper.text()).toContain('Hummus')
    })

    it('selects first category by default', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      const activeTab = wrapper.find('.menu-header button.active')
      expect(activeTab.exists()).toBe(true)
    })

    it('shows empty message when category has no items', async () => {
      const emptyData = [
        {
          id: 1,
          menu_item_title: 'Test Item',
          menu_item_type: 'Category1',
          price: '10.00'
        }
      ]

      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: emptyData
        }
      })

      // Force selectedTab to a non-existent category
      wrapper.vm.selectedTab = 'NonExistent'
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('No items available')
    })
  })

  describe('price formatting', () => {
    it('displays single price correctly', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      expect(wrapper.text()).toContain('$12.99')
    })

    it('displays small/large prices correctly', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      // Click on Platters tab button
      const plattersTab = wrapper.findAll('.menu-header button').find(btn => btn.text() === 'Platters')
      await plattersTab!.trigger('click')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Small $29.99')
      expect(wrapper.text()).toContain('Large $49.99')
    })
  })

  describe('menu item type handling', () => {
    it('handles items with multiple menu_item_types as array', async () => {
      const dataWithArrayTypes = [
        {
          id: 1,
          menu_item_title: 'Combo Plate',
          menu_item_type: ['Plates', 'Specials'],
          price: '15.99'
        }
      ]

      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: dataWithArrayTypes
        }
      })

      await wrapper.vm.$nextTick()
      const tabs = wrapper.findAll('.menu-header button')
      expect(tabs.length).toBe(2) // Plates and Specials
      expect(tabs.map(t => t.text())).toContain('Plates')
      expect(tabs.map(t => t.text())).toContain('Specials')
    })
  })

  describe('accessibility', () => {
    it('has proper ARIA roles on tab list', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      const tablist = wrapper.find('.menu-header')
      expect(tablist.attributes('role')).toBe('tablist')
      expect(tablist.attributes('aria-label')).toBe('Menu categories')
    })

    it('tabs have proper ARIA attributes', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      const tabs = wrapper.findAll('.menu-header button')

      tabs.forEach(tab => {
        expect(tab.attributes('role')).toBe('tab')
        expect(tab.attributes('aria-selected')).toBeDefined()
        expect(tab.attributes('aria-controls')).toBeDefined()
      })
    })

    it('active tab has aria-selected=true', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      const activeTab = wrapper.find('.menu-header button.active')
      expect(activeTab.attributes('aria-selected')).toBe('true')
    })

    it('tabpanel has proper ARIA attributes', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      const tabpanel = wrapper.find('.menu-items-wrapper')
      expect(tabpanel.attributes('role')).toBe('tabpanel')
      expect(tabpanel.attributes('aria-labelledby')).toBeDefined()
    })

    it('supports keyboard navigation with arrow keys', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      await wrapper.vm.$nextTick()
      const firstTab = wrapper.find('.menu-header button')

      // Trigger ArrowRight keydown
      await firstTab.trigger('keydown', { key: 'ArrowRight' })
      await wrapper.vm.$nextTick()

      // Second tab should now be selected
      const tabs = wrapper.findAll('.menu-header button')
      expect(tabs[1].classes()).toContain('active')
    })
  })

  describe('computed properties', () => {
    it('menuItemTypes returns correct slug-to-label mapping', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      const menuItemTypes = wrapper.vm.menuItemTypes
      expect(menuItemTypes).toHaveProperty('plates', 'Plates')
      expect(menuItemTypes).toHaveProperty('sides', 'Sides')
      expect(menuItemTypes).toHaveProperty('platters', 'Platters')
    })

    it('currentMenuItems maps item data correctly', async () => {
      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: mockMenuData
        }
      })

      // Set tab to Plates
      wrapper.vm.selectedTab = 'Plates'
      await wrapper.vm.$nextTick()

      const currentItems = wrapper.vm.currentMenuItems
      expect(currentItems.length).toBe(2)
      expect(currentItems[0]).toMatchObject({
        id: 1,
        name: 'Falafel Plate',
        price: '12.99'
      })
    })

    it('strips HTML from description', async () => {
      const dataWithHtml = [
        {
          id: 1,
          menu_item_title: 'Test Item',
          menu_item_type: 'Test',
          content: { rendered: '<p>Delicious <strong>food</strong></p>' },
          price: '10.00'
        }
      ]

      const wrapper = await mountSuspended(Menu, {
        props: {
          menuData: dataWithHtml
        }
      })

      wrapper.vm.selectedTab = 'Test'
      await wrapper.vm.$nextTick()

      const currentItems = wrapper.vm.currentMenuItems
      expect(currentItems[0].description).toBe('Delicious food')
    })
  })
})
