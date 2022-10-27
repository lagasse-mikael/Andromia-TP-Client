<template>
    <div id="loginPage">
        <div class="row	center col-6" id="login">
			
            <article class="text-center mb-5">
                <img class="my-3" src="../../assets/img/andromia-logo.png" width="75" height="75">
                <h1>Bienvenue sur <span id="title">Andromia TP</span></h1>
                <i style="font-size:1.125em">parce que fight des créatures, c'est <b>Andromia en criss</b></i>
            </article>
            <article class="col-6 offset-3">
                <form class="mx-2" @submit="onSubmit">
                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Nom d'utilisateur</label>
                        <input id="usernameInput" v-model="username" type="text" class="form-control">
                        <span class="erreurForm"> {{errUsername}}</span>
                    </div>
                    <div class="mb-3">
                        <label for="exampleInputPassword1" class="form-label">Mot de passe</label>
                        <input v-model="mot_de_passe" type="password" class="form-control" id="exampleInputPassword1">
                        <span class="erreurForm"> {{errMdp}}</span>
                    </div>
                    <div class="text-center">
                        <button type="submit" :disabled="!meta.valid" class="btn btn-secondary">Connexion</button>
                        <div v-show="isUserAdmin" class="form-check mt-3">
                            <input class="form-check-input" type="checkbox" v-model="adminChecked">
                            <label>Compte admin détecté, se connecter en admin ?</label>
                        </div>
                    </div>
                </form>
            </article>
            <article class="my-5 text-center">
                <RouterLink to="/creationCompte">
                    <a>Pas de compte?</a>
                </RouterLink>
            </article>
        </div>
    </div>
</template>

<script setup>
	//Vee-Validate pour les champs du form
	import { useField, useForm } from 'vee-validate';
	import * as yup from 'yup';
	import MainLayout from '../layouts/MainLayout.vue'; 
	import { inject, onMounted, ref } from 'vue';
	import router from '../../router/index.js';
	import { useToast } from "vue-toastification";

	const axios = inject('axios');
	const toast = useToast();
	const { handleSubmit, meta } = useForm();

	const server_url = import.meta.env.VITE_SERVER_URL

	// let adminChecked = ref(false);
	// let isUserAdmin = ref(false);
	let isBackSpace = ref(false);
	let input;
	
	function onInvalidSubmit({ values, errors, results }) {
	console.log(values); // current form values
	console.log(errors); // a map of field names and their first error message
	console.log(results); // a detailed map of field names and their validation results
	}

	const onSubmit = handleSubmit(values => {
		login(values.user);
	}, onInvalidSubmit);

	const { value: username, errorMessage: errUsername } = useField('user.username', yup.string().required("Votre nom est requis")
	.min(5, "Votre nom d'utilisateur doit contenir au moins 5 caractères.")); 
	const { value: mot_de_passe, errorMessage: errMdp } = useField('user.mot_de_passe', yup.string().required("Votre mot de passe est requis")
	.min(2, "Votre mot de passe doit avoir au moins 2 caracteres.")); 

	async function login(user) {
		try {
            //todo changer le lien
			const res = await axios.post(`${server_url}/utilisateurs/login`, user);
			if(res.status === 200) {
      			console.log("User loger!");
                //login fonctionne
                router.push('/homePage');

				
			}
		} catch (err) {
			toast.error("Votre nom d'utilisateur ou votre mot de passe est incorrect", {
				position: "bottom-center",
				timeout: 7000,
				closeOnClick: true,
				pauseOnFocusLoss: false,
				pauseOnHover: true,
				draggable: true,
				draggablePercent: 0.6,
				showCloseButtonOnHover: false,
				hideProgressBar: true,
				closeButton: "button",
				icon: true,
				rtl: false
			})
			console.log(err);
		}
	}

	// async function isAdmin() {
	// 	console.log(username.value);
	// 	try {
	// 		const res = await axios.get(`${server_url}/utilisateurs/getAdmin/${username.value}`);
	// 		if(res.data.isAdmin) {
	// 			isUserAdmin.value = true;
	// 		} 
	// 	} catch (err) {
	// 		isUserAdmin.value = false;
	// 	}
		
		
	// }

</script>

<style lang="scss" scoped>

</style>