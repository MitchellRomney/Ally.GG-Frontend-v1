<template>
    <nav id="nav">
        <div class="logo-wrapper">
            <img class="logo resp-img" alt="Ally.GG Logo" src="../../assets/logo.png">
        </div>
        <ul class="nav-items">
            <NavItem exact name="Home" link="/" icon="home"/>
            <NavItem name="Summoners" link="/summoners" icon="users" />
            <NavItem name="Leaderboard" link="/leaderboard" icon="trophy"/>
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
        @media #{$bp-lg}{
            display: block;
        }

        .logo-wrapper {
            height: 65px;

            .logo {
                padding: 10px 40px;
            }
        }

        .nav-items {
            padding: 10px;
        }
    }
</style>
