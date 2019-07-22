<template>
    <div id="champion" class="container">
        <div class="header">
            <h1>{{ champId }}</h1>
        </div>
        <div class="wip">
            <h2>This page is currently under development, check back soon!</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'champion',
        title: 'Champion - Ally.GG',
        components: {},
        data() {
            return {}
        },
        computed: {
            champId() {
                return this.$route.params.champion
            }
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #champion {
            min-height: calc(100vh - 65px);
            display: flex;

            .header {
                padding: 20px;
            }

            .wip {
                align-self: center;
                justify-self: center;
                text-align: center;
                margin: auto;
                font-size: 2rem;
                padding: 0 200px;
            }
        }

        &.dark {
            #champion {
                color: white;
            }
        }
    }
</style>