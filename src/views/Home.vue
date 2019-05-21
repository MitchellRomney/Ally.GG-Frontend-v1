<template>
    <div class="home">
        <div class="header">
            <h1>
                Welcome back, <span>{{ user.username }}</span>
            </h1>
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
            token() {
                return this.$store.state.token
            }
        },
        methods: {
        },
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    .home {
        padding: 50px;

        .header {
            text-align: center;
            font-family: 'Panton Black', sans-serif;

            h1 {

                span {
                    color: $palette-accent;
                }
            }
        }
    }
</style>
