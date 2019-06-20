<template>
    <li class="nav-item">
        <router-link :to=link class="nav-link" :exact="exact" v-if="link !== 'None'">
            <div class="icon">
                <font-awesome-icon :icon=icon />
            </div>
            <div class="name">
                {{ name }}
            </div>
        </router-link>
        <div class="disabled" v-else>
            <div class="icon">
                <font-awesome-icon :icon=icon />
            </div>
            <div class="name">
                {{ name }}
            </div>
            <div class="tooltip">
                {{ message }}
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
    @import "../../styles/_variables.scss";

    .nav-item {
        border-radius: 5px;
        margin: 5px 0;
        font-weight: 500;

        .nav-link, .disabled {
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

        .disabled {
            position: relative;

            .tooltip {
                position: absolute;
                background-color: rgba(0, 0, 0, 0.2);
                opacity: 0;
                padding: 10px;
                width: 200px;
                left: -100%;
                border-radius: 10px;
                box-shadow: $shadow;
                transition: all 0.5s ease;
                align-content: center;
                top: 50%;
                margin-top: -40px;
            }

            &:hover {
                .tooltip {
                    display: flex;
                    left: 130%;
                    opacity: 0.8;
                }

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
    }
</style>
