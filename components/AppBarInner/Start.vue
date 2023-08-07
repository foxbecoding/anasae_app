<template>
    <div id="start" class="d-flex flex-row align-center logo">
        <NuxtLink :to="{name: 'index'}" class="w-100">
            <Logo />
        </NuxtLink>
    </div>
</template>

<style scoped>
#start.logo {
    width: 100%;
    max-width: 120px;
}

@media screen and (max-width:  600px) {
    #start.logo {
        max-width: 100px;
    }
}

#start.logo:hover { cursor: pointer; }
</style>