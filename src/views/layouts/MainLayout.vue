<template>
    
    <!-- SIDEBAR -->
    <SideBar></SideBar>
    <main class="main-content position-relative max-height-vh-100 h-100 border-radius-lg">
        <NavBar :title="title"/>
        <slot />
        
        <FooterBar />
        
    </main>
</template>

<script setup>
import SideBar from '../../components/layouts/SideBar.vue'
import NavBar from './NavBar.vue'
import FooterBar from './FooterBar.vue'

//définir les propriétés de mon component
const props = defineProps({
    title:{
        type: String,
        required:true
    }
})

</script>

<style lang="scss" scoped>

</style>