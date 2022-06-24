import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);

import router from './routes';
app.use(router);

// Firebase
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
	apiKey: 'AIzaSyDDqZTW5T9WQpVqOSwXuv0CMyrdD4NL6JE',
	authDomain: 'advanced-helper.firebaseapp.com',
	projectId: 'advanced-helper',
	storageBucket: 'advanced-helper.appspot.com',
	messagingSenderId: '910328984745',
	appId: '1:910328984745:web:9bec043d4dd9172f0a65b8'
};

const firebaseApp = initializeApp(firebaseConfig);

// Date Picker

import VueFlatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

app.use(VueFlatPickr);

// Vuetify
import vuetify from './plugins/vuetify';

app.use(vuetify);


app.mount('#app');
