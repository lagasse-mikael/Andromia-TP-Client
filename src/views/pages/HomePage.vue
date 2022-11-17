<template>

  <MainLayout :title="`Historique d'explorations de ` + UserInfos.userName ">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="card col-3" v-for="exploration in explorations">
          <i>{{ exploration.explorationDate.split('T')[0] }}</i>
          <h1 style="margin-top:-10px">{{ exploration.destination }}</h1>
          <h3 class="badge bg-gradient px-3 me-auto " 
            :class="[exploration.affinity == 'energy' ? 'bg-warning text-dark': 
                     exploration.affinity == 'air' ? 'bg-light text-dark' : 
                     exploration.affinity == 'darkness' ? 'bg-dark text-white' :
                     exploration.affinity == 'earth' ? 'bg-brown' : 
                     exploration.affinity == 'energy' ? 'bg-orange' :
                     exploration.affinity == 'fire' ? 'bg-danger' :  
                     exploration.affinity == 'life' ? 'bg-success': 
                     exploration.affinity == 'light' ? 'bg-warning text-dark':
                     exploration.affinity == 'logic' ? 'bg-warning text-dark':  
                     exploration.affinity == 'music' ? 'bg-pink': 
                     exploration.affinity == 'space' ? 'bg-primary':
                     exploration.affinity == 'toxic' ? 'bg-success':  
                     exploration.affinity == 'water' ? 'bg-info': 'bg-secondary'                     
                     
                     ]">Affinity : {{ exploration.affinity }}</h3>
          <h2>Loot :</h2>
          <div class="container">
            <div class="row">
              <span v-for="element in exploration.vault.elements" class="col-4 text-bold"><img style="height:45px"
                  v-bind:src="'https://assets.andromia.science/elements/' + element.element + '.png'"
                  v-bind:title="element.element" />x {{ element.quantity }}</span>
            </div>
            <div class="row mt-2">
              <h4>+ <span style="color:yellow ;">{{ exploration.vault.inox }} inox</span> !</h4>
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
import { useToast } from "vue-toastification";

const explorations = ref([])
const server_url = import.meta.env.VITE_SERVER_URL
const toast = useToast();
const UserInfos = useUserInfosStore();

onMounted(() => {
  retrieveExplorerExplorations();
})


async function retrieveExplorerExplorations() {
  try {
    const response = await axios.get(`${server_url}/explorers/explorations`, {
      headers: {
        'Authorization': `Bearer ${UserInfos.access_token}`
      }
    });
    if (response.status == 200) {
      explorations.value = response.data.explorations
    }
  } catch (err) {
    console.log(err);
  }
}

</script>

<style lang="scss" scoped>
.bg-orange{
  background-color: #fd7e14;
}

.bg-brown{
background-color:#964B00;
}

.bg-pink{
  background-color:#d63384;
}

</style>
