<template>
    <div class="ma-auto">
    <p class="text-h1 principal font-weight-bold text-center mb-10">KONATE BTP</p>
    <v-card class="pa-10 rounded-xl">
        <v-card-title class="text-h2  text-center">Inscription!</v-card-title>
        <p class="text-h7  text-center">Mets tes informations pour s'inscrire!</p>
        <v-card-body class="pa-10">
            <v-form @submit.prevent="handleRegister">
                <div class="text-subtitle-2 px-0 font-weight-black mb-1">Email</div>
                <v-text-field 
                prepend-inner-icon="mdi-email-outline" 
                label="Entrer email" 
                variant="outlined"
                v-model="email"
                ></v-text-field>
                <div class="text-subtitle-2 font-weight-black mb-1">Mot de passe</div>
                 <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    v-model="password"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
                <v-btn type="submit" color="#FAC1D9" class="mt-5" block>
                    Inscription</v-btn>
            </v-form>
        </v-card-body>
    </v-card>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { supabase } from '@/supabase';
import { useRouter } from 'vue-router';

const router = useRouter()
const email = ref('')
const password = ref('')
const visible = ref(false)

const handleRegister = async () =>{
    try{
        visible.value = true
        const { data,error } = await supabase.auth.signUp({
            email:email.value,
            password:password.value
        })
        if(error) throw error
        console.log("Connexion réussi")
        alert("Un lien de confirmation a été envoyé à votre adresse email. Vérifiez votre boîte mail.");
        router.push('')
    
    }catch(error){
        if(error instanceof Error){
            alert(error.message)
        }
    }finally{
        visible.value = false
    }
  }
</script>