import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './styles.css';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import { BiTrash } from "oh-vue-icons/icons";
import { PrPaperclip } from "oh-vue-icons/icons";



addIcons(BiTrash,PrPaperclip);

const app = createApp(App)
app.component("v-icon",OhVueIcon);
app.use(createPinia())

app.mount('#app')
