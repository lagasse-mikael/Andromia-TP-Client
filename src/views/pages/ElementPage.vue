<template>

  <MainLayout title="Mes elements">
    <div class="py-4 container-fluid">
      <div class="row">
        <div class="col-12">
          <div class="row">
            <div class="col-md-2 my-2" v-for="element in elements">
              <ElementCard :element="element" />
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
import ElementCard from '../../components/ElementCard.vue';

let elements = ref({})
const server_url = import.meta.env.VITE_SERVER_URL

const UserInfos = useUserInfosStore();

onMounted(() => {
  retrieveExplorerElements();
})

async function retrieveExplorerElements() {
  try {
    const responseElements = await axios.get(`${server_url}/elements/`, {
      headers: {
        'Authorization': `Bearer ${UserInfos.access_token}`
      }
    });

    if (responseElements.status == 200) {
      elements.value = responseElements.data

      const userVaultResponse = await axios.get(`${server_url}/explorers/vault`, {
        headers: {
          'Authorization': `Bearer ${UserInfos.access_token}`
        }
      });

      if(userVaultResponse.status == 200){
        const userElements = userVaultResponse.data.elements

        elements.value = elements.value.map(el => {
          el.quantity = 0
          userElements.forEach(elementUser => {
            if(el.element == elementUser.element) {
              el.quantity = elementUser.quantity
            }
          })
          return el
        })

        elements.value = elements.value.sort((x,y) => -(x.quantity - y.quantity))
      }


    }
  } catch (err) {
    console.log(err);
  }
}

</script>

<style lang="scss" scoped>
</style>