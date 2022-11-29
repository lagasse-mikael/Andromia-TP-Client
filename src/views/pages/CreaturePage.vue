<template>
  <MainLayout :title="'Les créatures à ' + UserInfos.userName">
    <div class="py-4 row">
      <div class="col-md-2 col-sm-6 col-6 mx-4" v-for="creature in creatures">
        <CreatureCard :creature="creature" />
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import axios from "axios";
import MainLayout from "../layouts/MainLayout.vue";
import NavBar from "../layouts/NavBar.vue";
import { useUserInfosStore } from "../../stores/userInfos";
import CreatureCard from "../../components/CreatureCard.vue";

// const axios = inject("axios");
const creatures = ref([]);
const server_url = import.meta.env.VITE_SERVER_URL;

const UserInfos = useUserInfosStore();

onMounted(() => {
  retrieveExplorerCreatures();
});

async function retrieveExplorerCreatures() {
  try {
    const response = await axios.get(`${server_url}/explorers/creatures`, {
      headers: {
        Authorization: `Bearer ${UserInfos.access_token}`,
      },
    });
    if (response.status == 200) {
      creatures.value = response.data;
    }
  } catch (err) {
    console.log(err);
  }
}
</script>

<style lang="scss" scoped>
.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}

.center-text {
  text-align: center;
  vertical-align: middle;
  line-height: 80%;
}
</style>
