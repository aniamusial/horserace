import { createApp } from 'vue'
import App from './App.vue'
import { store } from './store'

const app = createApp(App)

app.use(store)

store.dispatch('initializeGame')

app.mount('#app')
