<template>
    <v-container fluid>
        <v-row justify="space-between">
            <v-col>
                <p>Categories</p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn @click="dialogCat = true" color="#FAC1D9">Ajouter une categorie</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-item-group  v-for="value in cat" class="me-5 rounded-lg" :key="value.name" v-model="toggle" v-slot:default="{ isSelected, select }" mandatory>
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
        </v-row>
        <v-row justify="space-between">
            <v-col>
                <p>
                    Liste des produits
                </p>
            </v-col>
            <v-spacer></v-spacer>
            <v-col>
                <v-btn color="#FAC1D9" @click="dialog = true">Ajouter une stock</v-btn>
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
                                <th>Couleur</th>
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
                                    <v-img
                                    :src="stock.image"
                                    height="50"
                                    width="50"
                                    class="rounded-lg"
                                    cover
                                    ></v-img>
                                </td>
                                <td>
                                    <v-avatar size="25" :style="{ backgroundColor: getCouleur(stock.couleur) }"></v-avatar>
                                    <span class="ms-2">{{ stock.couleur }}</span>
                                </td>
                                <!-- <td>{{ stock.id }}</td> -->
                                <td>{{  new Date(stock.created_at).toLocaleDateString() }}</td>
                                <td>{{ stock.nom }}</td>
                                <td>{{ stock.description }}</td>
                                <td>{{ stock.prix_unitaire }}</td>
                                <td>{{ stock.quantite }}</td>
                                <td>
                                    <v-icon color="green" @click="openEditProdDialog(stock)">mdi-pencil</v-icon>
                                    <v-icon color="red" @click="openDeleteProdDialog(stock.id)">mdi-delete</v-icon>
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
            </v-row>
        </div>    
        <!-- Dialog catégorie  -->
        <v-dialog v-model="dialogCat"        
            max-width="1000" 
            persistent>
            <v-card class="pa-4">
            <v-card-title>Ajouter une catégorie</v-card-title>
            <v-form @submit.prevent="handleInsertCat">
       
                <v-text-field variant="outlined" v-model="Cat.nom" label="Nom"></v-text-field>
                <v-textarea variant="outlined" v-model="Cat.description" label="Description"></v-textarea>
                    <v-divider></v-divider>
                    <v-card-actions>
                        <v-btn @click="dialogCat=false">Fermer</v-btn>
                        <v-btn type="submit" class="principal">Enregistrer</v-btn>
                    </v-card-actions>
            </v-form>
            </v-card>
        </v-dialog>

        <!-- Dialog produit  -->
       <v-dialog v-model="dialog" max-width="1000" persistent>
            <v-card>
                <v-card-title> <v-img :src="StockImage" height="45"></v-img> Ajouter un produit</v-card-title>
                <v-card-text>
                    <v-form ref="formRef" @submit.prevent="handleInsertProd">
                        <v-row dense>
                            <v-col>
                               <v-text-field v-model="Prod.nom" variant="outlined" label="Nom*" required></v-text-field>
                            </v-col>
                            <v-col>
                                  <v-text-field v-model="Prod.quantite" variant="outlined" label="Quantité" type="number" required></v-text-field>
                            </v-col>
                            <v-col>
                                <v-select
                                variant="outlined"
                                label="choisi une couleur"
                                :items="Object.keys(couleursMap)"
                                >
                                <template v-slot:item="{props,item}">
                                    <v-list-item v-bind="props">
                                        <v-avatar size="25" :style="{ backgroundColor: getCouleur(item.value) }">
                                        </v-avatar> 
                                    </v-list-item>
                                </template>
                                </v-select>
                            </v-col>
                        </v-row>
                        <v-row>
                            <v-col>
                                <v-text-field v-model="Prod.prix" variant="outlined" label="Prix unitaire" type="number" required></v-text-field>
                            </v-col>
                            <v-col>
                                <!-- <v-text-field v-model="Prod.image" variant="outlined" label="Image" type="text" required></v-text-field> -->
                                <v-select
                                v-model="selectedImage"
                                :items="imagesPeintures"
                                item-title="nom"
                                item-value="url"
                                label="Choisir une image"
                                variant="outlined"
                                >
                                <template v-slot:selection="{item}" :key="item.id">
                                    <v-list>
                                        <v-row>
                                            <v-col>

                                             <v-img 
                                                height="30"
                                                width="30"
                                                class="rounded-lg"
                                                :src="selectedImage"
                                                v-if="selectedImage">
                                             </v-img> 
                                            </v-col>
                                            <v-col>
                                                <v-list-item-title>{{ item.title }}</v-list-item-title>  
                                            </v-col>
                                        </v-row>
                                    </v-list>
                                </template>
                                <!-- Liste déroulante avec image + nom -->
                                <template v-slot:item="{ props, item }">
                                    <v-list-item v-bind="props">
                                    <v-img height="30"
                                    width="30"
                                    class="rounded-lg" :src="item.value" />
                                    <!-- <v-list-item-title>{{ item.title }}</v-list-item-title> -->
                                    </v-list-item>
                                </template>
                                </v-select>
                            </v-col>
                            <v-col>
                                <v-select
                                v-model="selectedCategory"
                                item-title="nom"
                                item-value="id"
                                label="Sélectionnez une catégorie"
                                dense 
                                outlined
                                variant="outlined"
                                :items="nom_category"
                                >
                                
                                </v-select>
                                <!-- <v-text-field v-model="categorie" variant="outlined" label="categorie" type="number"></v-text-field> -->
                            </v-col>
                        </v-row>
                        <v-textarea v-model="Prod.description" variant="outlined" label="Description" required></v-textarea>
                    <v-divider></v-divider>
                        <v-card-actions>
                            <v-btn @click="dialog=false">Fermer</v-btn>
                            <v-btn type="submit" class="principal">Enregistrer</v-btn>
                        </v-card-actions>
                    </v-form>
                </v-card-text>
               
            </v-card>
        </v-dialog>

        <!-- Dialog update produit  -->
         <v-dialog v-model="editProdDialog" max-width="1000" persistent>
            <v-card>
                <v-card-title>Modifier le produit</v-card-title>
                <v-card-text>
                <v-form @submit.prevent="handleUpdateProd">
                    <v-row dense>
                    <v-col>
                        <v-text-field v-model="productToEdit.nom" label="Nom" variant="outlined" />
                    </v-col>
                    <v-col>
                        <v-text-field v-model="productToEdit.quantite" label="Quantité" type="number" variant="outlined" />
                    </v-col>
                    <v-col>
                        <v-text-field v-model="productToEdit.prix_unitaire" label="Prix unitaire" type="number" variant="outlined" />
                    </v-col>
                    </v-row>

                    <v-row>
                    <v-col>
                        <v-select
                        v-model="selectedCategory"
                        :items="nom_category"
                        item-title="nom"
                        item-value="id"
                        label="Catégorie"
                        variant="outlined"
                        />
                    </v-col>
                    <v-col>
                        <v-select
                        v-model="selectedImage"
                        :items="imagesPeintures"
                        item-title="nom"
                        item-value="url"
                        label="Image"
                        variant="outlined"
                        />
                    </v-col>
                    </v-row>

                    <v-textarea v-model="productToEdit.description" label="Description" variant="outlined" />

                    <v-card-actions>
                    <v-btn @click="editProdDialog = false">Annuler</v-btn>
                    <v-btn type="submit" color="primary">Enregistrer</v-btn>
                    </v-card-actions>
                </v-form>
                </v-card-text>
            </v-card>
        </v-dialog>

        <!-- Dialog delete prod  -->
         <v-dialog v-model="deleteProdDialog" max-width="350">
            <v-card>
                <v-card-title class="text-h6">Confirmation</v-card-title>
                    <v-card-text>Voulez-vous vraiment supprimer ce produit ?</v-card-text>
                    <v-card-actions>
                    <v-btn @click="deleteProdDialog = false">Annuler</v-btn>
                    <v-btn type="submit" color="red" @click="deleteProd" variant="elevated">Supprimer</v-btn>
                </v-card-actions>
            </v-card>
         </v-dialog>
    </v-container>
