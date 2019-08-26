<template>
    <li class="nav-item" :class="name">
        <div class="nav-back-pink"></div>
        <router-link :to="{ name: link }" class="nav-link" :exact="exact" v-if="link !== 'None'">
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
        name: 'SidebarItem',
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
            font-weight: 500;
            position: relative;
            width: 100%;

            .nav-back-pink {
                z-index: -1;
                background-color: $AllyPink;
                width: 50%;
                height: 100%;
                position: absolute;
            }

            .nav-link, .disabled {
                display: flex;
                align-items: center;
                height: 50px;
                padding: 5px 0 5px 10px;
                background-color: $AllyBackground;
                margin-left: 20px;
                border-radius: 10px;

                &:hover {
                    .icon {
                        opacity: 1;
                    }

                    .name {
                        opacity: 1;
                    }
                }

                &.router-link-active {
                    color: $AllyPink;

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
                    display: flex;
                    align-items: center;
                    margin-right: 10px;
                }

                .name {
                    opacity: 0.6;
                    margin-top: 5px;
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
