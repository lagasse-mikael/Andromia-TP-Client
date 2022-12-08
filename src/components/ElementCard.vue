<template>
    <div class="cards" id="elementCard">
        <img style="max-width: 7em;"
            v-bind:src="element.image"
            v-bind:title="element.element"
            class="img-fluid mx-auto" />
        <div class="center-text">
            <h2>{{element.element}}</h2>
            <h3>x {{element.quantity ?? 0}}</h3>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    element: {
        type: Object,
        required: true
    }
})

</script>

<style lang="scss" scoped>
.center-text {
  text-align: center;
  vertical-align: middle;
  line-height: 80%;
}

#elementCard {
	backdrop-filter: blur(20px) !important;
	box-shadow: 0px 0px 15px 0px white ;
}
.cards{
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-clip: border-box;
    border: 0 solid rgba(0, 0, 0, 0.125);
    border-radius: 1rem;

}
</style>