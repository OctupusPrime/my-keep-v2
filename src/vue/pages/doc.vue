<template>
    <div class="cont">
        <div class="main">
            <h1 class="title">
                About
                <span>this app</span>
            </h1>
            <div class="about">
                <p>This app makes it easy to keep notes and save them in one place.</p>
                <h2>Functions</h2>
                <p>The main features of the application are:</p>
                <ul>
                    <li>Store notes</li>
                    <li>Swap them in the list</li>
                    <li>Color them</li>
                </ul>
                <h2>Alternatives</h2>
                <p>You can also visit next apps/sites:</p>
                <div class="btnGroup">
                    <a target="_blank" href="https://keep.google.com/u/0/" class="btn"><i class="far fa-lightbulb"></i>Google keep</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    var Axios = require('axios');

    module.exports = {
        data: function () {
            return {
            }
        },
        props: ['colorInPalette', 'listMode'], 
        methods: {
            drag(e)
            {

            },
            end()
            {

            },
        },
        mounted: function () {      
            if (this.listMode)
                document.querySelector('.main').style.maxWidth = "600px";
            else
                document.querySelector('.main').style.maxWidth = "1400px";  
        }
    }
</script>