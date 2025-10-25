<template>
    <v-navigation-drawer 
      expand-on-hover
        permanent
        rail
    class="text-center rounded-e-xl" >
      <div class="pa-15 d-flex flex-column justify-space-between fill-height">
        <div class="">
          <p class="principal text-h3 font-weight-bold mb-10">SKF</p>
          <v-list density="compact" nav>
              <v-list-item class="mb-10" v-for="(value,i) in items" link :to="value.href" :key="i" :value="value">
                <div >
                <v-img height="30" width="30" class="ma-auto pa-1 mb-4" :src="value.img" cover></v-img>
                </div>  
                  <!-- <v-icon color="purple" >{{ value.icon }}</v-icon> -->
                  <v-list-item-title>{{ value.title }}</v-list-item-title>
              </v-list-item> 
              <v-divider></v-divider>
          </v-list>
        </div>

        <!-- Bouton en bas -->
       <div link to="/login">
          <v-img :src="LogoutImg" height="20" ></v-img>
          <p class="principal">
            Logout
          </p>
        </div>
      </div>   
</v-navigation-drawer>      
</template>
<script setup lang="ts">
import {ref} from 'vue';
import DashbordImage from "../assets/images/dashbord.svg";
import StockImage from "../assets/images/stock.svg";
import InventoryImage from "../assets/images/inventaire.svg";
import VentesImage from "../assets/images/inventory 1.svg";
import LogoutImg from "../assets/images/logout.svg";
interface SidebarItem {
    title: string;
    href: string;
    img: string;
}

let items: SidebarItem[] = [
      { title: "Dashboard", href: "dashboard",img:DashbordImage },
      { title: "Gestion de stock", href: "stock", img:StockImage},
      { title: "Inventaire", href: "inventaire",img:InventoryImage },
      { title: "Ventes", href: "vente", img:VentesImage },
      { title: "Facture", href: "facture", img:VentesImage },
    ];
</script>