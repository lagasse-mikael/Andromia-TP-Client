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
        if(response.status == 200 ){
            creatures.value = response.data.creatures
        }
    }catch (err){
        console.log(err);
    }
}




</script>

<style lang="scss" scoped>
.center {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 10px;
}
.center-text{
  text-align: center;
  vertical-align: middle;
  line-height: 80%; 
}
//Flip on hover source du code: https://codepen.io/JenniferWagner/pen/WNjRRJm,  Mais je l'ai modifié
.flip-card{
  display: inline-block;
  border-radius: 20%;
  background-color: transparent;
  width: 300px;
  height: 330px;
  perspective: 1000px;
  }
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  .flip-card:hover .flip-card-inner,
  .flip-card:focus .flip-card-inner,
  .flip-card:focus-within .flip-card-inner,
  .flip-card:active .flip-card-inner {
    transform: rotateY(180deg);
  }
  .flip-card-front, .flip-card-back {
    position: absolute;
    border-radius: 6%;
    width: 100%;
    height: 100%;
    // -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  .flip-card-front {
    background-color: #111c44;
  }
  .flip-card-back {
    background-color: #111c44;
    transform: rotateY(180deg);
  }
</style>