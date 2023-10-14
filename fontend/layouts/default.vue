<template>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  .container{
    max-width: 100%;
  }
</style>