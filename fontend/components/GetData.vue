<template>
  <div>
    <!-- Display the received data -->
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.price }}</li>
      <li v-for="user in users" :key="user.id">{{ user.time }}</li>
      <li v-for="user in users" :key="user.id">{{ user.actions }}</li>
      <li v-for="user in users" :key="user.id">{{ user.description }}</li>
    </ul>
    <p>income</p>
    <ul>
      <li v-for="income in incomes" :key="income.id">{{ income.price }}</li>
      <li v-for="income in incomes" :key="income.id">{{ income.time }}</li>
      <li v-for="income in incomes" :key="income.id">{{ income.actions }}</li>
      <li v-for="income in incomes" :key="income.id">{{ income.description }}</li>
    </ul>
    <button class="btn btn-danger">Delete</button>
</div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      users: [],
      icomes: [],
    };
  },
  created() {
    this.getUsers();
    this.checkActions();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get("http://localhost:3020/api/getAll");
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async checkActions() {
      try {
        const response = await axios.get("http://localhost:3020/api/getAction/0");
        this.incomes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
