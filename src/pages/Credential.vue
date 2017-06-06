<template>
    <div>
        <ol class="breadcrumb">
            <li>
                <router-link to="/">Home</router-link>
            </li>
            <li class="active">Credential</li>
            <li class="active">{{ userKey }}</li>
            <li class="active">{{ proxy }}</li>
        </ol>
    
        <div class="panel panel-default">
            <div class="panel-heading">Sign Message</div>
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
                    <button type="button" class="btn btn-default" @click="sign">Sign</button>
                    <pre>{{ signed }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">Verify Message</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>message</label>
                        <input type="text" class="form-control" placeholder="userKey" v-model="signed.message">
                    </div>
                    <div class="form-group">
                        <label>signature</label>
                        <input type="text" class="form-control" placeholder="proxy" v-model="signed.signature">
                    </div>
                    <button type="button" class="btn btn-default" @click="verify">Verify</button>
                    <pre>{{ result }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">JWT Sign</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>proxy</label>
                        <input type="text" class="form-control" placeholder="proxy" v-model="proxy">
                    </div>
                    <div class="form-group">
                        <label>name</label>
                        <input type="text" class="form-control" placeholder="name" v-model="name">
                    </div>
                    <div class="form-group">
                        <label>github</label>
                        <input type="text" class="form-control" placeholder="github" v-model="github">
                    </div>
                    <div class="form-group">
                        <label>comment</label>
                        <input type="text" class="form-control" placeholder="comment" v-model="comment">
                    </div>
                    <button type="button" class="btn btn-default" @click="jwtSign">Sign</button>
                    <pre>{{ jwt }}</pre>
                </form>
            </div>
        </div>
    
        <div class="panel panel-default">
            <div class="panel-heading">JWT Verify</div>
            <div class="panel-body">
                <form>
                    <div class="form-group">
                        <label>jwt</label>
                        <textarea class="form-control" cols="30" rows="10" placeholder="jwt" v-model="jwt"></textarea>
                    </div>
                    <button type="button" class="btn btn-default" @click="jwtVerify">Verify</button>
                    <pre>{{ decode.verify }}</pre>
                    <pre>{{ decode.decode }}</pre>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['userKeyProp', 'proxyProp'],
    data() {
        return {
            userKey: this.userKeyProp,
            proxy: this.proxyProp,
            signed: '',
            result: '',
            jwt: '',
            decode: '',
            name: 'Jamie',
            github: 'https://github.com/hcmlinj/uport-dapp',
            comment: 'just comment'
        }
    },
    methods: {
        sign() {
            axios
                .post('/eth/sign', this.$data)
                .then(res => this.signed = res.data)
                .catch(err => this.signed = err.response.data)
        },
        verify() {
            axios
                .post('/eth/verify', this.$data)
                .then(res => this.result = res.data)
                .catch(err => this.result = err.response.data)
        },
        jwtSign() {
            axios
                .post('/jwt/sign', this.$data)
                .then(res => this.jwt = res.data)
                .catch(err => this.jwt = err.response.data)
        },
        jwtVerify() {
            axios
                .get('/jwt/verify', { headers: { Authorization: `Bearer ${this.jwt}` } })
                .then(res => this.decode = res.data)
                .catch(err => this.decode = err.response.data)
        }
    }
}
</script>