<template>

  <MainLayout title="HOME PAGE">
    <div class="py-4 container-fluid">
      <h1>Andromia</h1>
      <HelloWorld msg="c'est cool :D"/>
    </div>
  </MainLayout> 


</template>

<script setup>
import HelloWorld from '../../components/HelloWorld.vue';
import MainLayout from '../layouts/MainLayout.vue';
import NavBar from "../layouts/NavBar.vue";



</script>

<style lang="scss" scoped></style>
