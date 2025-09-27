<template>
    <div class="pa-5">
        <v-row>
                <div class="pa-5">
                    <v-btn icon small>
                        <v-icon>mdi-chevron-left</v-icon>
                    </v-btn>
                    {{ pageTitle }}       
                </div>
            <v-spacer></v-spacer>
                <v-avatar>
                <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
                </v-avatar>
        </v-row>
    </div>
   

</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

// Calcul du titre en fonction de la route actuelle
const pageTitle = computed(() => {
    return (route.meta.title as string) || "";
});
</script>