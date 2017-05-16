<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Proxy</li>
            <li class="active">{{ proxy }}</li>
        </ol>
    
        <h2>Proxy.sol</h2>

        <div class="panel panel-default">
            <div class="panel-heading">owner</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>proxy</label>
                        <input type="text" class="form-control" placeholder="proxy" v-model="proxy">
                    </div>
                    <button type="button" class="btn btn-default" @click="owner">Query</button>
                    <pre>Controller: {{ controller }} <router-link v-if="controller !== ''" :to="`/controller/${controller}`">(Controller)</router-link></pre>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['proxyProp'],
    data() {
        return {
            proxy: this.proxyProp,
            controller: ''
        }
    },
    methods: {
        owner() {
            axios
                .post('/proxy/owner', this.$data)
                .then(res => this.controller = res.data)
                .catch(err => this.controller = err.response.data)
        }
    }
}
</script>