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
            <div>
                <span class="pa-2">{{ currentUser?.email }}</span>
             <v-avatar>
                <v-img
                    alt="John"
                    src="https://cdn.vuetifyjs.com/images/john.jpg"
                ></v-img>
                </v-avatar>   
            </div>

        </v-row>
    </div>
   

</template>
<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute } from "vue-router";
import type { User } from "@supabase/supabase-js";
import { supabase } from '@/supabase';

const route = useRoute();
const currentUser = ref<User | null>(null);
onMounted(()=>{
    fetchUser();
})
const fetchUser = async () => {
    const { data } = await supabase.auth.getSession();
    if (data.session) {
        currentUser.value = data.session.user;
    }else{
        currentUser.value = null;
    }
}
// Calcul du titre en fonction de la route actuelle
const pageTitle = computed(() => {
    return (route.meta.title as string) || "";
});

</script>