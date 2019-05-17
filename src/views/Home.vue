<template>
    <div class="home">
        <h1>Welcome to Ally.GG</h1>
        <h2>User: {{ user.username }}</h2>
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
