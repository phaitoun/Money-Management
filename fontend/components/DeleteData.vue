<template>
    <v-dialog
      v-model="dialog"
      persistent
      width="500px"
    >
      <template v-slot:activator="{ props }">
        <v-btn
          color="#dc3545"
          v-bind="props"
          class="col-10"
        >
          Delete All
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Delet Note?
        </v-card-title>
        <v-card-text>Are you sure you want to delete?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            variant="text"
            @click="dialog = false"
          >
            Cancel
          </v-btn>
          <v-btn
            color="#dc3545"
            variant="text"
            @click="deleteAllData()"
          >
            Delete
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </template>

<script setup>
import { ref } from "vue"

const dialog = ref(false)

function deleteAllData(){
    fetch("http://localhost:3020/api/delete", {
     method: "DELETE"
    })
    .then(res => res.json())
    .then(() => {
        alert("Delete success")
        location.reload()
    })
    .catch((err) => {
        console.log(err);
    })
}
</script>

<style>

</style>