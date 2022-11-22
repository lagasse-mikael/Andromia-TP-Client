<template>
<div class="card-size">
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
    <h2>Loot :</h2>
    <div class="container">
    <div class="row">
        <span v-for="element in exploration.vault.elements" class="col-4 text-bold">
            <img style="height:45px" v-bind:src="'https://assets.andromia.science/elements/' + element.element + '.png'" 
            v-bind:title="element.element" />
            <h5>x {{ element.quantity }}</h5> </span>
    </div>
    <div class="row mt-2">
        <h4>+ <span style="color:yellow ;">{{ exploration.vault.inox }} inox</span> !</h4>
    </div>
    </div>

</div>
</template>

<script setup>

const props = defineProps({
    exploration: {
        type: Object,
        required: true
    }
})

</script>

<style lang="scss" scoped>
.card-size{

    width: auto;
    height: auto;
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


</style>