<template>
    <div class="topBar">
        <div class="wrapper">
            <div class="logo"><h1>.Mykeep</h1></div>
            <div class="mobBtn" @click="openMob"></div>
            <ul class="menuRouter">
                <li class="item" :class="{'active': menuVal == 'Home'}" @click="toggleClass('Home')"><router-link :to="{name: 'home'}">Home</router-link></li>
                <li class="item" :class="{'active': menuVal == 'Trash can'}" @click="toggleClass('Trash can')"><router-link :to="{name: 'trash'}">Trash can</router-link></li>
                <li class="item" :class="{'active': menuVal == 'Doc'}" @click="toggleClass('Doc')"><router-link :to="{name: 'doc'}">Doc</router-link></li>
            </ul>
            <div class="settingsBtn" @click="openSet"></div>
        </div>

        <div class="mobMenu" :class="{'active': isMobOpen}">
            <div class="overlay" @click="closeMob"></div>
                <div class="mobMenuRouts">
                    <ul class="menuRouter">
                        <li class="item" :class="{'active': menuVal == 'Home'}" @click="toggleClass('Home')"><router-link :to="{name: 'home'}">Home</router-link></li>
                        <li class="item" :class="{'active': menuVal == 'Trash can'}" @click="toggleClass('Trash can')"><router-link :to="{name: 'trash'}">Trash can</router-link></li>
                        <li class="item" :class="{'active': menuVal == 'Doc'}" @click="toggleClass('Doc')"><router-link :to="{name: 'doc'}">Doc</router-link></li>
                    </ul>
                <div class="bottomBtn">
                    <div class="cansel" @click="closeMob">Cansel</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                menuVal: 'Home',
                isMobOpen: false
            }
        },            
        methods: {
            toggleClass(value)
            {
                this.menuVal = value;  
                this.$emit('animatePage'); 
            },
            openSet()
            {
                this.$emit('openSet');    
            },
            openMob()
            {
                this.isMobOpen = true;
                document.querySelector('.mobMenu').style.left = 0;
            },
            closeMob(){
                this.isMobOpen = false;
                document.querySelector('.mobMenu').style.left = -document.querySelector('.mobMenu').offsetWidth + 'px';
            },
            toggleClass(value)
            {
                this.menuVal = value;
                this.$emit('animatePage'); 
                this.closeMob();
            }

        },
        mounted: function () { 
            document.querySelector('.mobMenu').style.left = -document.querySelector('.mobMenu').offsetWidth + 'px';
        }
    }
</script>
