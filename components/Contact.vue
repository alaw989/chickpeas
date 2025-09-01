<template>
  <div class="contact py-[100px] bg-yellow-50">
    <div class="contact-form">
      <h2>Contact Us</h2>
      <h4>For any inquiries, please complete the form below.</h4>

      <form @submit.prevent="submit" novalidate>
        <!-- Honeypot (hidden) -->
        <input
            v-model="form.website"
            name="website"
            type="text"
            tabindex="-1"
            autocomplete="off"
            aria-hidden="true"
            style="position:absolute;left:-9999px;opacity:0;height:0;width:0;"
        />

        <!-- Name (Required) -->
        <div class="form-field">
          <label for="firstName">Name (required)</label>
          <div class="name-row">
            <input
                id="firstName"
                v-model="form.firstName"
                name="firstName"
                type="text"
                placeholder="First Name"
                required
            />
            <input
                id="lastName"
                v-model="form.lastName"
                name="lastName"
                type="text"
                placeholder="Last Name"
                required
            />
          </div>
        </div>

        <!-- Email (Required) -->
        <div class="form-field">
          <label for="email">Email (required)</label>
          <input
              id="email"
              v-model="form.email"
              name="email"
              type="email"
              placeholder="Enter your email"
              required
          />
        </div>

        <!-- Subject (Required) -->
        <div class="form-field">
          <label for="subject">Subject (required)</label>
          <input
              id="subject"
              v-model="form.subject"
              name="subject"
              type="text"
              placeholder="Subject"
              required
          />
        </div>

        <!-- Message (Required) -->
        <div class="form-field">
          <label for="message">Message (required)</label>
          <textarea
              id="message"
              v-model="form.message"
              name="message"
              placeholder="Write your message..."
              required
              rows="6"
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button-dark" :disabled="loading">
          {{ loading ? 'Sending…' : 'Submit' }}
        </button>

        <!-- Status messages -->
        <p v-if="ok" class="mt-3" style="color:#166534;">Thanks! We’ll be in touch.</p>
        <p v-if="err" class="mt-3" style="color:#991b1b;">{{ err }}</p>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import axios from 'axios'
import { defineComponent } from 'vue'

type FormState = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  website: string // honeypot
}

export default defineComponent({
  name: 'ContactForm',
  props: {
    endpoint: {
      type: String,
      default: 'https://formspree.io/f/xrblrpla'
    }
  },
  data() {
    return {
      form: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: '',
        website: ''
      } as FormState,
      loading: false as boolean,
      ok: false as boolean,
      err: null as string | null
    }
  },
  methods: {
    notifySuccess(msg: string) {
      // $toast comes from plugins/toastification.client.ts; cast to avoid TS complaints
      ;(this as any).$toast?.success?.(msg)
    },
    notifyError(msg: string) {
      ;(this as any).$toast?.error?.(msg)
    },

    validateForm(): boolean {
      if (!this.form.firstName.trim()) {
        this.notifyError('First name is required.')
        return false
      }
      if (!this.form.lastName.trim()) {
        this.notifyError('Last name is required.')
        return false
      }
      if (!this.form.email.trim()) {
        this.notifyError('Email is required.')
        return false
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.notifyError('Please enter a valid email address.')
        return false
      }
      if (!this.form.subject.trim()) {
        this.notifyError('Subject is required.')
        return false
      }
      if (!this.form.message.trim()) {
        this.notifyError('Message is required.')
        return false
      }
      return true
    },

    async submit() {
      // simple bot trap
      if (this.form.website) return

      if (!this.validateForm()) return

      this.loading = true
      this.ok = false
      this.err = null

      try {
        const payload = {
          firstName: this.form.firstName,
          lastName: this.form.lastName,
          email: this.form.email,
          subject: this.form.subject,
          message: this.form.message,
          _subject: `Contact: ${this.form.subject || 'New message'}`,
          _honeypot: this.form.website
        }

        await axios.post(this.endpoint, payload, {
          headers: { Accept: 'application/json' }
        })

        this.ok = true
        this.notifySuccess("Thanks! We'll be in touch.")

        // reset
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.email = ''
        this.form.subject = ''
        this.form.message = ''
      } catch (error: any) {
        let errMsg = 'Something went wrong.'
        if (error?.response?.data?.errors?.[0]?.message) {
          errMsg = error.response.data.errors[0].message
        } else if (error?.message) {
          errMsg = error.message
        }
        this.err = errMsg
        this.notifyError(errMsg)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>

<style scoped>
.contact-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 1rem;
}

.contact-form h2 {
  margin-bottom: 0.5rem;
  font-weight: 700;
  text-align: center;
  font-size: 3.5rem;
  line-height: 4.37rem;
}

.contact-form h4 {
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-field {
  margin-bottom: 1rem;
}

.name-row {
  display: flex;
  gap: 1rem;
}

.name-row input {
  flex: 1;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
}

input,
textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 2px solid #3f6e4d;
  border-radius: 0.5rem;
  background-color: #fffefa;
  font-size: 1rem;
  font-family: inherit;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
}

input::placeholder,
textarea::placeholder {
  color: #999;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #e6fbcc;
  box-shadow: 0 0 0 4px rgba(230, 251, 204, 0.5);
}
</style>
