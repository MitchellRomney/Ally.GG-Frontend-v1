<template>
    <div id="login">
        <div class="content">
            <router-view></router-view>
            <footer>
                <ul>
                    <li>
                        <a href="#">Support</a>
                    </li>
                    <li>
                        <a href="#">Privacy</a>
                    </li>
                    <li>
                        <a href="#">Legal</a>
                    </li>
                </ul>
            </footer>
        </div>
        <div class="hero">
            <div class="image">
                <video autoplay muted loop id="neeko-hero">
                    <source src="../assets/images/neeko-hero-loop.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</template>

<script>
    import PulseLoader from 'vue-spinner/src/PulseLoader.vue';
    import Login from '../components/login/login.vue';
    import Register from '../components/login/register.vue';

    export default {
        name: 'login',
        title: 'Login - Ally.GG',
        components: {
            PulseLoader,
            Login,
            Register,
        },
        data() {
            return {
                // State
                login: true,
                register: false,

                // Loading Flags
                loading: false,

                // Error Handling
                isError: false,
                errorMessage: '',
            }
        },
        methods: {}
    }
</script>

<style scoped lang="scss">
    #login {
        max-height: 100vh;
        display: grid;
        grid-template: auto / 40vw 60vw;
        grid-template-areas: 'content content';
        overflow: hidden;
        @media #{$bp-lg}{
            grid-template-areas: 'content hero';
        }

        .content {
            grid-area: content;
            background-color: white;
            z-index: 40;
            position: relative;
            display: grid;
            grid-template: auto 50px / auto;
            grid-template-areas: 'content' 'footer';
            height: 100vh;

            footer {
                grid-area: footer;
                width: 100%;
                background-color: white;
                z-index: 20;
                display: flex;
                justify-content: center;
                align-items: center;

                ul {
                    display: flex;
                    width: 100%;
                    justify-content: space-evenly;

                    li {
                        a {
                            color: $palette-primary;
                        }
                    }
                }
            }
        }

        .hero {
            grid-area: hero;
            height: 100vh;

            .image {
                height: 100vh;
                margin-left: -30%;

                video {
                    height: 100%;
                }
            }
        }
    }
</style>
