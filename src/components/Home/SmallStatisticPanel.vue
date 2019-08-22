<template>
    <div id="StatisticPanel" :class="{ gradient : gradient }">
        <div class="panel-wrapper" v-if="loaded">
            <div class="scope">{{ content.scope }}</div>
            <div class="icon">
                <font-awesome-icon :icon="content.icon" size="4x"/>
            </div>
            <div class="bottom-wrapper">
                <div class="statistic">
                    {{ content.statistic }}
                </div>
                <div class="value-growth">
                    <div class="value">
                        {{ content.value }}
                        <span v-if="content.statistic === 'Average KDA'">:1</span>
                        <span v-if="content.statistic === 'Winrate'">%</span>
                    </div>
                    <div class="growth" :class="{ positive : positiveGrowth }" v-if="content.growth">
                        <span v-if="positiveGrowth">+ </span>
                        {{ content.growth }}
                        <span v-if="content.statistic === 'Winrate'">%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'StatisticPanel',
        props: {
            content: Object,
            gradient: Boolean,
            loaded: Boolean
        },
        components: {},
        data() {
            return {}
        },
        computed: {
            positiveGrowth() {
                return this.content.growth > 0
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    #StatisticPanel {
        background-color: white;
        box-shadow: 0 5px 20px rgba(52, 133, 255, 0.15), 0 4px 6px rgba(46, 89, 155, 0.4);
        border-radius: 5px;

        &.gradient {
            background: $AllyPinkPurple;
            color: white;

            .panel-wrapper {
                .value-growth {
                    .growth {
                        color: white;

                        &.positive {
                            color: white;
                        }
                    }
                }

                .icon {
                    opacity: 1;
                }
            }
        }

        .panel-wrapper {
            height: 100%;
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 20px;
            text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);

            .scope {
                align-self: flex-end;
                font-weight: bold;
                opacity: 0.9;
            }

            .icon {
                opacity: 0.8;
                filter: drop-shadow(0 4px 4px rgba(0, 0, 0, 0.25));
            }

            .statistic {
                font-weight: bold;
                opacity: 0.9;
            }

            .value-growth {
                display: flex;
                justify-content: space-between;
                align-items: flex-end;

                .value {
                    font-size: 3rem;
                    font-weight: bold;
                    font-family: 'Panton Black', sans-serif;
                }

                .growth {
                    font-weight: bold;
                    padding-bottom: 10px;
                    color: $palette-loss;

                    &.positive {
                        color: $palette-win;
                    }
                }
            }
        }
    }
</style>