<template>
  <div class="row	center col-5">
    <!-- Formualaire creation de compte -->
    <div class=" formulaire col-8 row my-5 offset-2 text-right rounded">
      <h1 class="text-center my-3"> Crée votre compte Andromia</h1>
      <Form class="my-3" :validation-schema="creationCompte" @submit="onSubmit" v-slot="{ meta }">
        <div class="my-3">
          <Field name="username" v-model="username" class="rounded col-9" type="text" placeholder="Nom d'utilisateur"
            validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="username" />
          </p>
        </div>
        <div class="my-3">
          <Field name="password" v-model="password" class="col-6 rounded" placeholder="Mot de passe"
            type="password" validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="password" />
          </p>
        </div>
        <div class="my-3">
          <Field name="confirmation_mdp" v-model="confirmation_mdp" class="col-6 rounded" placeholder="Confirmer"
            type="password" validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="confirmation_mdp" />
          </p>
        </div>
        <div class="my-3">
          <Field name="email" v-model="email" class="col-6 rounded" type="text" placeholder="Addresse courriel"
            validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="email" />
          </p>
        </div>
        <div class="col-4 my-3 mx-auto">
          <button class="px-2 btn btn-secondary" :disabled="!meta.valid" type="submit">Créer votre compte</button>
        </div>
      </Form>
      <RouterLink to="/">
        <button class="mb-2 btn btn-secondary">Retour</button>
      </RouterLink>
    </div>
  </div>
</template>
  
<script setup>
import MainLayout from '../layouts/MainLayout.vue';
import { inject, onMounted, ref } from 'vue';
import router from '../../router/index.js';
import { useUserInfosStore } from '../../stores/userInfos.js';
import { useToast } from "vue-toastification";

//Vee-Validate pour les champs du form
import { useField, useForm, Form, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';

const userInfosStore = useUserInfosStore();
const server_url = import.meta.env.VITE_SERVER_URL

import axios from 'axios';
const toast = useToast();

const creationCompte = yup.object({
  username: yup.string().required("Votre nom est requis")
    .min(5, "Votre nom d'utilisateur doit contenir au moins 5 caractères.")
    .max(30, "votre nom d'utilisateur doit avoir 30 caractères maximum"),
  password: yup.string().required("Un mot de passe est requis")
    .min(2, "Votre mot de passe doit avoir au moins 2 caractères")
    .max(15, "Votre mot de passe doit avoir 15 caractères maximum"),
  confirmation_mdp: yup.string()
    .oneOf([yup.ref('password'), null], "Les mots de passes doivent être identiques"),
  email: yup.string().required("Votre courriel est requis")
    .min(2, "Votre courriel doit avoir au moins 2 caractères.")
});


function onSubmit(values) {
  createUser(values);
}


async function createUser(user) {
  try {
    console.log(user);
    delete user.confirmation_mdp;
    const res = await axios.post(`${server_url}/explorers/create`, user);
    console.log(res);

    if (res.status === 201) {
     	userInfosStore.access_token = res.data.tokens.access_token
			userInfosStore.refresh_token = res.data.tokens.refresh_token
			userInfosStore.userName = res.data.username;
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
    console.log(err);
    toast.warning(`Érreur lors de la création de compte`, {
      position: "bottom-center",
      timeout: 3500,
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
}
const current = new Date();
const date = current.getFullYear() + '-' + (current.getMonth() + 1) + '-' + current.getDate();
</script>
  
<style lang="scss" scoped>
.erreurForm {
  color: red;
  font-size: 0.9em;
}

.center {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 10px;
}
</style>