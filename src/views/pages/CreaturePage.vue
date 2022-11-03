<template>
    
  <MainLayout title="Les belles petites créatures de mon boy">
    <div class="py-4 container-fluid">
     <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-md-2 my-2" v-for="creature in creatures" >
                <div class="card">
                    <img :src="creature.asset" :alt="creature.asset" class="img-fluid"/>
                    <h4>{{creature.name}}</h4>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout> 

</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';
import NavBar from "../layouts/NavBar.vue";

// const axios = inject("axios");
const expID = "635aa4941f59d7987433de26";
const creatures = ref([])
const server_url = import.meta.env.VITE_SERVER_URL

onMounted(() => {
    retrieveExplorerCreatures();
})

async function retrieveExplorerCreatures(){
    try{
        const response = await axios.get(`${server_url}/explorers/635aa4941f59d7987433de26/creatures`);
        console.log(response);
        if(response == 200 ){
            creatures.value = response.data
        }
    }catch (err){
        console.log(err);
    }
}




</script>

<style lang="scss" scoped>


</style>