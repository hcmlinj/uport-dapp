<template>
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container-fluid">
            <div class="navbar-header">
                <router-link class="navbar-brand" exact to="/">uPort DApp</router-link>
            </div>
            <div class="container">
                <router-link class="btn btn-default btn-lg" exact to="/info">Info</router-link>
                <router-link class="btn btn-default btn-lg" to="/identity-factory">IdentityFactory</router-link>
                <router-link class="btn btn-default btn-lg" to="/proxy">Proxy</router-link>
                <router-link class="btn btn-default btn-lg" to="/controller">Controller</router-link>
                <router-link class="btn btn-default btn-lg" to="/recovery">Recovery</router-link>
                <router-link class="btn btn-default btn-lg" to="/registry">Registry</router-link>
            </div>
        </div>
    </nav>
</template>