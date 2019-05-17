<template>
    <div id="top-nav">
        <div class="profile">
            <div class="notifications">
                <font-awesome-icon icon="bell"/>
            </div>
            <div class="avatar">
                <img class="resp-img" src="../../assets/images/placeholder.png" :alt="user.username">
            </div>
            <div class="user">
                <a :href="'/profiles/' + user.username"><h4>{{ user.username }}</h4></a>
                <a href="#"><span><i class="fas fa-circle"></i>Online</span></a>
            </div>
            <div class="acc-options">
                <a href="#" @click="toggleMenu">
                    <font-awesome-icon icon="caret-down"/>
                </a>
                <ul v-if="open_menu" class="options-dropdown">
                    <li><a href="/logout">Logout</a></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'TopNav',
        components: {},
        data() {
            return {
                open_menu: false,
            }
        },
        methods: {
            toggleMenu() {
                this.open_menu = !this.open_menu;
            }
        },
        computed: {
            user() {
                return this.$store.state.user
            }
        },
    }
</script>

<style scoped lang="scss">
    #top-nav {
        background-color: white;
        grid-area: tnav;
        border-bottom: 1px solid #DFE3E8;
        display: flex;
        justify-content: flex-end;
        padding: 0 40px;

        .logo {
            grid-area: logo;
            display: flex;
            padding: 25px;

            img {
                align-self: center;
                margin-left: 0;
            }
        }

        .profile {
            grid-area: profile;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            .notifications {
                opacity: 0.4;
                margin-right: 20px;
                font-size: 1.2rem;
            }

            .avatar {
                height: 40px;
                width: 40px;
                border-radius: 50%;
                overflow: hidden;
                margin-right: 10px;
            }

            .user {
                margin-right: 15px;

                span {
                    color: grey;
                    font-weight: 600;
                    font-size: 0.8rem;
                }

                i {
                    font-size: 0.8rem;
                    color: limegreen;
                    margin-right: 5px;
                    opacity: 0.8;
                }
            }

            .acc-options {
                position: relative;

                a {
                    color: $palette-primary;
                }

                .options-dropdown {
                    position: absolute;
                    top: 100%;
                    right: 0;
                    width: 100px;
                    padding: 10px;
                    border-radius: 10px 2px 10px 10px;
                    background-color: white;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
                    transition: all 0.3s ease-in-out 0s, visibility 0s linear 0.3s, z-index 0s linear 0.01s;
                    text-align: center;
                }

                i {
                    font-size: 1.4rem;
                }
            }
        }
    }
</style>
