<template>

  <MainLayout title="Mes elements">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-md-2 my-2" v-for="element in vault.elements">
              <div class="card">
                <img style="margin: auto 0px;"
                  v-bind:src="'https://assets.andromia.science/elements/' + element.element + '.png'"
                  v-bind:title="element.element" />
                <h2>{{element.element}}</h2>
                <h3>x {{element.quantity}}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>

</template>

<script setup>
import { onMounted, ref } from 'vue';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout.vue';
import { useUserInfosStore } from '../../stores/userInfos';

const vault = ref({})
const server_url = import.meta.env.VITE_SERVER_URL

const UserInfos = useUserInfosStore();

onMounted(() => {
  retrieveExplorerElements();
})

async function retrieveExplorerElements() {
  try {
    const response = await axios.get(`${server_url}/explorers/vault`, {
      headers: {
        'Authorization': `Bearer ${UserInfos.access_token}`
      }
    });
    console.log(response);
    if (response.status == 200) {
      vault.value = response.data.vault
    }
  } catch (err) {
    console.log(err);
  }
}

</script>

<style lang="scss" scoped>

</style>