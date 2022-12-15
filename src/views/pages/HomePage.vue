<template>
  <MainLayout :title="`Historique d'explorations de ` + UserInfos.userName ">
    <div v-if="!isFightingSomeone" class="px-4 container-fluid">
      <div class="row">
        <div class="col-3 m-2 card-size" v-for="exploration in explorations">
          <ExplorationCard :exploration="exploration" @proposeFight="startFight" />
        </div>
      </div>
    </div>
    <div v-if="isFightingSomeone" class="px-4 container-fluid"
      style="background-color:rgba(0, 0, 0, 0.5);height:80vh;backdrop-filter: blur(10px);">
      <div class="row">
        <h1 class="col-12" style="text-align:center;margin-top:10px;font-size:2.5em">💥 Combat 💥</h1>
      </div>
      <div class="row" style="margin-top:60px;">
        <div class="col-5" style="text-align:right">
          <CreatureCard :creature="myCombatCreature" :forFight="true" />
        </div>
        <div class="col-2" style="text-align:center">
          <h1 style="margin-top:150px">VS</h1>
        </div>
        <div class="col-5" style="text-align:left">
          <CreatureCard :creature="vsCreature" :forFight="true" />
        </div>
      </div>
      <div class="row" style="text-align:center;margin-top:30px">
        <div class="col-12">
          <h2 id="costInfo" >Cout :</h2>
          <img v-for="element in vsCreature.kernel" :src="'https://assets.andromia.science/elements/' + element + '.png'" style="height:75px" @mouseover="changeInfoCost(element)" @mouseleave="changeInfoCost('')"/>
        </div>
      </div>
      <div class="row" style="text-align:center;margin-top:10px">
        <div class="col-12">
          <button class="btn btn-success bg-gradient mx-3" style="font-size:18px">💸 Payer</button>
          <button class="btn btn-danger bg-gradient mx-3" style="font-size:18px" @click="isFightingSomeone = false">🚪 Quitter</button>
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
import CreatureCard from '../../components/CreatureCard.vue';

const explorations = ref([])
const server_url = import.meta.env.VITE_SERVER_URL
const toast = useToast();

const UserInfos = useUserInfosStore();

const isFightingSomeone = ref(false)

const myCombatCreature = ref({})
const vsCreature = ref({})

onMounted(async () => {
  await retrieveExplorerExplorations();
  await retrieveExplorerCombatCreature();
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

async function retrieveExplorerCombatCreature() {
  const response = await axios.get(`${server_url}/explorers/combatCreature`, {
    headers: {
      'Authorization': `Bearer ${UserInfos.access_token}`
    }
  })

  if (response.status == 200) {
    myCombatCreature.value = response.data
  } else {
    console.error(response)
  }
}

async function startFight(enemyCreature) {
  isFightingSomeone.value = true;

  vsCreature.value = enemyCreature
  console.log(enemyCreature.kernel);
}

function changeInfoCost(e) {
  console.log(e);
  const costElement = document.getElementById("costInfo");

  costElement.innerHTML = `Cout : ` + (e != "" ? "x1 " : "") + e
}


</script>

<style lang="scss" scoped>
.card-size {
  min-width: 150px;
  width: 350px;
  height: 550px;
}
</style>
