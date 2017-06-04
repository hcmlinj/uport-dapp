'use strict'

import 'bootstrap'
// import 'bootstrap-theme'

import Vue from 'vue'
import VueRouter from 'vue-router'

import App from '@/App.vue'
// const Index = resolve => require(['@/pages/Index.vue'], resolve)
const Info = resolve => require(['@/pages/Info.vue'], resolve)
const IdentityFactory = resolve => require(['@/pages/IdentityFactory.vue'], resolve)
const Proxy = resolve => require(['@/pages/Proxy.vue'], resolve)
const Controller = resolve => require(['@/pages/Controller.vue'], resolve)
const Recovery = resolve => require(['@/pages/Recovery.vue'], resolve)
const Registry = resolve => require(['@/pages/Registry.vue'], resolve)
const Credential = resolve => require(['@/pages/Credential.vue'], resolve)

Vue.use(VueRouter)

const router = new VueRouter({
    linkActiveClass: 'active',
    routes: [
        { path: '/', component: Info },
        { path: '/info', component: Info },
        { path: '/identity-factory', component: IdentityFactory },
        { path: '/identity-factory/:userKeyProp', component: IdentityFactory, props: true },
        { path: '/proxy/', component: Proxy },
        { path: '/proxy/:proxyProp', component: Proxy, props: true },
        { path: '/controller/', component: Controller },
        { path: '/controller/:controllerProp', component: Controller, props: true },
        { path: '/recovery/', component: Recovery },
        { path: '/recovery/:recoveryProp', component: Recovery, props: true },
        { path: '/registry/', component: Registry },
        { path: '/registry/:proxyProp', component: Registry, props: true },
        { path: '/credential/', component: Credential },
        { path: '/credential/:userKeyProp/:proxyProp', component: Credential, props: true }
    ]
})

new Vue({
    router,
    template: '<App></App>',
    components: { App }
}).$mount('#app')