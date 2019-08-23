<template>
    <div id="CSPerMin">
        <highcharts :options="chartOptions"></highcharts>
    </div>
</template>

<script>
    export default {
        name: 'RankedGrowthPanel',
        props: {
            matches: Array,
        },
        components: {},
        data() {
            return {
                chartOptions: {
                    series: [{
                        name: 'CS Per Minute',
                        keys: ['champion', 'y', 'date', 'avatar'],
                        data: []
                    }],
                    chart: {
                        type: 'areaspline',
                        style: {
                            position: 'absolute'
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: null
                    },
                    yAxis: {
                        title: {
                            text: null
                        }
                    },
                    tooltip: {
                        useHTML: true,
                        headerFormat: '',
                        pointFormat: '' +
                            '<strong>{point.date}</strong><br/>' +
                            '<img alt="{point.champion}" style="border-radius: 50%;" src="{point.avatar}" height="50" width="50"/>' +
                            '{point.champion}: <b>{point.y}</b><br/>',
                    },
                    plotOptions: {
                        areaspline: {
                            fillColor: {
                                linearGradient: {x1: 0, y1: 0, x2: 0, y2: 1},
                                stops: [
                                    [0, '#FF0081'],
                                    [1, '#D90ADD']
                                ]
                            },
                            lineWidth: 0,
                            marker: {
                                enabled: false
                            },
                            states: {
                                hover: {
                                    lineWidth: 0
                                }
                            },
                            threshold: null
                        }
                    },
                    credits: {
                        enabled: false
                    },
                }
            }
        },
        watch: {},
        computed: {},
        methods: {
            setChartSeries() {
                if (this.matches) {
                    let series = [];
                    for (let key in this.matches) {
                        let match = [
                            this.matches[key].champion.name,
                            this.matches[key].csPmin,
                            this.matches[key].match.timeago,
                            this.getChampionTileUrl(this.matches[key].champion)
                        ];
                        series.unshift(match);
                    }
                    this.chartOptions.series = [{
                        data: series
                    }];

                    console.log(this.chartOptions.series);
                }
            },
            getChampionTileUrl(champion) {
                return require('../../../assets/images/champion-tiles/' + champion.champId + '_0.jpg');
            },
        },
        mounted() {
            this.setChartSeries();
        }
    }
</script>

<style scoped lang="scss">
    #CSPerMin {
        margin: auto;
        position: relative;
        width: 100%;
        height: 80%;
    }
</style>