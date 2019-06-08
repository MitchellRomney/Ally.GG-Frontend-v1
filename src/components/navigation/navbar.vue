<template>
    <nav id="nav">
        <div class="logo-wrapper">
            <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/images/icon.png">
        </div>
        <ul class="nav-items">
            <NavItem exact name="Home" link="/" icon="home"/>
            <NavItem name="Summoners" link="/summoners" icon="users"/>
            <NavItem name="Improve" link="/improve" icon="trophy"/>
        </ul>
    </nav>
</template>

<script>
    import NavItem from './navItem';

    export default {
        name: 'Navbar',
        components: {
            NavItem
        },
    }
</script>

<style scoped lang="scss">
    nav {
        grid-area: nav;
        border-right: 1px solid #DFE3E8;
        text-align: left;
        background-color: white;
        display: none;
        position: fixed;
        height: 100%;
        width: 130px;
        z-index: 1000;

        @media #{$bp-lg}{
            display: block;
        }

        .logo-wrapper {
            .logo {
                padding: 20px 30px 0 30px;
            }
        }

        .nav-items {
            padding: 10px;
        }
    }
</style>
