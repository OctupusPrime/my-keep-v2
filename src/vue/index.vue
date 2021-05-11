<template>
    <div class="myKeep">
        <div class="oveflow"><resize-observer @notify="handleResize" /></div>
        <topBar @openSet="openSet" @animatePage="animatePage"></topBar>
        <settings ref="set" :settings="set"
                            @toggleDarkMode="toggleDarkMode"
                            @toggleListMode="toggleListMode"></settings>         
        <div class="load" :class="{'active': isSpinner}">
            <div class="dot"></div>
        </div>      
        <div class="home" :class="{'animate': isAnimate}">
            <router-view ref="cont" :listMode="set.isList" :colorInPalette="colorInPalette"></router-view>
        </div>
    </div>
</template>


<script>
    module.exports = {
        data: function () {
            return {
                isAnimate: false,
                isSpinner: false,
                set: {
                    isDark: false,
                    isList: false
                },
                colorInPalette: [{color:'#ECF0F1', title:'Default', borderColor: '#e0e0e0'} , {color:'#f28b82', title:'Red'      , borderColor: '#f28b82'} , {color:'#fbbc04', title:'Orange'    , borderColor: '#fbbc04'},
                                 {color:'#ffff00', title:'Yellow' , borderColor: '#ffff00'} , {color:'#ccff90', title:'Green'    , borderColor: '#ccff90'} , {color:'#a7ffeb', title:'Blue-green', borderColor: '#a7ffeb'},
                                 {color:'#cbf0f8', title:'Blue'   , borderColor: '#cbf0f8'} , {color:'#aecbfa', title:'Navy-blue', borderColor: '#aecbfa'} , {color:'#d7aefb', title:'Violet'    , borderColor: '#d7aefb'},
                                 {color:'#fdcfe8', title:'Pink'   , borderColor: '#fdcfe8'} , {color:'#e6c9a8', title:'Brown'    , borderColor: '#e6c9a8'} , {color:'#fff'   , title:'White'     , borderColor: '#e8eaed'}]
            }
        },
        components: {
            'topBar': require('./components/topBar.vue'),
            'settings': require('./components/settings.vue')
        },            
        computed: {
            settings: function () {
                return this.$store.getters['getSettings'];
            }
        },    
        methods: {
            openSet()
            {
                this.$refs.set.openSet();
            },
            animatePage()
            {
                document.querySelector('.home').classList.add('active');
                this.isSpinner = true;
                
                setTimeout(function() 
                {
                    this.isAnimate = true;
                    this.isSpinner = false;
                }.bind(this), 1000);

                setTimeout(function() 
                {
                    document.querySelector('.home').classList.remove('active');
                    this.isAnimate = false;
                }.bind(this), 1500);

            },
            darkPalette()
            {
                 this.colorInPalette = [{color:'#202124', title:'Default', borderColor: '#5f6368'} , {color:'#5c2b29', title:'Red'      , borderColor: '#5c2b29'} , {color:'#614a19', title:'Orange'    , borderColor: '#614a19'},
                                        {color:'#635d19', title:'Yellow' , borderColor: '#635d19'} , {color:'#345920', title:'Green'    , borderColor: '#345920'} , {color:'#16504b', title:'Blue-green', borderColor: '#16504b'},
                                        {color:'#2d555e', title:'Blue'   , borderColor: '#2d555e'} , {color:'#1e3a5f', title:'Navy-blue', borderColor: '#1e3a5f'} , {color:'#42275e', title:'Violet'    , borderColor: '#42275e'},
                                        {color:'#5b2245', title:'Pink'   , borderColor: '#5b2245'} , {color:'#442f19', title:'Brown'    , borderColor: '#442f19'} , {color:'#3c3f43', title:'Gray'      , borderColor: '#3c3f43'}];
            },
            brightPalette()
            {
                this.colorInPalette =  [{color:'#ECF0F1', title:'Default', borderColor: '#e0e0e0'} , {color:'#f28b82', title:'Red'      , borderColor: '#f28b82'} , {color:'#fbbc04', title:'Orange'    , borderColor: '#fbbc04'},
                                        {color:'#ffff00', title:'Yellow' , borderColor: '#ffff00'} , {color:'#ccff90', title:'Green'    , borderColor: '#ccff90'} , {color:'#a7ffeb', title:'Blue-green', borderColor: '#a7ffeb'},
                                        {color:'#cbf0f8', title:'Blue'   , borderColor: '#cbf0f8'} , {color:'#aecbfa', title:'Navy-blue', borderColor: '#aecbfa'} , {color:'#d7aefb', title:'Violet'    , borderColor: '#d7aefb'},
                                        {color:'#fdcfe8', title:'Pink'   , borderColor: '#fdcfe8'} , {color:'#e6c9a8', title:'Brown'    , borderColor: '#e6c9a8'} , {color:'#fff'   , title:'White'     , borderColor: '#e8eaed'}];
            },
            toggleListMode(isList)
            {
                this.set.isList = isList;
                this.$store.dispatch('saveSettingLocal', this.set);   
                if (this.set.isList)
                    document.querySelector('.main').style.maxWidth = "600px";
                else
                    document.querySelector('.main').style.maxWidth = "1400px";
            },
            toggleDarkMode(isDark)
            {
                this.set.isDark = isDark;
                this.$store.dispatch('saveSettingLocal', this.set);   
                if (this.set.isDark)
                {
                    document.querySelector('.myKeep').classList.add('dark');
                    this.darkPalette();
                }
                else
                {
                    document.querySelector('.myKeep').classList.remove('dark');
                    this.brightPalette();
                }
            },
            handleResize ({ width, height })
            {
                document.querySelector('.myKeep').style.minHeight = height + 'px';
            },
        },
        mounted: function () {  
            this.$store.dispatch('loadSettings');  
            if (this.settings)
                this.set = this.settings;
            
            if (this.set.isDark)
            {
                document.querySelector('.myKeep').classList.add('dark');
                this.darkPalette();
            }

            this.toggleListMode(this.set.isList);

            document.querySelector('.myKeep').style.minHeight = document.querySelector('.oveflow').offsetHeight + 'px';

            this.animatePage();

            window.addEventListener('scroll', function() {   
                if (window.pageYOffset > 1)
                    document.querySelector('.topBar').classList.add('active');
                else
                    document.querySelector('.topBar').classList.remove('active');   
            });

            window.addEventListener('mousemove', function(e){
                this.$refs.cont.drag(e);
            }.bind(this));

            window.addEventListener('mouseup', function(){
                this.$refs.cont.end();
            }.bind(this));

            window.addEventListener('touchmove', function(e){
                this.$refs.cont.drag(e.touches[0]);
            }.bind(this));

            window.addEventListener('touchend', function(){
                this.$refs.cont.end();
            }.bind(this));
        }
    }
</script>
