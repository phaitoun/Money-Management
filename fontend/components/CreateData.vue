<template>
  <div>
    <button class="btn btn-success ps-5 pe-5 pt-2 pb-2" @click="dialog = true">+</button>
    <v-dialog v-model="dialog" persistent width="700px">
      <div class="bg-light p-4 pb-2 rounded">
        <h2>Add new transaction</h2>
        <form @submit.prevent="handleSubmit">
          <div class="mb-3">
            <label class="form-label">Transaction Title</label>
            <input type="text" class="form-control" v-model="formData.description" placeholder="Enter your title" required>
            <div v-if="errors.description" class="text-danger">{{ errors.description }}</div>
          </div>
          <div class="mb-3">
            <label class="form-label">Amount of Money( kip )</label>
            <input type="number" class="form-control" v-model="formData.amount" placeholder="Enter your money" required>
            <div v-if="errors.amount" class="text-danger">{{ errors.amount }}</div>
          </div>
          <div class="d-flex mb-3">
            <div class="form-check me-2">
              <input class="form-check-input" type="radio" name="flexRadioDefault" @click="() => {formData.actions = 0}" required>
              <label class="form-check-label">Income</label>
            </div>
            <div class="form-check">
              <input class="form-check-input" type="radio" name="flexRadioDefault" @click="() => {formData.actions = 1}" required>
              <label class="form-check-label">Expense</label>
            </div>
          </div>
          <button type="submit" class="btn btn-primary text-light me-1">Submit</button>
          <button type="button" class="btn btn-secondary" @click="dialog = false">Cancel</button>
        </form>
      </div>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const dialog = ref(false)

const formData = reactive({
  amount: '',
  description: '',
  actions: '',
  date: ''
})

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hours = date.getHours()
let minute = date.getMinutes()
let currentDate = `${day}/${month}/${year} ${hours}:${minute}`;

const errors = reactive({
  amount: '',
  description: ''
})

const hasErrors = computed(() => {
  return Object.values(errors).some(error => error !== '')
})

function handleSubmit() {
  if (hasErrors.value) {
    return
  }
  
  formData.date = currentDate
  fetch("http://localhost:3020/api/create", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "price": formData.amount,
      "time": formData.date,
      "actions": formData.actions,
      "description": formData.description
    })
  })
    .then((res) => res.json())
    .then(() => {
      console.log("success");
      alert('Create successfully')
      location.reload()
    })
    .catch((err) => {
      console.log("Error", err);
    });
}

watch(formData, (newValue, oldValue) => {
  if (!newValue.amount) {
    errors.amount = 'Amount is required'
  } else if (isNaN(newValue.amount)) {
    errors.amount = 'Amount must be a number'
  } else {
    errors.amount = ''
  }

  if (!newValue.description) {
    errors.description = 'Description is required'
  } else {
    errors.description = ''
  }
})
</script>
