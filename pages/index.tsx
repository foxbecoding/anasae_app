export default defineComponent({
    render () {
        const test = ref<boolean>(true)
        const list = ref<{id: number, name: string}[]>([
            { id: 1, name: 'Desmond' },
            { id: 2, name: 'Lavell' },
            { id: 3, name: 'Fox' }
        ])
        // const gg = ref<any>(
        //     <v-btn color="surface" flat={true}>Fox</v-btn>
        // )
        return ( 
            <div>
                <h1>FoxBeCoding</h1>
                { test.value ? <v-btn color="surface" flat={true}>Fox</v-btn> : null }
                <ul>
                    {list.value.map(({ id, name }) => {
                        return <li key={id}>{id+' '+name}</li>
                    })}
                </ul>
            </div>
        )
    }
})