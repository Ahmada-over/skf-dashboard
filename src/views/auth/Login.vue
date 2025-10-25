<template>
    <div class="ma-auto">
    <p class="text-h1 principal font-weight-bold text-center mb-10">SKF</p>
    <v-card class="pa-10 rounded-xl">
        <v-card-title class="text-h2  text-center">Connexion!</v-card-title>
        <p class="text-h7  text-center">Entrez vos informations valide pour se connecter</p>
        <v-card-body class="pa-10">
            <v-form @submit.prevent="handleLogin">
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
                    <span v-if="load">Signin....</span>
                    <span v-else>Login</span>
                    </v-btn>
                    <p class="mt-5 text-h6">Vous n'avez pas de compte? <v-btn class="principal" link to="/register" type="bouton">s'inscrire</v-btn></p>
            </v-form>
        </v-card-body>
    </v-card>
    </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'
  import { supabase } from '@/supabase';
  import { useRouter } from 'vue-router';

  const router = useRouter()

  const visible = ref(false)
  const load = ref(false)
  const email = ref('')
  const password = ref('')

  const handleLogin = async () =>{
    try{
        load.value = true
        const { data,error } = await supabase.auth.signInWithPassword({
            email:email.value,
            password:password.value
        })
        if(error) throw error
        console.log(error)
        if(data.session){
            console.log("Connexion réussi")
            router.push('/dash/dashboard')
        }else{
            alert("Impossible de créer une session, veillez réessayer.")
        }
        //alert('Check your email for the login link!')
    }catch(error){
        if(error instanceof Error){
            alert(error.message)
        }
    }finally{
        load.value = false
    }
  }
</script>