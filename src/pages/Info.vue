<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Info</li>
        </ol>
        <h4 v-if="isLoading">
            Loading...</h4>
        <div v-if="!isLoading" class="panel panel-default">
            <div class="panel-heading">Block Info</div>
            <div class="panel-body">
                <p>Block Number: {{ infos.blockNumber }}</p>
                <p>Coinbase: {{ infos.coinbase }}</p>
            </div>
            <table class="table table-bordered table-hover">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Address</th>
                        <th>Balance</th>
                    </tr>
                </thead>
                <tbody v-for="(info, i) in infos.accounts">
                    <tr>
                        <td>{{ i + 1 }}</td>
                        <td>
                            {{ info.address }}
                            <router-link :to="`/identity-factory/${info.address}`">(IdentityFactory)</router-link>
                        </td>
                        <td>{{ info.balance }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return { infos: {} }
    },
    computed: {
        isLoading() {
            return Object.keys(this.infos).length === 0
        }
    },
    mounted() {
        axios.get('/eth/info').then(res => this.infos = res.data)
    }
}
</script>