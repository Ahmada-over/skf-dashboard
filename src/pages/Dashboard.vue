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
            <v-row v-for="(peinture,i) in peintures" :key="i">   
                <v-col cols="12">
                 <v-card class="mb-5" outlined>
                    <v-row class="pa-5" justify="space-between" align="center">
                        <v-col class="me-auto" cols="auto">
                            <v-img :src="peinture.image" height="100" width="100" class="ma-5" ></v-img>
                        </v-col>
                        <v-col>
                            <p class="font-weight-bold text-h6">{{ peinture.name }}</p>
                            <p class="font-weight-thin">{{ peinture.description }}</p>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-spacer></v-spacer>
                        <v-col>
                            <p class="font-weight-bold"><span :class="peinture.statut === 'En Stock' ? 'principal' : 'text-error'">{{ peinture.statut }}</span></p>
                            <p class="font-weight-bold text-h6">${{ peinture.price }}</p>
                        </v-col>
                    </v-row>
                </v-card>   
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
import PeiturePicture from "@/assets/images/national.png";
import Bar from "@/helpers/Bar.vue";
import Charts from "@/helpers/Charts.vue";
import type { CardItem, Peinture } from "@/types";

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

let peintures:Peinture[]= [
    {
        name:"Peinture acrylique",
        description:"Peinture acrylique de haute qualité pour des finitions durables.",
        price:25.99,
        quantity:100,
        category:"Peinture",
        image:PeiturePicture,
        statut:"En Stock"
    },
    {
        name:"Peinture à l'huile",
        description:"Peinture à l'huile riche en pigments pour des couleurs vibrantes.",
        price:30.50,
        quantity:50,
        category:"Peinture",
        image:PeiturePicture,
        statut:"En Rupture"
    },
    {
        name:"Vernis protecteur",
        description:"Vernis transparent pour protéger et embellir vos surfaces peintes.",
        price:15.75,
        quantity:200,
        category:"Vernis",
        image:PeiturePicture,
        statut:"En Stock"
    }
]
</script>