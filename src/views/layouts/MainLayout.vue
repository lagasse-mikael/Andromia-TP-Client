<template>
    
    <!-- SIDEBAR -->
    <SideBar></SideBar>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <NavBar :title="title"/>
        <slot />
        
        <FooterBar />
        
    </main>
</template>

<script setup>
import SideBar from '../../components/layouts/SideBar.vue'
import NavBar from './NavBar.vue'
import FooterBar from './FooterBar.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useUserInfosStore } from '../../stores/userInfos';

const props = defineProps({
    title:{
        type: String,
        required:true
    }
})
const server_url = import.meta.env.VITE_SERVER_URL

const userInfos = useUserInfosStore();
let userVault = ref({})

onMounted(() => {
  axios.get(`${server_url}/explorers/vault`,{
    headers:{
      'Authorization': `Bearer ${userInfos.access_token}`
    }
  }).then(response => {
    userVault.value = response.data
    document.getElementById('inoxBalance').innerText = " Inox : " + userVault.value.inox
  })
})

</script>

<style lang="scss" scoped>

</style>