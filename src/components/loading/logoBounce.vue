<template>
    <div id="logo_bounce">
        <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/icon.png">
    </div>
</template>

<script>
    export default {
        name: 'logo_bounce',
        components: {},
        computed: {},
        methods: {},
        mounted() {
        }
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #logo_bounce {
            position: absolute;
            height: 100%;
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            background-color: white;
            max-height: calc(100vh - 65px);

            .logo {
                height: 100px;
                animation-direction: normal;
                animation-play-state: running;
                animation-duration: 1s;
                transform-origin: 50px 50px;
                -webkit-animation: bounce-anim 1s infinite;
                animation: bounce-anim 1s infinite
            }
        }

        &.dark {
            #logo_bounce {
                background-color: $palette-dark-primary;
            }
        }
    }
</style>