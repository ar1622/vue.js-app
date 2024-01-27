<script setup>
import Navbar from "./components/Navbar.vue";
</script>

<template>
    <header>
        <Navbar></Navbar>
    </header>

    <main class="container">
    
          <router-view></router-view>
    </main>
</template>
