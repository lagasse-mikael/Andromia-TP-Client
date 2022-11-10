<template>
    
  <MainLayout title="Mes creatures">
    <div class="py-4 container-fluid">
     <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-md-2 my-2" v-for="creature in creatures">
                <div class="flip-card">
                  <div class="flip-card-inner">
                    <div class="flip-card-front">
                      <img :src="creature.asset" :alt="creature.asset" class="img-fluid"/>
                      <h1 class="center-text">{{creature.name}}</h1>
                      <i class="center-text mb-5"> - {{creature.affinity}} - </i>
                    </div>  
                    <div class="flip-card-back" >
                      <h1 class="mb-3">Statistique</h1>
                      <div v-for="stat in Object.keys(creature.stats)">
                        <h3>{{stat}} : {{ creature.stats[stat] }}</h3>

                      </div>
                    </div>                    
                  </div>
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
import { useUserInfosStore } from '../../stores/userInfos';

// const axios = inject("axios");
const creatures = ref([])
const server_url = import.meta.env.VITE_SERVER_URL

const UserInfos = useUserInfosStore();

onMounted(() => {
    retrieveExplorerCreatures();
})

async function retrieveExplorerCreatures(){
    try{
        const response = await axios.get(`${server_url}/explorers/creatures`,{
          headers: {
            'Authorization' : `Bearer ${UserInfos.access_token}`
          }
        });
        console.log(response);
        // if(response == 200 ){
        //     creatures.value = response.data
        // }
    }catch (err){
        console.log(err);
    }
}




</script>

<style lang="scss" scoped>

  .flip-card-front, .flip-card-back {
    position: absolute;
    border-radius: 6%;
    width: 100%;
    height: 100%;
    // -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }

</style>