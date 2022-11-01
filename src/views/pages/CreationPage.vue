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
          <Field name="prenom" v-model="prenom" class="justify-content-start p-1 col-4 rounded" type="text"
            placeholder="Prenom" validateOnInput />
          <!--<p><ErrorMessage class="erreurForm" name="prenom"/></p>-->
          <Field name="nom" v-model="nom" class="col-4 justify-content-end p-1 rounded" type="text" placeholder="Nom"
            validateOnInput />
          <!--<p><ErrorMessage class="erreurForm" name="nom"/></p>-->
        </div>
        <div class="my-3">
          <Field name="mot_de_passe" v-model="mot_de_passe" class="col-6 rounded" placeholder="Mot de passe"
            type="password" validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="mot_de_passe" />
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
          <Field name="courriel" v-model="courriel" class="col-6 rounded" type="text" placeholder="Addresse courielle"
            validateOnInput />
          <p>
            <ErrorMessage class="erreurForm" name="courriel" />
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
import { useToast } from "vue-toastification";

//Vee-Validate pour les champs du form
import { useField, useForm, Form, ErrorMessage, Field } from 'vee-validate';
import * as yup from 'yup';

const server_url = import.meta.env.VITE_SERVER_URL

const axios = inject('axios');
const toast = useToast();

const creationCompte = yup.object({
  username: yup.string().required("Votre nom est requis")
    .min(5, "Votre nom d'utilisateur doit contenir au moins 5 caractères.")
    .max(30, "votre nom d'utilisateur doit avoir 30 caractères maximum"),
  prenom: yup.string().required("Votre prénom est requis")
    .min(2, "Votre prénom doit avoir au moins 2 caractères"),
  nom: yup.string().required("Votre nom est requis")
    .min(2, "Votre nom doit avoir au moins 2 caractères"),
  mot_de_passe: yup.string().required("Un mot de passe est requis")
    .min(2, "Votre mot de passe doit avoir au moins 2 caractères")
    .max(15, "Votre mot de passe doit avoir 15 caractères maximum"),
  confirmation_mdp: yup.string()
    .oneOf([yup.ref('mot_de_passe'), null], "Les mots de passes doivent être identiques"),
  courriel: yup.string().required("Votre courriel est requis")
    .min(2, "Votre courriel doit avoir au moins 2 caractères.")
});


function onSubmit(values) {
  createUser(values);
}


async function createUser(user) {
  try {
    const res = await axios.post(`${server_url}/utilisateurs/creation`, user);
    if (res.status === 201) {
      console.log("User created !");
      console.log(res);
      router.push('/profil');
    }
  } catch (err) {
    console.log(err);
    toast.warning(`Username déjà utilisé`, {
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