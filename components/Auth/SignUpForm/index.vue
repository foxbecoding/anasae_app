<script setup lang="ts"></script>
<template>
    
    <p class="py-8">Have an account? 
        <NuxtLink 
            :to="{name: 'auth-login' }"
            class="text-decoration-none text-primary-alt" 
        >
            Login
        </NuxtLink>
    </p>
</template>