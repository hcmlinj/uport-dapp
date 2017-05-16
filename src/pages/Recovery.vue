<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Recovery</li>
            <li class="active">{{ recovery }}</li>
        </ol>
    
        <h2>RecoveryQuorum.sol</h2>
    
        <div class="panel panel-default">
            <div class="panel-heading">getAddresses</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>recovery</label>
                        <input type="text" class="form-control" placeholder="recovery" v-model="recovery">
                    </div>
                    <button type="button" class="btn btn-default" @click="getAddresses">Query</button>
                    <pre>Delegates: {{ delegateAddresses }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">replaceDelegates</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>userKey</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="userKey">
                    </div>
                    <div class="form-group">
                        <label>delegatesToRemove</label>
                        <input type="text" class="form-control" placeholder="delegatesToRemove" v-model="delegatesToRemove">
                    </div>
                    <div class="form-group">
                        <label>delegatesToAdd</label>
                        <input type="text" class="form-control" placeholder="delegatesToAdd" v-model="delegatesToAdd">
                    </div>
                    <button type="button" class="btn btn-default" @click="replaceDelegates">Replace</button>
                    <pre>{{ hash }}</pre>
                </form>
            </div>
        </div>

        <div class="panel panel-default">
            <div class="panel-heading">signUserChange</div>
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

        <Event eventName="RecoveryEvent" contractName="RecoveryQuorum" :address="recovery"></Event>
    </div>
</template>

<script>
import axios from 'axios'

import Event from '@/components/Event.vue'

export default {
    props: ['recoveryProp'],
    components: { Event },
    data() {
        return {
            recovery: this.recoveryProp,
            delegateAddresses: [],
            userKey: '',
            delegatesToAdd: '',
            delegatesToRemove: '',
            hash: '',
            proposedUserKey: '',
            signHash: ''
        }
    },
    methods: {
        getAddresses() {
            axios
                .post('/recovery/getAddresses', this.$data)
                .then(res => this.delegateAddresses = res.data)
                .catch(err => this.delegateAddresses = err.response.data)
        },
        replaceDelegates() {
            axios
                .post('/recovery/replaceDelegates', this.$data)
                .then(res => this.hash = res.data)
                .catch(err => this.hash = err.response.data)
        },
        sign() {
            axios
                .post('/recovery/signUserChange', this.$data)
                .then(res => this.signHash = res.data)
                .catch(err => this.signHash = err.response.data)
        }
    }
}
</script>