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