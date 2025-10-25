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
import Dashboard from '@/pages/Dashboard.vue';
import DefaultLayout from '@/layouts/DefaultLayout.vue';
import Stock from '@/pages/Stock.vue';
import Ventes from '@/pages/Ventes.vue';
import Inventaire from '@/pages/Inventaire.vue';
import Facture from '@/pages/Facture.vue';
import Login from '@/views/auth/Login.vue';
import Register from '@/views/auth/Register.vue';
import { supabase } from '@/supabase';

const routes = [
  {
    path:'',
    name: 'login',
    component:Login
  },
  {
    path:'/register',
    name: 'register',
    component:Register
  },
  {
    path:'/dash',
    component:DefaultLayout,
    meta:{
      requiresAuth:true
    },
    children:[
      // {path:'',redirect:'/login'},
      {path:'dashboard',name:'Dashboard',component:Dashboard, meta: { 
        title: "Tableau de bord" } },
      {path:'stock',name:'stock',component:Stock, meta: { title: "Stock" } },
      {path:'vente',name:'vente',component:Ventes, meta: { title: "Vente" } },
      {path:'inventaire',name:'inventaire',component:Inventaire, meta: { title: "Inventaire" } },
      {path:'facture',name:'facture',component:Facture, meta: { title: "Facture" } },
    ]
  },
  {
    path:'/:pathMatch(.*)*',
    redirect:'/dash/dashboard'
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

router.beforeEach(async (to,from,next)=>{
  const { data } = await supabase.auth.getSession();
  const isLoggedIn = !!data.session

  if(to.meta.requiresAuth && !isLoggedIn){
    next('/')
  }else{
    next()
  }
})
export default router
