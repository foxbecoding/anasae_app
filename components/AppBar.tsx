import { useTheme } from 'vuetify'

export const AppBarStart = defineComponent({
    name: "AppBarStart",
    setup() {
        const LOGO_TITLE = computed(() => <v-app-bar-title class="nana-logo-title">ANASAE</v-app-bar-title>)
        
        const output = (): any => {
            return <div id="start" class="d-flex flex-row align-center">
                {LOGO_TITLE.value}
            </div>
        }

        return () => ( output() )
    }
})

export const AppBarCenter = defineComponent({
    name: "AppBarCenter",
    setup() {
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

        return () => ( output() )
    }
})

export const AppBarEnd = defineComponent({
    name: "AppBarEnd",
    setup() {
        const theme = useTheme()
        
        const toggleTheme = (): void => {
            theme.global.name.value = theme.global.current.value.dark ? 'anasaeLight' : 'anasaeDark'
        }
        
        const THEME_ICON = computed((): string => {
            return theme.global.current.value.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
        })

        const THEME_TOGGLE_BTN = computed(() => {
            return  (
                <nana-app-bar-btn 
                    onClick={ () => toggleTheme() }
                    class="rounded-xl mr-2"
                    variant="plain"
                    height="38px"
                    width="38px"
                    icon
                >
                    <v-icon>{ THEME_ICON.value }</v-icon>
                </nana-app-bar-btn>
            )
        })

        const SIGN_IN_BTN = computed(() => {
            return  (
                <div class="nana-primary-bg-color rounded-xl">
                    <nana-app-bar-btn 
                        class="rounded-xl"
                        variant="plain" 
                    >
                        <v-icon class="mr-2" >mdi-account-circle</v-icon>
                        Sign In
                    </nana-app-bar-btn>
                </div>
            )
        })
        
        const output = (): any => {
            return (
                <div id="end" class="d-flex flex-row align-center justify-content-end">
                    <v-toolbar color="background">
                        {THEME_TOGGLE_BTN.value}
                        {SIGN_IN_BTN.value}
                    </v-toolbar>
                </div>
            )
        }

        return () => ( output() )
    }
})