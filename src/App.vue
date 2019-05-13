<template>
    <div id="ally-gg">
        <Navbar />
        <TopNav />
        <router-view/>
    </div>
</template>

<script>
    import Navbar from './components/navigation/navbar';
    import TopNav from './components/navigation/topNav';

    export default {
        name: 'app',
        components: {
            Navbar,
            TopNav
        }
    }
</script>

<style lang="scss">
    #ally-gg {
        font-family: 'Roboto', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        width: 100vw;
        margin: 0;
        overflow-x: hidden;
        color: $palette-primary;
        display: grid;
        grid-template: 65px auto / 275px auto;
        grid-template-areas: "nav tnav" "nav main";
        min-height: 100vh;
        background-color: $palette-secondary;
    }
</style>
