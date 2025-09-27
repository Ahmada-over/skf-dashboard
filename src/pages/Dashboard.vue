<template>
    <v-container fluid>
    <v-row >
        <v-col v-for="value in items" cols="12" lg="4" >
        <v-card  class="mx-5 pa-5">
            <v-row justify="space-between">
                <v-col md="10">
                   <p class="font-weight-bold text-h4">{{ value.intitule }}</p>
                </v-col>
                <v-col class="ms-auto" md="2">       
                     <v-img class="rounded-circle" aspect-ratio="1" height="30" width="30" color="#FAC1D9" :src="value.icon" cover></v-img>
                </v-col>
            </v-row>
            <v-row>
                <p class="font-weight-bold">{{value.prix}}</p>
            </v-row>
            <v-row>
                <v-col class="">
                    <p class="font-weight-thin">{{ value.date }}</p>
                </v-col>
                <v-col>
                    <Bar/>                    
                </v-col>
            </v-row>
        </v-card>    
        </v-col>

    </v-row>
    <v-row>
        <v-col cols="12">      
            
        <v-card class="pa-5"> 
            <v-row justify="space-between">
                <v-col class="me-auto" cols="auto">
                    <p class="text-h6">Les produits</p>
                </v-col>
                <v-spacer></v-spacer>
                <v-col cols="auto">
                    <p>Voir tout</p>
                </v-col>
            </v-row>
        </v-card> 
        </v-col>

    </v-row>
    <v-row>
      <v-col cols="12">
        <Charts/>
      </v-col>
    </v-row>
</v-container>

  

</template>
<script setup lang="ts">
import IconDollar from "@/assets/images/dollar.svg";
import IconBillet from "@/assets/images/billet.svg";
import IconOccuracy from "@/assets/images/occuracy.svg";
import Bar from "@/helpers/Bar.vue";
import Charts from "@/helpers/Charts.vue";
interface CardItem{
    intitule: string;
    prix: string;
    icon: string;
    date: string;
}
let items:CardItem[] = [
    {
        intitule:"Ventes journalières",
        prix:"$2k",
        icon: IconDollar,
        date:"9 feburary 2024",
    },
    {
        intitule:"Revenues mensulles",
        prix:"$55k",
        icon: IconBillet,
        date:"9 feburary 2024",
    },
    {
        intitule:"Nombre de tables",
        prix:"25",
        icon: IconOccuracy,
        date:"9 feburary 2024",
    },
]
</script>