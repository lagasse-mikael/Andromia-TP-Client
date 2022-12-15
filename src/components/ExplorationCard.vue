<template>
<div id="cardUniform" class="rounded-5 card-size" style="">
    <div class="row">
        <!--Je sais que ca n'a pas d'affaire la, mais ca marche..?-->
        <div v-if="exploration.creature && !exploration.creatureHasBeenFought" class="row" style="height:42px">
            <h4 style="text-align:center;cursor:pointer ;" class="text-danger text-gradient mt-2">En attente d'un combat.</h4>
        </div>
        <div v-else-if="exploration.creature && exploration.creatureHasBeenFought" class="row" style="height:42px">
            <h4 style="text-align:center;" class="text-success text-gradient">La créature a été combattue</h4>
        </div>
        <div class="col-7">
            <h1 class="mt-1">{{ exploration.destination }}</h1>
            <h5 class="mb-1" style="font-style: italic;">{{ exploration.explorationDate.split('T')[0] }}</h5>
            <h1 class="badge bg-gradient px-3 me-auto " 
            :class="[exploration.affinity == 'energy' ? 'bg-warning text-dark': 
                        exploration.affinity == 'air' ? 'bg-light text-dark' : 
                        exploration.affinity == 'darkness' ? 'bg-dark text-white' :
                        exploration.affinity == 'earth' ? 'bg-brown' : 
                        exploration.affinity == 'energy' ? 'bg-orange' :
                        exploration.affinity == 'fire' ? 'bg-danger' :  
                        exploration.affinity == 'life' ? 'bg-success': 
                        exploration.affinity == 'light' ? 'bg-warning text-dark':
                        exploration.affinity == 'logic' ? 'bg-warning text-dark':  
                        exploration.affinity == 'music' ? 'bg-pink': 
                        exploration.affinity == 'space' ? 'bg-primary':
                        exploration.affinity == 'toxic' ? 'bg-success':  
                        exploration.affinity == 'water' ? 'bg-info': 'bg-secondary'
                        ]">Affinity : {{ exploration.affinity }}</h1>
        </div>
        <div v-if="exploration.creature" class="col-5">
            <img style="height:87.875px" class="img-fluid mt-2" v-bind:src="exploration.creature.asset" :alt="exploration.creature.asset"/>
            
            <div v-if="!exploration.creatureHasBeenFought" style="text-align:center;"><button class="btn btn-warning bg-gradiant btn-sm mt-2" @click="initFight(exploration.creature,exploration)">💥Combattre</button></div>
        </div>
        <div v-else class="col-5">
            <!-- Pas de creature -->
        </div>
    </div>
    <h2 style="margin-top: -5px;" >Loot :</h2>
    <div class="container">
    <div v-if="exploration.vault" class="row">
        <span v-for="element in exploration.vault.elements" class="col-4 text-bold">
            <img style="height:45px" v-bind:src="'https://assets.andromia.science/elements/' + element.element + '.png'" 
            v-bind:title="element.element" />
            <h5>x {{ element.quantity }}</h5> </span>
    </div>
    <div v-else>
        <h4 class="center-text mt-4 text-danger">Aucun éléments trouvés</h4>
    </div>

    <div v-if="exploration.vault"  class="row mt-2">
        <h4>+ <span class="text-warning">{{ exploration.vault.inox }} inox</span> !</h4>
    </div>
    <div v-else>
        <h4 class="ms-4">+ <span class="text-warning" >0 inox</span> !</h4>
    </div>
    </div>

</div>
</template>

<script setup>
import axios from 'axios';
import { onMounted } from 'vue';

const emit = defineEmits(["proposeFight"])
const props = defineProps({
    exploration: {
        type: Object,
        required: true
    }
})

function initFight(creature,exploration) {
    emit("proposeFight",creature,exploration)
}

</script>

<style lang="scss" scoped>
.card-size{
    width: auto;
    height: 700px;
}

.bg-orange{
  background-color: #fd7e14;
}

.bg-brown{
background-color:#964B00;
}

.bg-pink{
  background-color:#d63384;
}

.center-text {
  text-align: center;
  vertical-align: middle;
  line-height: 80%;
}

#cardUniform{
    padding: 12px 12px 12px 18px;
	backdrop-filter: blur(20px);
	box-shadow: 0px 0px 15px 0px white;
}

</style>