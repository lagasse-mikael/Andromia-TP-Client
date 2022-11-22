<template>
  <MainLayout :title="`Historique d'explorations de ` + UserInfos.userName ">
    <div class="px-4 container-fluid">
      <div class="row">
        <div class="card col-3 m-2" v-for="exploration in explorations">
            <ExplorationCard :exploration="exploration" />
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
import ExplorationCard from "../../components/ExplorationCard.vue";

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
      console.log(response);
      explorations.value = response.data
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
