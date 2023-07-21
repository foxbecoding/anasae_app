export default defineComponent({
    render (lang="ts") {
        const test = ref<boolean>(true)
        const list = ref<string>([
            { id: 1, name: 'Desmond' },
            { id: 2, name: 'Lavell' },
            { id: 3, name: 'Fox' }
        ])
        return ( 
            <div>
                <h1>FoxBeCoding</h1>
                { test.value ? <v-btn color="surface" flat="true">Fox</v-btn> : null }
            </div>
        )
    }
})