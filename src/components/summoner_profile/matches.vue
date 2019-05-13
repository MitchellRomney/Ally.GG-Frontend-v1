<template>
    <div id="matches">
        <h1>Matches</h1>
        <h2>{{ summoner.summonerName }}</h2>
    </div>
</template>

<script>
    export default {
        name: 'matches',
        title: 'Matches - Ally.GG',
        props: {
            summoner: Object,
            matches: Array,
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">

</style>