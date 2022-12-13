<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div :id="creature._id + '_frontCard'" class="flip-card-front">
        <div id="preferredCreature" v-if="UserInfos.defaultCreatureUUID == creature.uuid"
          style="width:100%;text-align:left;margin-left:10px;font-size:1.8em;margin-bottom:-30px">⭐</div>
        <img :src="creature.asset" :alt="creature.asset" class="img-fluid mx-auto imgSize" />
        <h1 class="center-text">{{ creature.name }}</h1>
        <img style="width: 2em" class="img-fluid mx-auto" :src="'/img/affinities/' + creature.affinity + '.png'"
          alt="{{creature.affinity}}" />
        <h5>
          <i class="center-text"> - {{ creature.affinity }} - </i>
        </h5>
      </div>

      <div class="flip-card-back">
        <h1 class="mb-4">Statistiques</h1>
        <!-- <img :src="require('../../assets/img/icons/creature/books/{{stat}}.png')" alt="{{stat}}.png"/> -->
        <div class="container">
          <div class="row">
            <div class="col-3" v-for="stat in Object.keys(creature.stats)">
              <img style="width: 35px" :src="'/img/icons/creature/' + stat + '.png'" alt="{{stat}}.png" /><br />
              <span style="font-size: 32px"> {{ creature.stats[stat] }}</span>
            </div>
          </div>
          <hr />
          <div class="row mt-2">
            <h4>Nombre de combat gagné</h4>
            <!-- <h3>{{creature.stats.nbCombatGagne}}</h3> -->
            <h3>0</h3>
          </div>

          <div class="row mt-2">
            <div class="col-6" v-for="book in creature.books">
              <img style="width: 55px" :src="'/img/icons/creature/books/' + book + '.png'" alt="{{book}}.png" /><br />
            </div>
          </div>
          <div class="row mt-2">
            <div class="col-12">
              <span v-if="UserInfos.defaultCreatureUUID != creature.uuid" class="btn btn-light"
                @click="setCreatureAsPreferred(creature.uuid)">Assigner comme créature par défaut</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref } from "vue";
import axios from 'axios';
import { useUserInfosStore } from '../stores/userInfos';
const server_url = import.meta.env.VITE_SERVER_URL;

const UserInfos = useUserInfosStore();
const props = defineProps({
  creature: {
    type: Object,
    required: true
  }
})

async function setCreatureAsPreferred(creatureUUID) {
  const response = await axios.post(`${server_url}/explorers/combatCreature`,
    {
      uuid: creatureUUID
    },
    {
      headers: {
        'Authorization': `Bearer ${UserInfos.access_token}`
      }
    });

    console.log(response);

    if(response.status == 200){
      UserInfos.defaultCreatureUUID = response.data.combatCreature.uuid
    }
}

</script>

<style lang="scss" scoped>
.imgSize {
  width: 230px;
  height: auto;
}

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

//Flip on hover source du code: https://codepen.io/JenniferWagner/pen/WNjRRJm,  Mais je l'ai modifié
.flip-card {
  display: inline-block;
  border-radius: 20%;
  background-color: transparent;
  width: 310px;
  height: 380px;
  perspective: 1000px;
}

.flip-card-inner {
  position: relative;
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.flip-card:hover .flip-card-inner,
.flip-card:focus .flip-card-inner,
.flip-card:focus-within .flip-card-inner,
.flip-card:active .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  border-radius: 6%;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}

.flip-card-front {
  backdrop-filter: blur(10px);
	box-shadow: 0px 0px 15px 0px white;
}

.flip-card-back {
  backdrop-filter: blur(20px);
	box-shadow: 0px 0px 10px 0px white;
  transform: rotateY(180deg);
}

.prefered{
  width:100%;
  text-align:left;
  margin-left:10px;
  font-size:1.8em;
  margin-bottom:-30px
}
</style>