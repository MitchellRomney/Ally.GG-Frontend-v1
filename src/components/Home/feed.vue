<template>
    <div id="feed" class="panel">
        <div class="coming-soon">
            <span>Friends Feed</span>
            Coming Soon.
        </div>
    </div>
</template>

<script>
    export default {
        name: 'feed',
        components: {}
    }
</script>

<style scoped lang="scss">
    #ally-gg {
        #feed {
            grid-area: feed;

            .coming-soon {
                display: flex;
                flex-direction: column;
                height: 100%;
                align-items: center;
                justify-content: center;
                font-size: 1.5rem;

                span {
                    background-color: $palette-accent;
                    color: white;
                    font-weight: bold;
                    font-size: 2rem;
                    font-family: 'Panton Black', sans-serif;
                }
            }
        }
    }
</style>