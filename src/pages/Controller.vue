<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Controller</li>
            <li class="active">{{ controller }}</li>
        </ol>
    
        <h2>RecoverableController.sol</h2>
    
        <div class="panel panel-default">
            <div class="panel-heading">recoveryKey</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>controller</label>
                        <input type="text" class="form-control" placeholder="controller" v-model="controller">
                    </div>
                    <button type="button" class="btn btn-default" @click="recoveryKey">Query</button>
                    <pre>Recovery: {{ recovery }} <router-link v-if="recovery !== ''" :to="`/recovery/${recovery}`">(Recovery)</router-link></pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">userKey</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>controller</label>
                        <input type="text" class="form-control" placeholder="controller" v-model="controller">
                    </div>
                    <button type="button" class="btn btn-default" @click="getUserKey">Query</button>
                    <pre>userKey: {{ userKey }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">proposedUserKey</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>controller</label>
                        <input type="text" class="form-control" placeholder="controller" v-model="controller">
                    </div>
                    <button type="button" class="btn btn-default" @click="getProposedUserKey">Query</button>
                    <pre>proposedUserKey: {{ proposedUserKey }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">signUserKeyChange</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <div class="form-group">
                        <label>proposedUserKey</label>
                        <input type="text" class="form-control" placeholder="proposedUserKey" v-model="proposedUserKey">
                    </div>
                    <button type="button" class="btn btn-default" @click="sign">Sign</button>
                    <pre>{{ signHash }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">changeUserKey</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <button type="button" class="btn btn-default" @click="change">Change</button>
                    <pre>{{ changeHash }}</pre>
                </form>
            </div>
        </div>
    
        <Event eventName="RecoveryEvent" contractName="RecoverableController" :address="controller"></Event>
    </div>
</template>

<script>
import axios from 'axios'

import Event from '@/components/Event.vue'

export default {
    props: ['controllerProp'],
    components: { Event },
    data() {
        return {
            controller: this.controllerProp,
            recovery: '',
            userKey: '',
            proposedUserKey: '',
            signHash: '',
            changeHash: ''
        }
    },
    methods: {
        recoveryKey() {
            axios
                .post('/controller/recoveryKey', this.$data)
                .then(res => this.recovery = res.data)
                .catch(err => this.recovery = err.response.data)
        },
        getUserKey() {
            axios
                .post('/controller/userKey', this.$data)
                .then(res => this.userKey = res.data)
                .catch(err => this.userKey = err.response.data)
        },
        getProposedUserKey() {
            axios
                .post('/controller/proposedUserKey', this.$data)
                .then(res => this.proposedUserKey = res.data)
                .catch(err => this.proposedUserKey = err.response.data)
        },
        sign() {
            axios
                .post('/controller/signUserKeyChange', this.$data)
                .then(res => this.signHash = res.data)
                .catch(err => this.signHash = err.response.data)
        },
        change() {
            axios
                .post('/controller/changeUserKey', this.$data)
                .then(res => this.changeHash = res.data)
                .catch(err => this.changeHash = err.response.data)
        }
    }
}
</script>