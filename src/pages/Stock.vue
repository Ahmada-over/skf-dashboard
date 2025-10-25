<template>
    <v-container fluid>
        <v-row justify="space-between">
            <v-col>
                <p>Categories</p>
            </v-col>
            <v-spacer></v-spacer>
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
        <v-row justify="space-between">
            <v-col>
                <p>
                    Liste des produits
                </p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn color="#FAC1D9" @click="dialog = true">Ajouter une stocke</v-btn>
            </v-col>
        </v-row>
        <span v-if="loading">Chargement..........</span>
        <div v-else>
            <v-row>
                <v-col cols="12">
                    <v-table height="300px" fixed-header striped="even">
                        <thead>
                            <tr>
                                <th>Image</th>
                                <th>Matricule</th>
                                <th>Date</th>
                                <th>Désignation</th>
                                <th>Description</th>
                                <th>Prix Unitaire</th>
                                <th>Stock</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="stock in products" :key="stock.id">
                                <td> 
                                    <v-card>
                                    {{ stock.image}}
                                    </v-card>
                                </td>
                                <td>{{ stock.id }}</td>
                                <td>{{ stock.created_at }}</td>
                                <td>{{ stock.nom }}</td>
                                <td>{{ stock.description }}</td>
                                <td>{{ stock.prix_unitaire }}</td>
                                <td>{{ stock.quantite }}</td>
                                <td>
                                    <v-icon color="green">mdi-pencil</v-icon>
                                    <v-icon color="red">mdi-delete</v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </div>    
       <v-dialog v-model="dialog" max-width="1000" persistent>
            <v-card>
                <v-card-title> <v-img :src="StockImage" height="45"></v-img> Ajouter un produit</v-card-title>
                <v-card-text>
                    <v-form ref="formRef" @submit.prevent="handleInsert">
                        <v-row dense>
                            <v-col>
                               <v-text-field v-model="nom" variant="outlined" label="Nom*" required></v-text-field>
                            </v-col>
                            <v-col>
                                  <v-text-field v-model="quantite" variant="outlined" label="Quantité" type="number" required></v-text-field>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="prix" variant="outlined" label="Prix unitaire" type="number" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-text-field v-model="image" variant="outlined" label="Image" type="text" required></v-text-field>
                            </v-col>
                            <v-col>
                                <!-- <v-select
                                v-model="selectedCategory"
                                item-text="nom"
                                item-value="nom"
                                label="Sélectionnez une catégorie"
                                dense 
                                outlined
                                :items="category"
                                >

                                </v-select> -->
                                <v-text-field v-model="categorie" variant="outlined" label="categorie" type="number">Entrer la catégiorie</v-text-field>
                            </v-col>
                        </v-row>
                        <v-textarea v-model="description" variant="outlined" label="Description" required></v-textarea>
                    <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn @click="dialog=false">Fermer</v-btn>
                            <v-btn type="submit" class="principal">Enregistrer</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
               
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref,shallowRef } from 'vue'
import CategorieImage from "@/assets/images/tout.svg";
import type { Stock } from '@/types';
import {supabase} from '@/supabase';

import StockImage from "../assets/images/stock.svg";

const dialog = ref(false)
const toggle = ref(null)
const products = ref<any[]>([])
const loading = ref(false)
const nom = ref('');
const description = ref('');
const image = ref('');
const quantite = ref(0);
const prix = ref(0);
const categorie = ref(0);

const selectedCategory = ref('')
const category = ref([{nom:'Tout'}]);

onMounted(()=>{
    fetchProduits();
    fetchCategories();
});
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

const fetchProduits = async () => {
    try{
        loading.value = false;
        const {data,error} = await supabase
        .from('Products')
        .select('*')
        .order('nom',{ascending:true});
        if(error) throw error;
        products.value = data;
    }catch(e){
        if(e instanceof Error) alert(e.message);
    }finally{
        loading.value = false;
    }
}
const fetchCategories = async ()=>{
    try{
     const {data: Category,error} = await supabase
        .from('Category')
        .select('*');
        if(error) return alert(error.message);
        category.value = [{nom:'Tout'},...Category.map((c:any)=>({nom:c.nom}))]
    }catch(e){
        if(e instanceof Error) alert(e.message);
    }

}
const handleInsert = async ()=>{
    try{
        if(!nom.value || quantite.value <= 0 || prix.value <= 0){
            alert("Remplissez correctement tous les champs.")
            return;
        }
        const {data, error} = await supabase.from('Products').insert({
            nom:nom.value,
            quantite:quantite.value,
            description:description.value,
            image:description.value,
            categorie_id:categorie.value,
            prix_unitaire:prix.value
        });
        if(error) throw error;
        alert("Produits ajouté!");
        console.log(data)
        dialog.value = false;
        nom.value = '';
        quantite.value = 0;
        categorie.value = 0;
        prix.value = 0
    }catch(error){
        if(error instanceof Error) alert(error.message);
    }
}
</script>