<template>
    <div id="RankedGrowthPanel">
        <h2 class="panel-header">Stat Growth (CS Per Minute)</h2>
        <div class="panel-wrapper-flex">
            <div class="panel-wrapper">
                <CSPerMin v-if="loaded" :matches="matches"></CSPerMin>
            </div>
        </div>
    </div>
</template>

<script>
    import CSPerMin from './GrowthPanel/CSPerMinGraph'

    export default {
        name: 'RankedGrowthPanel',
        props: {
            matches: Array,
            loaded: Boolean,
        },
        components: {
            CSPerMin
        },
        data() {
            return {}
        },
        watch: {},
        computed: {},
        methods: {},
        mounted() {}
    }
</script>

<style scoped lang="scss">
    #RankedGrowthPanel {
        grid-column-end: span 14;
        grid-row-end: span 5;
        display: flex;
        flex-direction: column;

        .panel-header {
            text-shadow: 0 5px 20px rgba(52, 133, 255, 0.075), 0 4px 6px rgba(46, 89, 155, 0.2);
            padding-bottom: 10px;
        }

        .panel-wrapper-flex {
            display: flex;
            height: 100%;

            .panel-wrapper {
                background-color: white;
                box-shadow: 0 5px 20px rgba(52, 133, 255, 0.15), 0 4px 6px rgba(46, 89, 155, 0.4);
                border-radius: 5px;
                height: 100%;
                width: 100%;
                padding: 0 20px;
                display: flex;
            }
        }
    }
</style>