export const AppBarStart = defineComponent({
    name: "AppBarStart",
    render() {
        const LOGO_TITLE = computed(() => <v-app-bar-title class="nana-logo-title">ANASAE</v-app-bar-title>)
        
        const output = (): any => {
            return <div id="start" class="d-flex flex-row align-center">
                {LOGO_TITLE.value}
            </div>
        }

        return ( output() )
    }
})
export const AppBarCenter = defineComponent({
    name: "AppBarCenter",
    render() {
        const SEARCH_BAR = computed(() => {
            return (
                <v-toolbar color="background">
                    <v-card 
                        rounded="xl" 
                        width="400px" 
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
            )
        })
        
        const output = (): any => {
            return (
                <div id="center" class="d-flex flex-row align-center flex-0-1">
                    {SEARCH_BAR.value}
                </div>
            )
        }

        return ( output() )
    }
})
export const AppBarEnd = defineComponent({
    name: "AppBarEnd",
    render() {
        const LOGO_TITLE = computed(() => <v-app-bar-title class="nana-logo-title">ANASAE</v-app-bar-title>)
        
        const output = (): any => {
            return <div id="start" class="d-flex flex-row align-center">
                {LOGO_TITLE.value}
            </div>
        }

        return ( output() )
    }
})