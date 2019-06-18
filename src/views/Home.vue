<template>
    <div class="home">
        <div class="header">
            <h1>
                Welcome back, <span>{{ user.username }}</span>
            </h1>
        </div>
        <div class="content">
            <div id="verify" class="panel" v-if="summoners.length === 0">
                You have no connected users.
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'home',
        title: 'Home - Ally.GG',
        components: {},
        computed: {
            user() {
                return this.$store.state.user
            },
            summoners() {
                return this.user.Profiles[0].Summoners
            }
        },
        methods: {},
    }
</script>

<style scoped lang="scss">
    .home {
        background-color: #F6F7FB;
        padding: 50px;
        min-height: calc(100vh - 65px);
        border-top: 1px solid #DFE3E8;

        .header {
            text-align: center;
            font-family: 'Panton Black', sans-serif;

            h1 {

                span {
                    color: $palette-accent;
                }
            }
        }

        .content {
            display: grid;
            grid-template: 300px / repeat(3, 1fr);
            grid-auto-columns: 300px;

            .panel {
                background-color: white;
                border: 3px solid #f4f4f4;
                border-radius: 20px;
                padding: 20px;
            }
        }
    }
</style>
