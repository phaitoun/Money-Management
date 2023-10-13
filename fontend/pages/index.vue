<template>
  <div>
    this is home page
    <p >
      {{userList.price}}
      {{userList.action}}
      {{userList.time}}
    </p>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data(){
    return{
      userList : []
    }
  },
  mounted() {
    // Make an Axios GET request to fetch data from the API endpoint
    axios
      .get("http://localhost:3020/api/getAll")
      .then((response) => {
        this.userList = response.data;
        console.log(userList);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  },
}
</script>

<style>

</style>