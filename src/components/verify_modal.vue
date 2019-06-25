<template>
    <div id="verify-modal">
        <div class="modal-wrapper">
            <div class="modal-container">

                <div class="modal-header">
                    <h2 class="header">
                        Connect your Summoner to your Ally.GG account
                    </h2>
                    <button class="close" @click="$emit('close')">
                        X
                    </button>
                </div>

                <div class="modal-body">
                    <div class="body">
                        Log into your Summoner account in the League client, and head over to Verification in
                        settings. Enter and save the code provided below in the League client, and then click
                        verify!
                    </div>
                    <div class="code">
                        Verification code: {{ code }}
                    </div>
                </div>

                <div class="modal-footer">
                    <slot name="footer">
                        <button class="verify">VERIFY</button>
                    </slot>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'verify',
        title: 'Verify - Ally.GG',
        components: {},
        data() {
            return {
                code: '',
            }
        },
    }
</script>

<style scoped lang="scss">

    #verify-modal {
        position: fixed;
        z-index: 2000;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background-color: rgba(0, 0, 0, .5);
        display: flex;
        transition: opacity .3s ease;

        .modal-wrapper {
            display: flex;

            .modal-container {
                margin: auto 20px;
                background-color: #fff;
                box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
                transition: all .3s ease;
                border: 3px solid #f4f4f4;
                border-radius: 20px;
                position: relative;
                z-index: 2100;

                @media #{$bp-md}{
                    width: 600px;
                    margin: 0 auto;
                }

                .modal-header {
                    padding: 20px;
                    text-align: center;
                    border-bottom: 3px solid #f4f4f4;

                    .header {
                        padding-right: 20px;
                    }

                    .close {
                        position: absolute;
                        right: 10px;
                        top: 10px;
                        background-color: transparent;
                        color: $palette-primary;
                        opacity: 0.8;
                    }
                }

                .modal-body {
                    padding: 20px;
                }

                .modal-footer {
                    padding: 20px;
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-end;
                    border-top: 3px solid #f4f4f4;

                    .verify {
                        padding: 15px 30px;
                    }
                }
            }
        }
    }
</style>