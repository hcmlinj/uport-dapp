<template>
    <div class="panel panel-default">
        <div class="panel-heading">Event Watch: {{ contractName }}.{{ eventName }}</div>
        <div class="panel-body">
            <button type="button" class="btn btn-default" @click="watch">Watch</button>
            <button type="button" class="btn btn-default" @click="clear">Clear</button>
            <pre>{{ events }}</pre>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import Web3 from 'web3'

export default {
    props: ['eventName', 'contractName', 'address'],
    data() {
        return {
            events: []
        }
    },
    methods: {
        watch(event) {
            event.target.disabled = true

            axios.get('/config').then(res => {
                const config = res.data

                const web3 = new Web3(new Web3.providers.HttpProvider(config.ethereum.host))
                const contract = web3.eth.contract(config.abi[this.contractName]).at(typeof this.address === 'undefined' ? config.contract[this.contractName] : this.address)

                eval(`contract.${this.eventName}()`).watch((err, event) => {
                    if (err) this.events = err
                    if (event) this.events.unshift(event)
                })
            })
        },
        clear() {
            this.events = []
        }
    }
}
</script>