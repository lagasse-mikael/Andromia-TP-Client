<template>
    <nav class="navbar navbar-main navbar-expand-lg px-0 mx-4 shadow-none border-radius-xl px-0 mx-4 px-0 mx-4" id="navbarBlur" data-scroll="true">
        <div class="px-3 py-1 container-fluid">
            <nav aria-label="breadcrumb">
            <ol class="px-0 pt-1 pb-0 mb-0 bg-transparent breadcrumb me-sm-6 text-white">
            </ol>
            <h6 class="mb-0 font-weight-bolder text-white">{{title}}</h6>
            </nav>
            <div class="mt-2 collapse navbar-collapse mt-sm-0 me-md-0 me-sm-4 me-sm-4" id="navbar">
            <ul class="navbar-nav justify-content-end ms-md-auto">
                <li class="nav-item d-flex align-items-center">
                <a href="#modLogin" class="px-0 nav-link font-weight-bold text-white" data-bs-toggle="modal" data-bs-target="#modLogin">
                    <button class="d-sm-inline d-none btn btn-light" @click="disconnect()" >Deconnexion</button>
                </a>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>

<script setup>
import router from '../../router';
import { useUserInfosStore } from '../../stores/userInfos';

const userInfos = useUserInfosStore()

const props = defineProps({
    title:{
        type: String,
        required:true
    }
})

function disconnect(){
    userInfos.access_token = ""
    userInfos.refresh_token = "" 
    router.push("/")
}

</script>

<style lang="scss" scoped>

</style>