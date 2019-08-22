<template>
    <div id="ActivityHeatmapPanel">
        <h2 class="panel-header">Activity Heatmap</h2>
        <div class="panel-wrapper">

        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActivityHeatmapPanel',
        components: {},
        data() {
            return {}
        },
        computed: {},
        methods: {}
    }
</script>

<style scoped lang="scss">
    #ActivityHeatmapPanel {
        grid-column-end: span 10;
        grid-row-end: span 5;
        display: flex;
        flex-direction: column;

        .panel-header {
            text-shadow: 0 5px 20px rgba(52, 133, 255, 0.075), 0 4px 6px rgba(46, 89, 155, 0.2);
            padding-bottom: 10px;
        }

        .panel-wrapper {
            background-color: white;
            box-shadow: 0 5px 20px rgba(52, 133, 255, 0.15), 0 4px 6px rgba(46, 89, 155, 0.4);
            border-radius: 5px;
            height: 100%;
            width: 100%;
        }
    }
</style>