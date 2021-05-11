<template>
    <div class="modalContainer" :class="{'active': isOpen}">
        <div class="overlay" @click="closeMob"></div>
        <div class="modal">
            <p>{{cont}}</p>
            <div class="cansel" @click="closeMob">Cansel</div>
            <div class="init" @click="init">Delete</div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                isOpen: false
            }
        },        
        props: ['cont'],     
        methods: {
            openMob(){
                this.isOpen = true;
            },
            closeMob(){
                this.isOpen = false;
            },
            init()
            {
                this.$emit('initThis', this.cont);
                this.closeMob();
            }
        },
        mounted: function () { 
        }
    }
</script>
