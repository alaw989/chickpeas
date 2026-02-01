<template>
  <div class="contact section-padding bg-yellow-50">
    <div class="contact-form section-wrap">
      <h1 class="heading-lg text-center">Contact Us</h1>
      <p class="text-center mb-6">For any inquiries, please complete the form below.</p>

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
            <div class="name-field">
              <input
                  id="firstName"
                  v-model="form.firstName"
                  name="firstName"
                  type="text"
                  placeholder="First Name"
                  required
                  aria-required="true"
                  :aria-invalid="errors.firstName ? 'true' : 'false'"
                  aria-describedby="firstName-error"
              />
              <p v-if="errors.firstName" id="firstName-error" role="alert" class="field-error">
                {{ errors.firstName }}
              </p>
            </div>
            <div class="name-field">
              <input
                  id="lastName"
                  v-model="form.lastName"
                  name="lastName"
                  type="text"
                  placeholder="Last Name"
                  required
                  aria-required="true"
                  :aria-invalid="errors.lastName ? 'true' : 'false'"
                  aria-describedby="lastName-error"
              />
              <p v-if="errors.lastName" id="lastName-error" role="alert" class="field-error">
                {{ errors.lastName }}
              </p>
            </div>
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
              aria-required="true"
              :aria-invalid="errors.email ? 'true' : 'false'"
              aria-describedby="email-error"
          />
          <p v-if="errors.email" id="email-error" role="alert" class="field-error">
            {{ errors.email }}
          </p>
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
              aria-required="true"
              :aria-invalid="errors.subject ? 'true' : 'false'"
              aria-describedby="subject-error"
          />
          <p v-if="errors.subject" id="subject-error" role="alert" class="field-error">
            {{ errors.subject }}
          </p>
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
              aria-required="true"
              :aria-invalid="errors.message ? 'true' : 'false'"
              aria-describedby="message-error"
              rows="6"
          ></textarea>
          <p v-if="errors.message" id="message-error" role="alert" class="field-error">
            {{ errors.message }}
          </p>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button-dark" :disabled="loading">
          {{ loading ? 'Sending…' : 'Submit' }}
        </button>

        <!-- Status messages -->
        <p v-if="ok" role="status" aria-live="polite" class="mt-3" style="color:#166534;">Thanks! We'll be in touch.</p>
        <p v-if="err" role="alert" aria-live="assertive" class="mt-3" style="color:#991b1b;">{{ err }}</p>
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
      errors: {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      } as Record<string, string>,
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

    clearErrors() {
      this.errors = {
        firstName: '',
        lastName: '',
        email: '',
        subject: '',
        message: ''
      }
    },

    validateForm(): boolean {
      this.clearErrors()
      let isValid = true

      if (!this.form.firstName.trim()) {
        this.errors.firstName = 'First name is required.'
        isValid = false
      }
      if (!this.form.lastName.trim()) {
        this.errors.lastName = 'Last name is required.'
        isValid = false
      }
      if (!this.form.email.trim()) {
        this.errors.email = 'Email is required.'
        isValid = false
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(this.form.email)) {
          this.errors.email = 'Please enter a valid email address.'
          isValid = false
        }
      }
      if (!this.form.subject.trim()) {
        this.errors.subject = 'Subject is required.'
        isValid = false
      }
      if (!this.form.message.trim()) {
        this.errors.message = 'Message is required.'
        isValid = false
      }

      if (!isValid) {
        // Find first error and notify
        const firstError = Object.values(this.errors).find(e => e)
        if (firstError) {
          this.notifyError(firstError)
        }
      }

      return isValid
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
}

.form-field {
  margin-bottom: 1rem;
}

.name-row {
  display: flex;
  gap: 1rem;
}

.name-field {
  flex: 1;
}

.name-field input {
  width: 100%;
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

.field-error {
  color: #991b1b;
  font-size: 0.875rem;
  margin: 0.25rem 0 0;
}

input[aria-invalid="true"],
textarea[aria-invalid="true"] {
  border-color: #991b1b;
}
</style>
