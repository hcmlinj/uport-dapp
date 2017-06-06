<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">IdentityFactory</li>
            <li class="active">{{ userKey }}</li>
        </ol>
    
        <h2>IdentityFactory.sol</h2>
    
        <div class="panel panel-default">
            <div class="panel-heading">senderToProxy</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <button type="button" class="btn btn-default" @click="query">Query</button>
                    <pre>Proxy: {{ proxy }} <router-link v-if="proxy !== ''" :to="`/proxy/${proxy}`">(Proxy)</router-link> <router-link v-if="proxy !== ''" :to="`/registry/${userKey}/${proxy}`">(Registry)</router-link> <router-link v-if="proxy !== ''" :to="`/credential/${userKey}/${proxy}`">(Credential)</router-link></pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">CreateProxyWithControllerAndRecovery</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <div class="form-group">
                        <label>delegates</label>
                        <input type="text" class="form-control" placeholder="delegates" v-model="delegates">
                    </div>
                    <div class="form-group">
                        <label>longTimeLock</label>
                        <input type="number" class="form-control" placeholder="longTimeLock" v-model="longTimeLock">
                    </div>
                    <div class="form-group">
                        <label>shortTimeLock</label>
                        <input type="number" class="form-control" placeholder="shortTimeLock" v-model="shortTimeLock">
                    </div>
                    <button type="button" class="btn btn-default" @click="create">Create</button>
                    <pre>{{ hash }}</pre>
                </form>
            </div>
        </div>
    
        <Event eventName="IdentityCreated" contractName="IdentityFactory"></Event>
    </div>
</template>

<script>
import axios from 'axios'

import Event from '@/components/Event.vue'

export default {
    props: ['userKeyProp'],
    components: { Event },
    data() {
        return {
            userKey: this.userKeyProp,
            delegates: '',
            longTimeLock: 0,
            shortTimeLock: 0,
            proxy: '',
            hash: ''
        }
    },
    methods: {
        query() {
            axios
                .post('/identity-factory/query', this.$data)
                .then(res => this.proxy = res.data)
                .catch(err => this.proxy = err.response.data)
        },
        create() {
            axios
                .post('/identity-factory/create', this.$data)
                .then(res => this.hash = res.data)
                .catch(err => this.hash = err.response.data)
        }
    }
}
</script>