<template>
    <button class="btn btn-danger pt-2 pb-2" @click="deleteAllData()">Delete All</button>
</template>

<script setup>
import { ref } from "vue"


function deleteAllData(){
    fetch("http://localhost:3020/api/delete")
    .then(res => res.json())
}
</script>

<style>

</style>