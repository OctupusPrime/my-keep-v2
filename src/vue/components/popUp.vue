<template>
    <div class="popUp">
        <div class="popUpCont"><p class="txt">{{txt}}</p><h1 class="canselBtn" :class="{'active': isCansel}" @click="canselThis">Cansel</h1></div>
        <div class="closeBtn" @click="closeThis"></div>
    </div>
</template>

<script>
    var close;
    module.exports = {
        data: function () {
            return {
                isCansel: true,
                txt: ''
            }
        },          
        props: ['cont'],   
        watch: { 
            'cont'(){
                this.txt = this.cont;
            }
        }, 
        methods: {
            canselThis()
            {
                this.isCansel = false;
                this.$emit('popUpCansel', this.cont);   
            },
            closeThis()
            {
                document.querySelector('.popUp').style.bottom = -document.querySelector('.popUp').offsetHeight + 'px';
                clearTimeout(close);
            },
            show()
            {
                this.isCansel = true;
                document.querySelector('.popUp').style.bottom = 15 + 'px';
                close = setTimeout(function()
                {
                    this.closeThis();
                }.bind(this), 10000);
            }
        },
        mounted: function () {   
            document.querySelector('.popUp').style.bottom = -document.querySelector('.popUp').offsetHeight  - 1 + 'px';     
        }
    }
</script>
