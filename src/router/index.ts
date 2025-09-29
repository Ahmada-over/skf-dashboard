/**
 * router/index.ts
 *
 * Automatic routes for `./src/pages/*.vue`
 */

// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import { components } from 'vuetify/dist/vuetify.js'
//import { routes } from 'vue-router/auto-routes'
import LoginView from "@/views/auth/LoginView.vue";
import Dashboard from '@/pages/Dashboard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Stock from '@/pages/Stock.vue';
import Vente from '@/pages/Vente.vue';
import Inventaire from '@/pages/Inventaire.vue';
import Facture from '@/pages/Facture.vue';

const routes = [
  {
    path:'/login',
    name: 'login',
    component:LoginView
  },
  {
    path:'/',
    component:DefaultLayout,
    children:[
      {path:'',redirect:'/dashboard'},
      {path:'dashboard',name:'Dashboard',component:Dashboard, meta: { title: "Tableau de bord" } },
      {path:'stock',name:'Stock',component:Stock, meta: { title: "Stock" } },
      {path:'vente',name:'Vente',component:Vente, meta: { title: "Vente" } },
      {path:'inventaire',name:'Inventaire',component:Inventaire, meta: { title: "Inventaire" } },
      {path:'facture',name:'Facture',component:Facture, meta: { title: "Facture" } },
    ]
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/dashboard'
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

// Workaround for https://github.com/vitejs/vite/issues/11804
router.onError((err, to) => {
  if (err?.message?.includes?.('Failed to fetch dynamically imported module')) {
    if (localStorage.getItem('vuetify:dynamic-reload')) {
      console.error('Dynamic import error, reloading page did not fix it', err)
    } else {
      console.log('Reloading page to fix dynamic import error')
      localStorage.setItem('vuetify:dynamic-reload', 'true')
      location.assign(to.fullPath)
    }
  } else {
    console.error(err)
  }
})

router.isReady().then(() => {
  localStorage.removeItem('vuetify:dynamic-reload')
})

export default router
