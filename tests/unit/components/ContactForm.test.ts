import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mountSuspended, mount } from '@nuxt/test-utils/runtime'
import ContactForm from '~/components/sections/ContactForm.vue'

// Mock global fetch
global.fetch = vi.fn() as unknown as typeof fetch

describe('ContactForm.vue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('rendering', () => {
    it('renders all form fields', async () => {
      const wrapper = await mountSuspended(ContactForm)

      expect(wrapper.find('#firstName').exists()).toBe(true)
      expect(wrapper.find('#lastName').exists()).toBe(true)
      expect(wrapper.find('#email').exists()).toBe(true)
      expect(wrapper.find('#subject').exists()).toBe(true)
      expect(wrapper.find('#message').exists()).toBe(true)
    })

    it('renders submit button', async () => {
      const wrapper = await mountSuspended(ContactForm)

      const button = wrapper.find('button[type="submit"]')
      expect(button.exists()).toBe(true)
      expect(button.text()).toBe('Submit')
    })

    it('renders honeypot field hidden', async () => {
      const wrapper = await mountSuspended(ContactForm)

      const honeypot = wrapper.find('input[name="website"]')
      expect(honeypot.exists()).toBe(true)
      expect(honeypot.attributes('tabindex')).toBe('-1')
      expect(honeypot.attributes('aria-hidden')).toBe('true')
    })
  })

  describe('form validation', () => {
    it('requires first name - does not submit API call', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      // Form should not submit if validation fails
      expect(fetch).not.toHaveBeenCalled()
    })

    it('requires last name - does not submit API call', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('requires valid email format - does not submit API call', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('invalid-email')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('requires subject - does not submit API call', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('requires message - does not submit API call', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#subject').setValue('Test')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(fetch).not.toHaveBeenCalled()
    })

    it('submits successfully with valid data', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({})
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('test@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')

      expect(fetch).toHaveBeenCalled()
    })
  })

  describe('submit handler', () => {
    it('calls endpoint with correct data on valid submit', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({})
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test Subject')
      await wrapper.find('#message').setValue('Test message')

      await wrapper.find('form').trigger('submit')

      expect(fetch).toHaveBeenCalledWith(
        'https://formspree.io/f/xrblrpla',
        expect.objectContaining({
          method: 'POST',
          headers: expect.objectContaining({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          }),
          body: JSON.stringify({
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            subject: 'Test Subject',
            message: 'Test message',
            _subject: 'Contact: Test Subject',
            _honeypot: ''
          })
        })
      )
    })

    it('uses endpoint from runtime config', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({})
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')

      expect(fetch).toHaveBeenCalledWith(
        'https://formspree.io/f/xrblrpla',
        expect.any(Object)
      )
    })

    it('resets form after successful submit', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({})
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')

      expect((wrapper.find('#firstName').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#lastName').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#email').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#subject').element as HTMLInputElement).value).toBe('')
      expect((wrapper.find('#message').element as HTMLTextAreaElement).value).toBe('')
    })
  })

  describe('honeypot protection', () => {
    it('does not submit if honeypot is filled', async () => {
      const wrapper = await mountSuspended(ContactForm)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')
      await wrapper.find('input[name="website"]').setValue('spam-bot-value')

      await wrapper.find('form').trigger('submit')

      expect(fetch).not.toHaveBeenCalled()
    })
  })

  describe('loading state', () => {
    it('shows loading text while submitting', async () => {
      const wrapper = await mountSuspended(ContactForm)

      // Create a promise we control
      let resolvePromise: () => void
      const promise = new Promise<Response>((resolve) => {
        resolvePromise = () => resolve({
          ok: true,
          json: async () => ({})
        } as Response)
      })
      vi.mocked(fetch).mockReturnValue(promise)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      // Start submission
      const submitPromise = wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('button[type="submit"]').text()).toBe('Sending…')

      // Resolve and complete
      resolvePromise!()
      await submitPromise
      await wrapper.vm.$nextTick()

      expect(wrapper.find('button[type="submit"]').text()).toBe('Submit')
    })

    it('disables button while loading', async () => {
      const wrapper = await mountSuspended(ContactForm)

      let resolvePromise: () => void
      const promise = new Promise<Response>((resolve) => {
        resolvePromise = () => resolve({
          ok: true,
          json: async () => ({})
        } as Response)
      })
      vi.mocked(fetch).mockReturnValue(promise)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      const submitPromise = wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeDefined()

      resolvePromise!()
      await submitPromise
      await wrapper.vm.$nextTick()

      expect(wrapper.find('button[type="submit"]').attributes('disabled')).toBeUndefined()
    })
  })

  describe('status messages', () => {
    it('shows success message after successful submit', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: true,
        json: async () => ({})
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      // The template uses curly apostrophe (U+2019)
      expect(wrapper.text()).toContain('Thanks!')
      expect(wrapper.text()).toContain('ll be in touch.')
    })

    it('shows error message on API failure', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockRejectedValue(new Error('Network error'))

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Network error')
    })

    it('shows API error message from response', async () => {
      const wrapper = await mountSuspended(ContactForm)
      vi.mocked(fetch).mockResolvedValue({
        ok: false,
        json: async () => ({
          errors: [{ message: 'Invalid email address' }]
        })
      } as Response)

      await wrapper.find('#firstName').setValue('John')
      await wrapper.find('#lastName').setValue('Doe')
      await wrapper.find('#email').setValue('john@example.com')
      await wrapper.find('#subject').setValue('Test')
      await wrapper.find('#message').setValue('Hello')

      await wrapper.find('form').trigger('submit')
      await wrapper.vm.$nextTick()

      expect(wrapper.text()).toContain('Invalid email address')
    })
  })
})
