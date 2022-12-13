<template>
  <MainLayout :title="`Historique d'explorations de ` + UserInfos.userName ">
    <div v-if="!isFightingSomeone" class="px-4 container-fluid">
      <div class="row">
        <div class="col-3 m-2 card-size" v-for="exploration in explorations">
            <ExplorationCard :exploration="exploration" @proposeFight="startFight" />
        </div>
      </div>
    </div>
    <div v-if="isFightingSomeone" class="px-4 container-fluid" style="background-color:rgba(0, 0, 0, 0.5);height:80vh;backdrop-filter: blur(10px);">
      <div class="row">
        <h1 class="col-12" style="text-align:center;margin-top:10px;font-size:2.5em">💥 Combat 💥</h1>
      </div>
      <div class="row">

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
import ExplorationCard from "../../components/ExplorationCard.vue";

const explorations = ref([])
const server_url = import.meta.env.VITE_SERVER_URL
const toast = useToast();
const UserInfos = useUserInfosStore();

let isFightingSomeone = ref(false)

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
      explorations.value = response.data
    }
  } catch (err) {
    console.log(err);
  }
}

function startFight(vsCreatureID){
  isFightingSomeone.value = true;
  const myCreatureID = UserInfos.defaultCreatureID
  console.log(myCreatureID + " vs " + vsCreatureID);
}

</script>

<style lang="scss" scoped>

.card-size{
  min-width: 150px;
  width: 350px;
  height: 550px;
}

</style>
