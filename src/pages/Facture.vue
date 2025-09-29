<template>
  <v-container fluid>
    <h2 class="mb-6">Génération de facture</h2>

    <!-- Onglets -->
    <v-tabs v-model="tab" bg-color="#FAC1D9" grow>
      <v-tab value="client">Information du Client</v-tab>
      <v-tab value="produits">Information du facture</v-tab>
      <v-tab value="recap">Récapitulatif</v-tab>
    </v-tabs>

    <!-- Contenu lié aux onglets -->
    <v-window v-model="tab" class="mt-6">
      <!-- Onglet Infos Client -->
      <v-window-item value="client">
        <v-card class="pa-6">
            <!-- Drop down pour le logo -->
             <v-row class="ma-auto mb-4" justify="center" align="center">
                <v-file-upload 
                accept="image/*"
                label="Logo de l'entreprise"
                @change="onFileChange"
                v-model="logoFile"
                density="default"></v-file-upload>
             </v-row>
            <v-row>
                <v-col>
                    <v-text-field label="Nom du client" variant="outlined" v-model="facture.client.nom"></v-text-field>
                </v-col>
                <v-col>
                    <v-text-field label="Nom de l'entreprise" variant="outlined" v-model="facture.entreprise"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                  <v-text-field label="Adresse" variant="outlined" v-model="facture.client.adresse"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Email" variant="outlined" v-model="facture.client.email"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                  <v-text-field label="Numéro de registre" variant="outlined" v-model="facture.client.registre"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="NINEA" variant="outlined" v-model="facture.client.ninea"></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                  <v-text-field label="Numéro de téléphone" variant="outlined" v-model="facture.client.telephone"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field label="Date" type="date" variant="outlined" v-model="facture.client.date"></v-text-field>
                </v-col>
            </v-row>
            <!-- Type de facture et main d'oeuvre -->
            <v-row>
                <v-col>
                  <v-select
                    :items="['Standard', 'Proforma', 'Avoir']"
                    label="Type de facture"
                    variant="outlined"
                    v-model="facture.type"
                  ></v-select>
                </v-col>
                <v-col>
                  <v-text-field
                    label="Main d'oeuvre (€)"
                    type="number"
                    variant="outlined"
                    v-model.number="facture.mainOeuvre"
                  ></v-text-field>
                </v-col>
            </v-row>
        </v-card>
      </v-window-item>

      <!-- Onglet Infos du facture -->
      <v-window-item value="produits">
        <v-card class="pa-6">
          <v-row>
            <v-col cols="3">
                <v-textarea label="Désignation" v-model="produit.nom"></v-textarea>

            </v-col>
            <v-col>
                <v-text-field type="text" label="Unite" v-model.number="produit.unite"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Quantité" v-model.number="produit.qte"></v-text-field>
            </v-col>
            <v-col cols="3">
              <v-text-field type="number" label="Prix" v-model.number="produit.prix"></v-text-field>
            </v-col>
            <v-col>
                <v-btn color="#FAC1D9" @click="ajouterProduit"><v-icon>mdi-plus</v-icon></v-btn>
            </v-col>
          </v-row>

          <v-divider class="my-4"></v-divider>

          <v-table>
            <thead>
              <tr>
                <th>Désignation</th>
                <th>Unité</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Prix Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in facture.produits" :key="i">
                <td>{{ p.nom }}</td>
                <td>{{ p.unite }}</td>
                <td>{{ p.qte }}</td>
                <td>{{ p.prix }} €</td>
                <td>{{ p.qte * p.prix }} €</td>
              </tr>
            </tbody>
          </v-table>
        </v-card>
      </v-window-item>

      <!-- Onglet Récapitulatif -->
      <v-window-item value="recap">
        <v-card class="pa-6">
            <div align="center" class="mb-4">
              <v-img v-if="typeof logoPreview === 'string'" :src="logoPreview" max-width="150" max-height="150"></v-img>
            </div>
            <div class="mb-10">
              <div>
                <p>Nom du client : {{ facture.client.nom }}</p>
                <p class="text-end">Date : {{ facture.client.date }}</p>
              </div>
              <p>Registre : {{ facture.client.registre }}</p>
              <p>Ninea : {{  facture.client.ninea }}</p>
              <p>Email : {{ facture.client.email }}</p>
              <p>Adresse : {{ facture.client.adresse }}</p>
              <p>Telephone : {{ facture.client.telephone }}</p>
              <p class="text-decoration-underline text-center">{{ facture.type }}</p>
            </div>

          <v-divider class="my-4"></v-divider>

          <v-table>
            <thead>
               <tr>
                <th>Désignation</th>
                <th>Unité</th>
                <th>Quantité</th>
                <th>Prix unitaire</th>
                <th>Prix Total</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(p, i) in facture.produits" :key="i">
                <td>{{ p.nom }}</td>
                <td>{{ p.unite }}</td>
                <td>{{ p.qte }}</td>
                <td>{{ p.prix }} €</td>
                <td>{{ p.qte * p.prix }} €</td>
              </tr>
              <tr>
                <td colspan="4" class="text-start font-weight-bold">Main d'oeuvre</td>
                <td class="font-weight-bold">{{ facture.mainOeuvre }} </td>
              </tr>
              <tr>
                <td colspan="4" class="text-start font-weight-bold">Total</td>
                <td class="font-weight-bold">{{ arreterDuFacture }} </td>
              </tr>
            </tbody>
          </v-table>
          <div class="text-start mt-10">
            <p><span class="text-decoration-underline">Arrêter a la somme de :</span> {{ arreterDuFacture }} FRANC CFA</p>
          </div>
          <div class="text-end mt-4">
            <v-btn color="#FAC1D9" @click="genererFacture">
              Générer Facture
            </v-btn>
          </div>
        </v-card>
      </v-window-item>
    </v-window>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
