<template>
    <v-container fluid>
        <v-row justify="space-between">
            <v-col>
                <p>Categories</p>
            </v-col>
            <v-col>
                <v-btn color="#FAC1D9">Ajouter une categorie</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-item-group  v-for="value in categories" class="me-5 rounded-lg" :key="value.name" v-model="toggle" v-slot:default="{ isSelected, select }" mandatory>
                <v-col cols="12">
                    <v-item :value="value.name" v-slot="{ isSelected, toggle }">
                        <v-card @click="toggle" :elevation="isSelected ? 12 : 2" :color="isSelected ? '#FAC1D9' : ''" class="pa-5" >
                            <v-img height="30" width="30" class="ma-auto pa-1 mb-4" :src="value.img" cover></v-img>
                            <div>
                            <p class="text-h6 font-weight-bold">{{value.name}}</p>
                            <p class="">{{value.products}}</p>
                            </div>         
                        </v-card>
                    </v-item>
                </v-col>

            </v-item-group>
            <!-- <v-btn-toggle v-model="toggle"  height="100" class="me-5" color="#FAC1D9">
                <v-btn v-for="value in categories" class="me-5 rounded-lg" :key="value.name">
                    <v-col>
                        <v-img height="30" width="30" class="ma-auto pa-1 mb-4" :src="value.img" cover></v-img>
                        <div>
                        <p class="text-h6 font-weight-bold">{{value.name}}</p>
                        <p class="">{{value.products}}</p>
                        </div>         
                    </v-col>

                </v-btn>
            </v-btn-toggle> -->
        </v-row>
        <v-row class="d-flex justify-content-end">
            <v-col>
                <v-btn color="#FAC1D9">Ajouter une stocke</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12">
                <v-table height="300px" fixed-header striped="even">
                    <thead>
                        <tr>
                            <th>Matricule</th>
                            <th>Date</th>
                            <th>Désignation</th>
                            <th>Stock</th>
                            <th>Entrés</th>
                            <th>Sorties</th>
                            <th>Restes</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="stock in stocks" :key="stock.matricule">
                            <td>{{ stock.matricule }}</td>
                            <td>{{ stock.date }}</td>
                            <td>{{ stock.designation }}</td>
                            <td>{{ stock.stock }}</td>
                            <td>{{ stock.entres }}</td>
                            <td>{{ stock.sorties }}</td>
                            <td>{{ stock.restes }}</td>
                            <td>
                                <v-icon color="green">mdi-pencil</v-icon>
                                <v-icon color="red">mdi-delete</v-icon>
                            </td>
                        </tr>
                    </tbody>
                </v-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CategorieImage from "@/assets/images/tout.svg";
import type { Stock } from '@/types';
const toggle = ref(null)
let categories = [
    { name: "Tout", products: 45, img: CategorieImage },
    { name: "Peinture", products: 20, img: CategorieImage },
    { name: "Outillage", products: 10, img: CategorieImage },
    { name: "Electricité", products: 15, img: CategorieImage },
]

let stocks:Stock[] = [
    { matricule: "A001", date: "12/05/2023", designation: "Peinture rouge", stock: 20, entres: 5, sorties: 2, restes: 23 },
    { matricule: "A002", date: "15/05/2023", designation: "Peinture bleue", stock: 15, entres: 3, sorties: 1, restes: 17 },
    { matricule: "A003", date: "20/05/2023", designation: "Peinture verte", stock: 10, entres: 2, sorties: 0, restes: 12 },
    { matricule: "A004", date: "20/05/2023", designation: "Peinture rouge", stock: 10, entres: 2, sorties: 0, restes: 12 },
]
</script>