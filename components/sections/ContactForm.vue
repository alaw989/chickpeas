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

<script lang="ts" setup>
const config = useRuntimeConfig()
const endpoint = config.public.formSpreeEndpoint

type FormState = {
  firstName: string
  lastName: string
  email: string
  subject: string
  message: string
  website: string // honeypot
}

const form = reactive<FormState>({
  firstName: '',
  lastName: '',
  email: '',
  subject: '',
  message: '',
  website: ''
})

const loading = ref(false)
const ok = ref(false)
const err = ref<string | null>(null)

// Get toast plugin via $toast
const { $toast } = useNuxtApp()

function notifySuccess(msg: string) {
  $toast?.success?.(msg)
}

function notifyError(msg: string) {
  $toast?.error?.(msg)
}

function validateForm(): boolean {
  if (!form.firstName.trim()) {
    notifyError('First name is required.')
    return false
  }
  if (!form.lastName.trim()) {
    notifyError('Last name is required.')
    return false
  }
  if (!form.email.trim()) {
    notifyError('Email is required.')
    return false
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(form.email)) {
    notifyError('Please enter a valid email address.')
    return false
  }
  if (!form.subject.trim()) {
    notifyError('Subject is required.')
    return false
  }
  if (!form.message.trim()) {
    notifyError('Message is required.')
    return false
  }
  return true
}

async function submit() {
  // simple bot trap
  if (form.website) return

  if (!validateForm()) return

  loading.value = true
  ok.value = false
  err.value = null

  try {
    const payload = {
      firstName: form.firstName,
      lastName: form.lastName,
      email: form.email,
      subject: form.subject,
      message: form.message,
      _subject: `Contact: ${form.subject || 'New message'}`,
      _honeypot: form.website
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload)
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.errors?.[0]?.message || data.message || 'Submission failed')
    }

    ok.value = true
    notifySuccess("Thanks! We'll be in touch.")

    // reset
    form.firstName = ''
    form.lastName = ''
    form.email = ''
    form.subject = ''
    form.message = ''
  } catch (error: unknown) {
    const errMsg = error instanceof Error ? error.message : 'Something went wrong.'
    err.value = errMsg
    notifyError(errMsg)
  } finally {
    loading.value = false
  }
}
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
