<template>
    <div class="profile">
        <div class="header">
            <h1>
                {{ user.username }}
            </h1>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'user_profile',
        title: 'Profile - Ally.GG',
        components: {},
        data() {
            return {
                user: {},
                profile: {},
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            },
            token() {
                return this.$store.state.token
            }
        },
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">

</style>