const tab = ref("client")
const logoFile = ref([])
const logoPreview = ref<string|ArrayBuffer|null>(null)
import { watch } from "vue"
const facture = ref({
  client: {
    image: File,
    nom: "",
    adresse: "",
    email: "",
    registre: "",
    ninea: "",
    telephone: "",
    date: ""
    },
    entreprise: "",
    type: "Standard",
    mainOeuvre: 0,
  image: "" as string | null,
  produits: [] as {id:number, nom: string;unite:string; qte: number; prix: number }[]
})

const produit = ref({
    id:0,    
    nom: "",
    unite: "",
    qte: 1,
    prix: 0
})
// Surveiller le fichier uploadé
watch(logoFile, (newFile) => {

  if (newFile && newFile.length > 0) {
    const file = newFile[0]
    const reader = new FileReader()
    reader.onload = (e:ProgressEvent<FileReader>) => {
      const result = e.target?.result
      if(result){
        logoPreview.value = result;
      }else{
        logoPreview.value = null;
      }
    }
    if (!file) return;
    reader.readAsDataURL(file)
  } else {
    logoPreview.value = null
  }
})
const ajouterProduit = () => {
  if (produit.value.nom && produit.value.qte > 0 && produit.value.prix > 0) {
    facture.value.produits.push({ ...produit.value })
    const id = facture.value.produits.length + 1
    produit.value = {id:id, nom: "", unite:"",qte: 1, prix: 0 }
  } else {
    alert("Veuillez remplir tous les champs du produit correctement.")
  }
}
const arreterDuFacture = computed(()=>{
  const total = totalFacture.value + facture.value.mainOeuvre
  return total 
})
const totalFacture = computed(() =>
  facture.value.produits.reduce((acc, p) => acc + p.qte * p.prix, 0)
)
const onFileChange = (files: File[] | File | null) => {
  const file = Array.isArray(files) ? files[0] : files
  if (file) {
    const reader = new FileReader()
    reader.onload = e => {
      facture.value.image = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}
const genererFacture = () => {
  console.log("Facture générée :", facture.value)
  alert("Facture générée avec succès ✅")
}
</script>
