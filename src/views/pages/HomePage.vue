<template>

  <MainLayout title="Historique des explorations">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="card col-3" v-for="exploration in explorations">
          <i>{{exploration.explorationDate.split('T')[0]}}</i>
          <h1 style="margin-top:-10px">{{exploration.destination}}</h1>
          <h3>Affinity : {{exploration.affinity}}</h3>
          <h2>Loot :</h2>
          <div class="container">
            <div class="row">
              <span v-for="element in exploration.vault.elements" class="col-4 text-bold"><img style="height:45px" v-bind:src="'https://assets.andromia.science/elements/' + element.element + '.png'" v-bind:title="element.element"/>x {{element.quantity}}</span>
            </div>
            <div class="row mt-2">
              <h4>+ <span style="color:yellow ;">{{exploration.vault.inox}} inox</span> !</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout> 


</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useUserInfosStore } from '../../stores/userInfos';
import MainLayout from '../layouts/MainLayout.vue';
import axios from 'axios';

const explorations = ref([])
const server_url = import.meta.env.VITE_SERVER_URL

const UserInfos = useUserInfosStore();

onMounted(() => {
    retrieveExplorerExplorations();
})

async function retrieveExplorerExplorations(){
    try{
        const response = await axios.get(`${server_url}/explorers/explorations`,{
          headers: {
            'Authorization' : `Bearer ${UserInfos.access_token}`
          }
        });
        console.log(response);
        if(response.status == 200 ){
          explorations.value = response.data.explorations
          console.log(explorations.value[0]);
        }
    }catch (err){
        console.log(err);
    }
}

</script>

<style lang="scss" scoped></style>
