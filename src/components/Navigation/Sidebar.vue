<template>
    <nav id="nav">
        <div class="nav-back-top" style="height: 130px;"></div>
        <div class="nav-back-bot" style="top: 180px;"></div>
        <div class="nav-selector" style="top: 130px;"></div>
        <router-link :to="{ name: 'home' }">
            <div class="logo-wrapper">
                <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/ally-white-noperiod.png">
            </div>
        </router-link>
        <ul class="nav-items">
            <SidebarItem exact name="Home" link="home" icon="home"/>
            <li class="profile" @click="toggleProfileMenu">
                <transition name="fade">
                    <div class="profile-menu" v-if="openProfileMenu">
                        <ul class="options-dropdown">
                            <router-link to="/settings">
                                <li class="menu-link">
                                    <font-awesome-icon icon="cog"/>
                                    <div class="item-name">
                                        User Settings
                                    </div>
                                </li>
                            </router-link>
                            <router-link to="/admin">
                                <li v-if="user.isSuperuser" class="menu-link">
                                    <font-awesome-icon icon="tools"/>
                                    <div class="item-name">
                                        Admin Panel
                                    </div>
                                </li>
                            </router-link>
                            <li class="divider"></li>
                            <li class="logout menu-link" @click="logout">
                                <font-awesome-icon icon="sign-out-alt"/>
                                <div class="item-name">
                                    Log Out
                                </div>
                            </li>
                        </ul>
                    </div>
                </transition>
                <div class="avatar-wrapper">
                    <div class="avatar">
                        <img class="resp-img" :alt="user.username" :src="user.Profiles[0].avatar">
                    </div>
                </div>
            </li>
        </ul>
    </nav>
</template>

<script>
    import SidebarItem from './Sidebar-Item';

    export default {
        name: 'Sidebar',
        components: {
            SidebarItem
        },
        data() {
            return {
                openProfileMenu: false,
            }
        },
        computed: {
            user() {
                if (Object.keys(this.$store.state.user).length !== 0) {
                    return this.$store.state.user
                } else {
                    return null
                }
            },
            summoners() {
                if (this.user !== null) {
                    return this.user.Profiles[0].Summoners
                } else {
                    return null
                }
            },
        },
        methods: {
            toggleProfileMenu() {
                this.openProfileMenu = !this.openProfileMenu;
            }
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        nav {
            grid-area: nav;
            text-align: left;
            position: fixed;
            height: 100vh;
            width: 130px;
            flex-direction: column;
            align-items: center;
            left: -130px;
            z-index: 2000;
            opacity: 0;

            @media #{$bp-md}{
                opacity: 1;
                left: 0;
                z-index: 950;
            }

            &.open {
                left: 0;
                opacity: 1;
            }

            .nav-back-bot, .nav-back-top {
                width: 130px;
                background: $AllyPink;
                position: fixed;
                border-radius: 0 10px 10px 0;
                // box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.25);
                z-index: -1;
            }

            .nav-back-bot {
                background: $AllyPinkPurple;
                bottom: 0;
            }

            .nav-selector {
                height: 50px;
                width: 5px;
                border-radius: 10px;
                background-color: white;
                position: fixed;
            }

            .logo-wrapper {
                height: 120px;
                display: flex;
                align-items: center;

                .logo {
                    padding: 0 30px;
                }
            }

            .nav-items {
                padding: 10px 0;
                display: flex;
                flex-direction: column;
                height: calc(100vh - 130px);
                align-items: center;

                .profile {
                    margin-top: auto;
                    position: relative;
                    cursor: pointer;

                    .profile-menu {
                        position: absolute;
                        bottom: 110%;
                        border-radius: 5px;
                        background-color: white;
                        width: 200px;
                        box-shadow: $shadow;
                        border: 1px solid #DFE3E8;

                        .options-dropdown {
                            border-radius: 5px;
                            background-color: white;
                            z-index: 1050;

                            .divider {
                                border-top: 1px solid #DFE3E8;
                                margin: 0 10px;
                            }

                            .menu-link {
                                cursor: pointer;
                                display: grid;
                                grid-template: auto / 30px auto auto;
                                font-weight: bold;
                                font-size: 0.9rem;
                                padding: 15px 10px;

                                svg {
                                    opacity: 0.6;
                                    display: flex;
                                    align-self: center;
                                    justify-self: center;
                                }

                                .item-name {
                                    display: flex;
                                    justify-self: baseline;
                                    width: 100%;

                                    span {
                                        margin: auto auto auto 0;
                                    }
                                }

                                &.logout {
                                    border-radius: 0 0 5px 5px;
                                }

                                &:hover {
                                    background-color: $palette-accent;
                                    color: white;
                                }
                            }

                            .category {
                                display: flex;
                                cursor: initial;
                                padding: 10px 10px 5px 10px;
                                opacity: 0.6;

                                &:hover {
                                    background-color: initial;
                                    color: initial;
                                }
                            }
                        }
                    }

                    .avatar-wrapper {
                        width: 60px;
                        height: 60px;
                        border-radius: 50%;
                        overflow: hidden;
                        box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
                    }
                }
            }
        }
    }
</style>
