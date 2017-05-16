<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Registry</li>
            <li class="active">{{ proxy }}</li>
        </ol>
    
        <h2>UportRegistry.sol</h2>
    
        <div class="panel panel-default">
            <div class="panel-heading">set</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <div class="form-group">
                        <label>proxy</label>
                        <input type="text" class="form-control" placeholder="proxy" v-model="proxy">
                    </div>
                    <div class="form-group">
                        <label>registrationIdentifier</label>
                        <input type="text" class="form-control" placeholder="registrationIdentifier" v-model="registrationIdentifier">
                    </div>
                    <div class="form-group">
                        <label>value</label>
                        <input type="text" class="form-control" placeholder="value" v-model="value">
                    </div>
                    <button type="button" class="btn btn-default" @click="set">Set</button>
                    <pre>{{ hash }}</pre>
                    <a :href="`https://ipfs.infura.io/ipfs/${hash.valueIpfs}`" target="_blank">{{ hash.valueIpfs }}</a>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">get</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>proxy</label>
                        <input type="text" class="form-control" placeholder="proxy" v-model="proxy">
                    </div>
                    <div class="form-group">
                        <label>registrationIdentifier</label>
                        <input type="text" class="form-control" placeholder="registrationIdentifier" v-model="registrationIdentifier">
                    </div>
                    <button type="button" class="btn btn-default" @click="get">Get</button>
                    <pre>{{ result }}</pre>
                    <a :href="`https://ipfs.infura.io/ipfs/${result.valueIpfs}`" target="_blank">{{ result.valueIpfs }}</a>
                </form>
            </div>
        </div>
    
        <Event eventName="Set" contractName="UportRegistry"></Event>
    </div>
</template>

<script>
import axios from 'axios'

import Event from '@/components/Event.vue'

export default {
    props: ['proxyProp'],
    components: { Event },
    data() {
        return {
            proxy: this.proxyProp,
            userKey: '',
            registrationIdentifier: '',
            subject: '',
            value: '',
            issuer: '',
            hash: {},
            result: {}
        }
    },
    methods: {
        set() {
            axios
                .post('/registry/set', this.$data)
                .then(res => this.hash = res.data)
                .catch(err => this.hash = err.response.data)
        },
        get() {
            axios
                .post('/registry/get', this.$data)
                .then(res => this.result = res.data)
                .catch(err => this.result = err.response.data)
        }
    }
}
</script>