<template>
    <li class="nav-item">
        <router-link :to=link class="nav-link" :exact="exact">
            <div class="icon">
                <font-awesome-icon :icon=icon />
            </div>
            <div class="name">
                {{ name }}
            </div>
        </router-link>
    </li>
</template>

<script>
    export default {
        name: 'NavItem',
        props: {
            name: String,
            link: String,
            icon: String,
            exact: Boolean
        },
    }
</script>

<style scoped lang="scss">
    @import "../../styles/_variables.scss";

    .nav-item {
        border-radius: 5px;
        margin: 5px 0;
        font-weight: 500;

        .nav-link {
            display: flex;
            align-items: center;
            transition: all 0.22s ease;

            &:hover {
                background-color: #F6F9FD;

                .icon {
                    border-left: 5px solid $palette-accent;
                    color: $palette-accent;
                    opacity: 1;
                }
            }

            &.router-link-active {
                background-color: #F6F9FD;

                .icon {
                    border-left: 5px solid $palette-accent;
                    color: $palette-accent;
                    opacity: 1;
                }

                .name {
                    opacity: 1;
                    font-weight: bold;
                }
            }

            .icon {
                padding: 15px;
                border-radius: 5px;
                border-left: 5px solid white;
                opacity: 0.6;
                transition: all 0.22s ease;
            }

            .name {
                opacity: 0.6;
            }
        }
    }
</style>
