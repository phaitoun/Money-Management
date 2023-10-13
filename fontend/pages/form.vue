<template>
  <div>
    <form>
        <input type="number" v-model="formData.amount" placeholder="Enter number" required >
        <label for="">
            <input type="radio" name="action" id="" value="0" @click="() => {
                formData.income = 0
            }"> income
        </label>
        <label for="">
            <input type="radio" name="action" id="" value="0" @click="() => {
                formData.income = 1
            }"> Outcome
        </label>
        <input type="text" v-model="formData.desceiption" placeholder="description" required>
        <button type="submit" @click="createData()">Submit</button>     
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'

const formData = {
    amount : '',
    desceiption: '',
    income : 0,
    date: '2/10/2023'
}

function createData(){
    fetch("http://localhost:3020/api/create", {
          method: 'POST',
          headers: {
              'Content-Type' : 'application/json'
          },
          body: JSON.stringify({
            "price": formData.amount,
            "time": formData.date,
            "actions": formData.income,
            "description": formData.desceiption
          })
        })
        .then((res) => res.json())
        .catch((err) => {
          console.log("Error",err);
        });
}




</script>

<style>

</style>