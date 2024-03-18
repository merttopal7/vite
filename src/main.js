import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import todoStore from './store/todoStore'

const okcu=createApp(App)
okcu.use(todoStore)
okcu.mount('#app')