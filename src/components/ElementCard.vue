<template>
    <div class="card">
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

</style>