<template>
    <div id="loading">
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';


    export default {
        name: 'loading',
        title: 'Loading - Ally.GG',
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>
<style scoped lang="scss">
    #loading {
        position: fixed;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;

    }
</style>