<template>
    <div id="top-champions">
        <div class="head">
            <h2>
                Top Champions
            </h2>
        </div>
    </div>
</template>
<script>
    import {ContentLoader} from 'vue-content-loader';

    export default {
        name: 'match_history',
        title: 'Match History - Ally.GG',
        data() {
            return {}
        },
        components: {
            ContentLoader,
        },
        props: {},
        watch: {
            $route(before, after) {
                // Check if they've loaded a new Summoner.
                if (before.params.summoner !== after.params.summoner) {
                }
            },
        },
        methods: {
            getChampionTileUrl(champion) {
                return require('../../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
        }
    }
</script>
<style scoped lang="scss">
    #ally-gg {
        #top-champions {
            grid-column-end: span 2;
            grid-row-end: span 2;
            background-color: white;
            border: 3px solid #f4f4f4;
            border-radius: 5px;
            position: relative;
            display: flex;
            flex-direction: column;
            color: $palette-primary;
            transition: all 0.5s ease;
            padding: 20px;
        }

        &.dark {
            #top-champions {

            }
        }
    }
</style>

