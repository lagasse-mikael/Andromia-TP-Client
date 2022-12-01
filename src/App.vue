<script setup>
import { RouterView } from 'vue-router'
import {onMounted } from 'vue';
import axios from 'axios';
import { useUserInfosStore } from './stores/userInfos';

const server_url = import.meta.env.VITE_SERVER_URL
const UserInfos = useUserInfosStore();
const refresh_token_ms = import.meta.env.VITE_REFRESH_TOKEN_MS

onMounted(() => {
  setInterval(refreshToken, refresh_token_ms);
})

async function refreshToken(){
  //Au moment où l'application part et que la personne n'est pas log in
  if(!UserInfos.acces_token) return; 

  try{    
    const response = await axios.post(`${server_url}/refresh`, {
      "refresh_token": UserInfos.refresh_token
    });
    if(response.status == 200){
      UserInfos.access_token = response.data.access_token;
      UserInfos.refresh_token = response.data.refresh_token;
    }

  } catch (err){
    console.log(err);
  }
}
</script>
  
<template>
  <RouterView />
</template>
  
<style scoped>
@import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700');
@import url("https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.2/css/all.min.css");
</style>