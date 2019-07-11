<template>
    <li class="nav-item" :class="name">
        <router-link :to=link class="nav-link" :exact="exact" v-if="link !== 'None'">
            <div class="icon">
                <font-awesome-icon :icon=icon />
            </div>
            <div class="name">
                {{ name }}
            </div>
        </router-link>
        <div class="disabled"
             v-else
             v-tippy="{ arrow : true,  animation : 'perspective', placement: 'right'}"
             :title="message">
            <div class="icon">
                <font-awesome-icon :icon=icon />
            </div>
            <div class="name">
                {{ name }}
            </div>
        </div>
    </li>
</template>

<script>
    export default {
        name: 'NavItem',
        props: {
            name: String,
            link: String,
            icon: String,
            exact: Boolean,
            message: String,
        },
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        .nav-item {
            border-radius: 5px;
            margin: 5px 0;
            font-weight: 500;

            .nav-link, .disabled {
                display: flex;
                align-items: center;
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
                    font-size: 1.5rem;
                }

                .name {
                    opacity: 0.6;
                }
            }

            .disabled {
                position: relative;

                &:hover {

                    .icon {
                        opacity: 0.3;
                    }

                    .name {
                        opacity: 0.3;
                    }
                }

                .icon {
                    opacity: 0.3;
                }

                .name {
                    opacity: 0.3;
                }
            }

            &.Premium {
                margin-top: auto;
            }
        }

        &.dark {
            .nav-item {
                color: white;
            }
        }
    }
</style>
