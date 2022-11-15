<template>
    <div class="card">
        <img style="margin: auto 0px;"
            v-bind:src="element.image"
            v-bind:title="element.element" />
        <h2>{{element.element}}</h2>
        <h3>x {{element.quantity ?? 0}}</h3>
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

</style>