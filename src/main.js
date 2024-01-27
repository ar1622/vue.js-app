// main.js

import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS
import "bootstrap"; // Import Bootstrap JavaScript

import { createApp } from "vue";
import { createRouter, createWebHistory } from "vue-router";
import App from "./App.vue";
import Lesson from "./pages/Lesson.vue";
import Order from "./pages/Order.vue";
import CreateNewLesson from "./pages/CreateNewLesson.vue";
import Cart from "./pages/Cart.vue";
import store from "./store";
import SearchItem from './pages/SearchItem.vue'

// Create the router
const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: "/", component: Lesson },
        { path: "/lesson", component: Lesson },
        { path: "/order", component: Order },
        { path: "/create-new-lesson", component: CreateNewLesson },
        { path: "/cart", component: Cart },
        {
            path: "/search",
            name: "search",
            component: SearchItem,
        },
    ],
});

// Create the app
const app = createApp(App);

// Use the router and store
app.use(router);
app.use(store);

// Mount the app
app.mount("#app");
