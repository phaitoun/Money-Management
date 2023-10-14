<template>
    <div>
      <form>
          <input type="number" v-model="formData.amount" placeholder="Enter number" required >
          <label>
              <input type="radio" name="action" @click="() => {
                  formData.actions = 0
              }"> income
          </label>
          <label>
              <input type="radio" name="action" @click="() => {
                  formData.actions = 1
              }"> Outcome
          </label>
          <input type="text" v-model="formData.desceiption" placeholder="description" required>
          <button type="submit" @click="createData()">Submit</button>     
      </form>
    </div>
  </template>
  
  <script setup>
  
  const formData = {
      amount : '',
      desceiption: '',
      actions : 0,
      date: '20/10/2023'
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
  }
  </script>
  
  <style>
  
  </style>