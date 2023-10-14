<template>
    <div>
        <button class="btn btn-success ps-5 pe-5 pt-2 pb-2" @click="dialog = true">+</button>
        <v-dialog v-model="dialog" persistent width="700px">
            <div class="bg-light p-4 pb-2 rounded">
                <h2>Add new transaction</h2>
                <div class="mb-3">
                  <label lass="form-label">Transaction Title</label>
                  <input type="text" class="form-control" v-model="formData.desceiption" placeholder="Enter your title" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Amount of Money( kip )</label>
                  <input type="number" class="form-control" v-model="formData.amount" placeholder="Enter your money" required>
                </div>
                <div class="d-flex mb-3">
                    <div class="form-check me-2">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" @change="() => {
                        formData.actions = 0
                      }">
                      <label class="form-check-label">
                        Income
                      </label>
                    </div>
                    <div class="form-check">
                      <input class="form-check-input" type="radio" name="flexRadioDefault" @change="() => {
                        formData.actions = 1
                      }">
                      <label class="form-check-label">
                        Expense
                      </label>
                    </div>
                </div>
                <button type="submit" class="btn btn-primary text-light me-1" @click="createData()">Submit</button>
                <button class="btn btn-secondary" @click="dialog = false">Cancel</button>
            </div>
        </v-dialog>
    </div>
</template>
  
<script setup>
import { ref } from 'vue'

const dialog = ref(false)

const formData = {
    amount : '',
    desceiption: '',
    actions : 0,
    date: ''
}

const date = new Date();
let day = date.getDate();
let month = date.getMonth() + 1;
let year = date.getFullYear();
let hours = date.getHours()
let minute = date.getMinutes()
let currentDate = `${day}/${month}/${year} ${hours}:${minute}`;

function createData(){
    this.formData.date = currentDate
    fetch("http://localhost:3020/api/create", {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json'
        },
        body: JSON.stringify({
          "price": formData.amount,
          "time": formData.date,
          "actions": formData.actions,
          "description": formData.desceiption
        })
    })
    .then((res) => res.json())
    .catch((err) => {
      console.log("Error",err);
    });
    location.reload()
}
</script>

<style>

</style>