</template>

<script setup lang="ts">
import { ref, shallowRef, onMounted } from 'vue'
import CategorieImage from "@/assets/images/tout.svg";
import type { Stock } from '@/types';
import {supabase} from '@/supabase';

import StockImage from "../assets/images/stock.svg";

const dialog = ref(false)
const dialogCat = ref(false)
const toggle = ref(null)
const products = ref<any[]>([])
const loading = ref(false)
const Prod = ref({
    nom:'',
    description:'',
    image:'',
    quantite:0,
    prix:0,
    categorie:''
});

const Cat = ref({
    nom:'',
    description:'',
});
const editProdDialog = ref(false)
const deleteProdDialog = ref(false)
const productToEdit = ref<any>(null)
const editProd = ref<number|null>(null)

const selectedImage = ref('')
const selectedCategory = ref('')
const category = ref<{ nom: string }[]>([]);
const nom_category = ref<{ id:number,nom: string }[]>([]);

onMounted(()=>{
    fetchProduits();
    fetchCategories();
});

let cat = ref<{name:string,products:number,img:string}[]>([])

const imagesPeintures = [
    {id:1,nom:'Blanc',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20blanc.jpg'},
    {id:2,nom:'Beige',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20beige.jpg'},
    {id:3,nom:'Gris',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20gris.jpg'},
    {id:4,nom:'Orange',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20orange.jpg'},
    {id:5,nom:'Terracota',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20terracota.jpg'},
    {id:6,nom:'Baie',url:'https://ngjbkvtzmkynsgilbshm.supabase.co/storage/v1/object/public/images/canadien%20baie.jpg'}
]
const couleursMap: Record<string, string> = {
    Blanc: '#FFFFFF',
    Beige: '#F5F5DC',
    Gris: '#808080',
    Orange: '#FFA500',
    Terracotta: '#E2725B',
    Baie: '#B22222',
  }
const getCouleur = (couleur: string) => {
  return couleursMap[couleur] || '#ccc' // couleur par défaut
}
// Fetch
const fetchProduits = async () => {
    try{
        loading.value = false;
        const {data:Products,error} = await supabase
        .from('Products')
        .select('*')
        .order('nom',{ascending:true});
        if(error) throw error;
        console.log(Products)
        products.value = Products;
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
        .select('id,nom');
        if(error) return alert(error.message);
        // category.value = Category;
        category.value = Category ? Category.map((c:any)=>({nom:c.nom})) : []
        nom_category.value = Category || []
        cat.value = Category ? Category.map((ca:any)=>({name: ca.nom, products: 2, img: CategorieImage})) : []
        console.log(Category);
    }catch(e){
        if(e instanceof Error) alert(e.message);
    }

}

// Insert
const handleInsertProd = async ()=>{
    try{
        if(!Prod.value?.nom || Prod.value.quantite <= 0 || Prod.value.prix <= 0 || Prod.value.image == ''){
            alert("Remplissez correctement tous les champs.")
            return;
        }

  /*      const selectedCat = nom_category.value.find(
            (c)=> c.nom.toLowerCase() === selectedCategory.value.toLowerCase()
        )
        if(!selectedCat){
            alert("Catégorie non trouvée.")
            return;
        }
*/
        const { data, error } = await supabase.from('Products').insert({
            nom: Prod.value?.nom,
            quantite: Prod.value?.quantite,
            description: Prod.value?.description,
            image: selectedImage,
            categorie_id: selectedCategory.value,
            prix_unitaire: Prod.value?.prix,
        });
        if(error) throw error;
        alert("Produits ajouté!");
        console.log(data)
        dialog.value = false;
        // reset form values and refresh list
        Prod.value = {
            nom: '',
            description: '',
            image: '',
            quantite: 0,
            prix: 0,
            categorie: ''
        }
        selectedCategory.value = ''
        await fetchProduits()

    }catch(error){
        if(error instanceof Error) alert(error.message);
    }
}
const handleInsertCat = async ()=>{
    try{
        if(Cat.value.nom == '' || Cat.value.description == ''){
            alert("Remplissez correctement tous les champs.")
            return;
        }
        const {data, error} = await supabase.from('Category').insert({
            nom:Cat.value.nom,
            description:Cat.value.description,
        });
        if(error) throw error;
        alert("Catégorie ajouté!");
        console.log(data)
        dialogCat.value = false;
        Cat.value = {
            nom:"",
            description:""
        };
    }catch(error){
        if(error instanceof Error) alert(error.message);
    }
}

// Update
const openEditProdDialog = (product:any)=>{
    productToEdit.value = {...product}
    selectedImage.value = product.image
    selectedCategory.value = product.categorie_id
    editProdDialog.value = true
}

const handleUpdateProd = async () =>{
    try{
        if(!productToEdit.value) return;

        const {id} = productToEdit.value
        const {error} = await supabase
        .from('Products')
        .update({
            nom:productToEdit.value.nom,
            description:productToEdit.value.description,
            image:selectedImage.value,
            quantite: productToEdit.value.quantite,
            prix_unitaire: productToEdit.value.prix_unitaire,
            categorie_id: selectedCategory.value
        })
        .eq('id',id)
        if(error) throw error
        alert('Produit modifié avec succès!')
        editProdDialog.value = false
        await fetchProduits()
    }catch(e){
        if(e instanceof Error) alert(e.message)
    }
}

// Delete
const openDeleteProdDialog = (id:number)=>{
    editProd.value = id
    deleteProdDialog.value = true
}
const deleteProd = async () =>{
    const confirmDelete = confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")

    if (!confirmDelete) return
    if(!editProd.value) return
    try{
        const {data,error} = await supabase
        .from('Products')
        .delete()
        .eq('id',editProd.value)
        if(error) throw error
        console.log(data)
        alert('Produit supprimé avec succès!')
        deleteProdDialog.value = false
        editProd.value = null
        await fetchProduits()
    }catch(e){
        if(e instanceof Error) alert(e.message)
    }
}
</script>