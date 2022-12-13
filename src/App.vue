<script setup>
import { RouterView } from 'vue-router'
import {onMounted } from 'vue';
import axios from 'axios';
import { useUserInfosStore } from './stores/userInfos';

const server_url = import.meta.env.VITE_SERVER_URL
const refresh_token_ms = import.meta.env.VITE_REFRESH_TOKEN_MS
const UserInfos = useUserInfosStore();

onMounted(() => {
  setInterval(refreshToken, refresh_token_ms);
  setInterval(retrieveExplorerData, 1000);
})

async function refreshToken(){
  //Au moment où l'application part et que la personne n'est pas log in
  if(!UserInfos.access_token) return; 

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

function retrieveExplorerData(){
  //Au moment où l'application part et que la personne n'est pas log in
  if(!UserInfos.access_token) return;

  Promise.all([retrieveUserLocation, retrieveUserInox]);

}

async function retrieveUserLocation(){
  try{
    console.log(UserInfos.userInfo);
    const response = await axios.get(`${server_url}/explorers/getOne`, UserInfos.userId);
    if(response == 200){
      document.getElementById('explorerLocation').innerText =  userInfos.userLocation;
    }
  }catch (err){
    console.log(err);
  }

}

async function retrieveUserInox(){
  try{
    const response = await axios.get(`${server_url}/explorers/vault`, {
      headers:{
        'Authorization': `Bearer ${UserInfos.access_token}`
      }
    })

    if(response == 200){
      document.getElementById('inoxBalance').innerText = " Inox : " + userVault.value.inox
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