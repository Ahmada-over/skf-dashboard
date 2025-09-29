<template>
    <div class="ma-auto">
    <p class="text-h1 principal font-weight-bold text-center mb-10">SKF</p>
    <v-card class="pa-10 rounded-xl">
        <v-card-title class="text-h2  text-center">Login!</v-card-title>
        <p class="text-h7  text-center">Please enter your credentials below to continue</p>
        <v-card-body class="pa-10">
            <v-form>
                <div class="text-subtitle-2 px-0 font-weight-black mb-1">Email</div>
                <v-text-field prepend-inner-icon="mdi-email-outline" label="Entrer email" variant="outlined"></v-text-field>
                <div class="text-subtitle-2 font-weight-black mb-1">Mot de passe</div>
                 <v-text-field
                    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
                    :type="visible ? 'text' : 'password'"
                    density="compact"
                    placeholder="Enter your password"
                    prepend-inner-icon="mdi-lock-outline"
                    variant="outlined"
                    @click:append-inner="visible = !visible"
                ></v-text-field>
                <v-btn link color="#FAC1D9" to="/" class="mt-5" block>
                    Login</v-btn>
            </v-form>
        </v-card-body>
    </v-card>
    </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  const visible = ref(false)
</script>