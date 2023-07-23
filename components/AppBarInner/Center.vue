<template>
    <div id="center" class="d-none d-md-flex flex-row align-center flex-0-1">
        <v-toolbar color="transparent">
            <v-card 
                class="w-100"
                rounded="xl" 
                height="44px"
                density="compact"
            >
                <v-text-field
                    density="compact"
                    flat
                    placeholder="Search for products, brands or clipz"
                    variant="solo-filled" 
                    append-inner-icon="mdi-magnify"
                    bg-color="transparent"
                />
            </v-card> 
        </v-toolbar>
    </div>
</template>