<template>
    <div id="settings">
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

                .page-header {
                    margin: 2rem 0;
                }

                .settings-nav {
                    display: flex;
                    border-bottom: 1px solid $palette-border;

                    .nav-item {
                        padding: 10px;
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