<template>
  <div>
    <!-- Display the received data -->
    <ul>
      <li v-for="user in users" :key="user.id">{{ user.price }}</li>
      <li v-for="user in users" :key="user.id">{{ user.time }}</li>
      <li v-for="user in users" :key="user.id">{{ user.actions }}</li>
      <li v-for="user in users" :key="user.id">{{ user.description }}</li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.getUsers();
  },
  methods: {
    async getUsers() {
      try {
        const response = await axios.get('http://localhost:3020/api/getAll');
        this.users = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async asyncData(){
      
    }
  },
};
</script>