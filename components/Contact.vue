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
import {defineComponent} from 'vue'
import {useToast} from 'vue-toastification'

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
        website: '' // honeypot
      },
      loading: false as boolean,
      ok: false as boolean,
      err: null as string | null
    }
  },
  setup() {
    const toast = useToast()
    return {toast}
  },
  methods: {
    validateForm() {
      // Basic required fields check
      if (!this.form.firstName.trim()) {
        this.toast.error('First name is required.')
        return false
      }
      if (!this.form.lastName.trim()) {
        this.toast.error('Last name is required.')
        return false
      }
      if (!this.form.email.trim()) {
        this.toast.error('Email is required.')
        return false
      }
      // Simple email regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(this.form.email)) {
        this.toast.error('Please enter a valid email address.')
        return false
      }
      if (!this.form.subject.trim()) {
        this.toast.error('Subject is required.')
        return false
      }
      if (!this.form.message.trim()) {
        this.toast.error('Message is required.')
        return false
      }
      return true
    },

    async submit() {
      console.log('submit triggered')

      if (this.form.website) {
        console.log('honeypot triggered, ignoring submit')
        return
      }

      if (!this.validateForm()) {
        console.log('validation failed');
        return // abort submit if validation fails
      }

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
          _honeypot: this.form.website,
        }

        await axios.post(this.endpoint, payload, {
          headers: { Accept: 'application/json' },
        })

        this.ok = true
        this.toast.success("Thanks! We'll be in touch.")
        this.form.firstName = ''
        this.form.lastName = ''
        this.form.email = ''
        this.form.subject = ''
        this.form.message = ''
      } catch (error: any) {
        let errMsg = 'Something went wrong.'
        if (error.response?.data?.errors?.[0]?.message) {
          errMsg = error.response.data.errors[0].message
        } else if (error.message) {
          errMsg = error.message
        }
        this.err = errMsg
        this.toast.error(errMsg)
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
