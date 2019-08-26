<template>
    <div id="ActivityHeatmapPanel">
        <h2 class="panel-header">Activity Heatmap</h2>
        <div class="panel-wrapper-flex">
            <div class="panel-wrapper">
                <div class="months">
                    <div class="month">March</div>
                    <div class="month">April</div>
                    <div class="month">May</div>
                    <div class="month">June</div>
                    <div class="month">July</div>
                    <div class="month">August</div>
                </div>
                <div class="days">
                    <div class="day" v-for="day in days">
                        <div class="circle" :class="{
                        low : day.count > 0 && day.count < 2,
                        lowMid : day.count >= 2 && day.count < 4,
                        mid : day.count >= 4 && day.count < 6,
                        highMid : day.count >= 6 && day.count < 8,
                        high : day.count > 8}"></div>
                    </div>
                </div>
                <div class="legend">
                    <span>Less</span>
                    <div class="circle low"></div>
                    <div class="circle lowMid"></div>
                    <div class="circle mid"></div>
                    <div class="circle highMid"></div>
                    <div class="circle high"></div>
                    <span>More</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'ActivityHeatmapPanel',
        components: {},
        data() {
            return {
                days: [
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                    {count: Math.ceil(Math.random()*10), date: '10th August 2019'}, {count: Math.ceil(Math.random()*10), date: '10th August 2019'},
                ]
            }
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

        .panel-wrapper-flex {
            height: 100%;
            display: flex;

            .panel-wrapper {
                background-color: white;
                box-shadow: 0 5px 20px rgba(52, 133, 255, 0.15), 0 4px 6px rgba(46, 89, 155, 0.4);
                border-radius: 5px;
                height: 100%;
                width: 100%;
                padding: 20px;
                display: grid;
                grid-template: 30px auto 30px / 1fr;

                .circle {
                    border-radius: 50%;
                    background-color: #EBEFF2;
                    height: 25px;
                    width: 25px;

                    &.low {
                        background: linear-gradient(180deg, #ABFFE6 0%, #A3D3FF 100%);
                    }

                    &.lowMid {
                        background: linear-gradient(180deg, #7EFEE7 0%, #7EC0FE 100%);
                    }

                    &.mid {
                        background: linear-gradient(180deg, #34EBD5 0%, #3493EB 100%);
                    }

                    &.highMid {
                        background: linear-gradient(180deg, #04C2B7 0%, #106EC5 100%);
                    }

                    &.high {
                        background: linear-gradient(180deg, #008B8B 0%, #00488B 100%);
                    }
                }

                .months {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    font-weight: bold;
                }

                .days {
                    display: grid;
                    grid-template: repeat(8, 1fr) / repeat(17, 1fr);
                    height: 100%;
                    justify-items: center;
                    align-items: center;

                    .day {

                    }
                }

                .legend {
                    display: flex;
                    justify-self: end;
                    width: 50%;
                    justify-content: space-between;
                    align-items: center;

                    span {
                        margin-top: 2px;
                        font-weight: bold;
                        font-size: 0.9rem;
                    }
                }
            }
        }
    }
</style>