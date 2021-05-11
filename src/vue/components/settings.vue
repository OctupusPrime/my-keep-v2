<template>
    <div class="settings" :class="{'active': isOpen}">
        <div class="overlay" @click="closeSet"></div>
        <div class="mainSet">
            <h1>Settings</h1>
            <ul class="menu">
                <li class="item"><p>Dark theme</p><div class="switch" @click="changeTheme" :class="{'active': set.isDark}"><div class="dot"></div></div></li>
                <li class="item"><p>List mode</p><div class="switch" @click="listMode"     :class="{'active': set.isList}"><div class="dot"></div></div></li>
            </ul>
            <div class="bottomBtn">
                <div class="cansel" @click="closeSet">Cansel</div>
            </div>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                isOpen: false,
                set: {
                    isDark: false,
                    isList: false
                }

            }
        },   
        props: ['settings'],                
        methods: {
            openSet(){
                this.isOpen = true;
                document.querySelector('.mainSet').style.right = 0;
            },
            closeSet(){
                this.isOpen = false;
                document.querySelector('.mainSet').style.right = -document.querySelector('.mainSet').offsetWidth + 'px';
            },
            changeTheme(){
                this.set.isDark = !this.set.isDark;
                this.$emit('toggleDarkMode', this.set.isDark);      
            },
            listMode()
            {
                this.set.isList = !this.set.isList;
                this.$emit('toggleListMode', this.set.isList);      
            }
        },
        mounted: function () {   
            setTimeout(function() 
            {
                this.set = this.settings;
            }.bind(this), 10);
            
            document.querySelector('.mainSet').style.right = -document.querySelector('.mainSet').offsetWidth + 'px';
        }
    }
</script>
