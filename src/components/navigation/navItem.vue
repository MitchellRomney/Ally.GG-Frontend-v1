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
            flex-direction: column;
            padding: 20px 0;

            &:hover {
                .icon {
                    opacity: 1;
                }

                .name {
                    opacity: 1;
                }
            }

            &.router-link-active {

                .icon {
                    opacity: 1;
                }

                .name {
                    opacity: 1;
                    font-weight: bold;
                }
            }

            .icon {
                border-radius: 5px;
                opacity: 0.6;
                transition: all 0.22s ease;
                font-size: 1.5rem;
            }

            .name {
                opacity: 0.6;
            }
        }
    }
</style>
