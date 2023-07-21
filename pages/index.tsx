export default defineComponent({
    render () {
        const test = ref<boolean>(5)
        const list = ref<string>([
            { id: 1, name: 'Desmond' },
            { id: 2, name: 'Lavell' },
            { id: 3, name: 'Fox' }
        ])
        return ( 
            <div>
                <h1>FoxBeCoding</h1>
                { test.value ? <v-btn>Fox</v-btn> : null }
            </div>
        )
    }
})