/**
 * main.ts
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Plugins
import { registerPlugins } from '@/plugins'
import router  from './router'
import vuetify from './plugins/vuetify'
import { VSparkline } from 'vuetify/components'
// Components
import App from './App.vue'
import '@/assets/css/main.css'

// Composables
import { createApp } from 'vue'

// Styles
import 'unfonts.css'

const app = createApp(App)

app.use(router);
app.use(vuetify);
app.mount('#app')
