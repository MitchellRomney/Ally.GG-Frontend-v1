<template>
    <div id="settings">
        <div class="page-content container">
            <ul class="settings-nav">
                <router-link to="account">
                    <li class="nav-item">Account</li>
                </router-link>
                <router-link to="privacy">
                    <li class="nav-item">Privacy & Security</li>
                </router-link>
                <router-link to="premium">
                    <li class="nav-item">Premium</li>
                </router-link>
            </ul>
            <div class="view-wrapper">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'settings',
        title: 'Settings - Ally.GG',
        data() {
            return {}
        },
        components: {},
        props: {},
        watch: {},
        methods: {}
    }
</script>
<style scoped lang="scss">
    #ally-gg {
        #settings {
            .page-content {
                max-width: 1280px;

                .settings-nav {
                    display: flex;
                    border-bottom: 1px solid $palette-border;

                    .nav-item {
                        padding: 10px;
                    }
                }

                .view-wrapper {
                    #premium, #privacy, #account {
                        padding: 10px;

                        .header {
                            margin: 1.5rem 0;
                        }
                    }
                }
            }
        }

        &.dark {
            #settings {
                .page-content {
                    .settings-nav {
                        border-bottom: 1px solid $palette-dark-border;
                    }
                }
            }
        }
    }
</style>