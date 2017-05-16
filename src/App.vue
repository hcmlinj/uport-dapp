<template>
    <div>
        <NavBar></NavBar>
        <section>
            <div class="container">
                <router-view class="container"></router-view>
            </div>
        </section>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue'

export default {
    components: { NavBar }
}
</script>

<style scoped>
div.container {
    padding-top: 2.5em;
}
</style>