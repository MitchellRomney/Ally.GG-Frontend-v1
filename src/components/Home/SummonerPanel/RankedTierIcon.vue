<template>
    <div id="RankedTierIcon">
        <div class="medal">
            <img class="resp-img" :src="getMedalUrl(rankedQueue.tier, rankedQueue.rankNumber)" :alt="rankedQueue.tier">
        </div>
    </div>
</template>

<script>
    export default {
        name: 'RankedTierIcon',
        components: {},
        props: {
            rankedQueue: Object,
        },
        data() {
            return {}
        },
        computed: {},
        methods: {
            getMedalUrl(tier, rank) {
                return require('../../../assets/images/ranked_medals/' + tier.toLowerCase() + '_' + rank + '.png');
            },
        }
    }
</script>

<style scoped lang="scss">
    #RankedTierIcon {
        height: 100%;
        width: 75px;

        .medal {
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            margin: auto;
        }
    }
</style>