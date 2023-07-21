export default defineComponent({
    render () {
        const header = ref<string>('FoxBeCoding')
        const list = ref<{id: number, name: string}[]>([
            { id: 1, name: 'Desmond' },
            { id: 2, name: 'Lavell' },
            { id: 3, name: 'Fox' }
        ])
        
        const TEST_HEADER = computed<any>((): any => <h1>{header.value}</h1>)
        const TEST_BTN = computed<any>((): any => <v-btn color="surface" flat={true}>Fox</v-btn> )
        const TEST_LIST = computed<any>((): any => {
            return <ul>
                { list.value.map(({id, name}) => <li key={id}>{id+' '+name}</li>) }
            </ul>
        })

        const output = (): any => {
            return <div>
                {TEST_HEADER.value}
                {TEST_BTN.value}
                {TEST_LIST.value}
            </div>
        }
        
        return ( output() )
    }
})