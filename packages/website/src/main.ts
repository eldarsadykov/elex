import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

import "@elex/components";
import { setChapters } from "@elex/components";
import { chapters } from "@elex/content";

const app = createApp(App)

if (import.meta.env.VITE_BUNDLED_CONTENT_MODE === 'true') {
  console.log('Bundled content mode.');
  setChapters(chapters);
} else {
  console.log('Content fetch mode.')
}

app.use(createPinia())
app.use(router)

app.mount('#app')
