<script setup>
import { RouterView } from 'vue-router'
import {onMounted} from 'vue';

const server_url = import.meta.env.VITE_SERVER_URL

onMounted(() => {
  console.log("Penis");
    // setInterval(refreshToken, 50000);
})

async function refreshToken(){
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