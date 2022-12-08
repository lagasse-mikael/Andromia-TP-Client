<template>
	<div id="loginPage" class="mx-auto">
		<div class="row	center rounded-5 w-50 " id="login">
			<article class="text-center mb-5">
				<img class="my-3" src="../../assets/img/andromia-logo.png" width="75" height="75">
				<h1>Bienvenue sur <span id="title">Andromia</span></h1>
				<i style="font-size:1.125em">parce que combattre des créatures, c'est <b>Andromia en ciboulette</b></i>
			</article>
			<article class="col-6 offset-3 d-flex">
				<form class="mx-2 form " @submit="onSubmit">
					<div class="mb-3">
						<label for="exampleInputEmail1" class="form-label">Nom d'utilisateur</label>
						<input id="usernameInput" v-model="username" type="text" class="form-control">
						<div class="erreurForm"> {{ errUsername }}</div>
					</div>
					<div class="mb-3">
						<label for="exampleInputPassword1" class="form-label">Mot de passe</label>
						<input v-model="password" type="password" class="form-control" id="exampleInputPassword1">
						<span class="erreurForm"> {{ errMdp }}</span>
					</div>
					<div class="text-center">
						<button type="submit" :disabled="!meta.valid" class="btn btn-secondary btn-lg">Connexion</button>
					</div>

					<div class="text-center m-3">
						<RouterLink to="/CreationPage" class="text-center m-3">
							<i> Vous n'avez pas de compte ?</i>
						</RouterLink>
					</div>
				</form>
			</article>
		</div>
	</div>
</template>

<script setup>
//Vee-Validate pour les champs du form
import { useField, useForm } from 'vee-validate';
import * as yup from 'yup';
import { inject, onMounted, ref } from 'vue';
import router from '../../router/index.js';
import { useToast } from "vue-toastification";
import MainLayout from '../layouts/MainLayout.vue';
import axios from 'axios';
import { useUserInfosStore } from '../../stores/userInfos.js';


const userInfosStore = useUserInfosStore();
const toast = useToast();
const { handleSubmit, meta } = useForm();

const server_url = import.meta.env.VITE_SERVER_URL

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

const { value: password, errorMessage: errMdp } = useField('user.password', yup.string().required("Votre mot de passe est requis")
	.min(2, "Votre mot de passe doit avoir au moins 2 caracteres."));

async function login(user) {
	try {
		const res = await axios.post(`${server_url}/explorers/login`, user);
		if (res.status === 200) {
			userInfosStore.access_token = res.data.tokens.access_token
			userInfosStore.refresh_token = res.data.tokens.refresh_token
			userInfosStore.userName = res.data.username
			userInfosStore.userLocation = res.data.location
			router.push('/homePage')

			toast.success("Bienvenue sur Andromia " + res.data.username + " !" , {
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
			});



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

function creerCompte(){
	router.push("/CreationPage")
}

</script>

<style lang="scss" scoped>
.form {
	min-width: 400px;
	justify-content: center;
}

.center {
	position: absolute;
	left: 50%;
	top: 50%;
	transform: translate(-50%, -50%);
	padding: 10px;
}

.erreurForm {
	font-size: 0.81em;

}

#loginPage {
  height: 100vh;
  width: 100vw;
  background-size: cover;
}

#login {
	backdrop-filter: blur(50px);
	box-shadow: 0px 0px 15px 0px white;
}
</style>