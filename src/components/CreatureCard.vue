<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <img :src="creature.asset" :alt="creature.asset" class="img-fluid mx-auto imgSize" />
        <h1 class="center-text">{{ creature.name }}</h1>
        <img
          style="width: 2em"
          class="img-fluid mx-auto"
          :src="'/img/affinities/' + creature.affinity + '.png'"
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
              <img
                style="width: 35px"
                :src="'/img/icons/creature/' + stat + '.png'"
                alt="{{stat}}.png"
              /><br />
              <span style="font-size: 32px"> {{ creature.stats[stat] }}</span>
            </div>
          </div>
          <hr />
          <div class="row mt-2">
            <h4>Nombre de combat gagné</h4>
            <h3>{{creature.stats.nbCombatGagne}}</h3>
            <!-- TODO: mettre le nombre réelle -->
          </div>

          <div class="row mt-2">
            <div class="col-6" v-for="book in creature.books">
              <img
                style="width: 55px"
                :src="'/img/icons/creature/books/' + book + '.png'"
                alt="{{book}}.png"
              /><br />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
    creature: {
        type: Object,
        required: true
    }
})

</script>

<style lang="scss" scoped>

.imgSize{
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
  width: 300px;
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
  // -webkit-backface-visibility: hidden; /* Safari */
  backface-visibility: hidden;
}

.flip-card-front {
  background-color: #111c44;
}

.flip-card-back {
  background-color: #111c44;
  transform: rotateY(180deg);
}
</style>