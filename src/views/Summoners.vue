<template>
    <div id="summoners">
        <h1>My Summoners</h1>
        <div class="summoner" v-for="summoner in mySummoners">
            <router-link :to="{ name: 'summoner_profile', params: { summoner: summoner.summonerName }}">
                {{ summoner.summonerName }}
            </router-link>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'summoners',
        title: 'Summoners - Ally.GG',
        components: {
        },
        data() {
            return {
                // Summoner Data
                mySummoners: this.$store.state.summoners,

                // Loading Flags
                loading: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #summoners {
        position: relative;
    }
</style>