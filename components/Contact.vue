<script setup lang="ts">
// Any script logic you might need can go here.
// Currently empty.
</script>

<template>
  <div class="contact mb-[100px]">
    <div class="contact-form ">
      <h2>Contact Us</h2>
      <h4>For any inquiries, please complete the form below.</h4>

      <form>
        <!-- Name (Required) -->
        <div class="form-field">
          <label>Name (required)</label>
          <div class="name-row">
            <input
                type="text"
                placeholder="First Name"
                required
            />
            <input
                type="text"
                placeholder="Last Name"
                required
            />
          </div>
        </div>

        <!-- Email (Required) -->
        <div class="form-field">
          <label>Email (required)</label>
          <input
              type="email"
              placeholder="Enter your email"
              required
          />
        </div>

        <!-- Subject (Required) -->
        <div class="form-field">
          <label>Subject (required)</label>
          <input
              type="text"
              placeholder="Subject"
              required
          />
        </div>

        <!-- Message (Required) -->
        <div class="form-field">
          <label>Message (required)</label>
          <textarea
              placeholder="Write your message..."
              required
          ></textarea>
        </div>

        <!-- Submit Button -->
        <button type="submit" class="button-dark">
          Submit
        </button>
      </form>
    </div>
  </div>

</template>

<style scoped>
/* Example minimal styling; adjust or remove as desired */

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

/* placeholder color */
input::placeholder,
textarea::placeholder {
  color: #999;
}

/* focus state */
input:focus,
textarea:focus {
  outline: none;
  border-color: #e6fbcc;
  box-shadow: 0 0 0 4px rgba(230, 251, 204, 0.5);
}
</style>
