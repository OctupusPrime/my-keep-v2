<template>
    <div class="deleatedBlock" :data-deleated="item.data" :style="{'background-color':  paletteColor[item.color].color, 'border-color': paletteColor[item.color].borderColor, top: item.y + 'px', left: item.x + 'px'}">
    <div class="selectNone"></div>
    <textareaAutosize class="mainTxt"
                v-model="txt" 
                :min-height="1"
                :max-height="410" readonly/>
        <div class="deleteBtn" @click="deleateThis(item.data)"></div>
        <div class="recoveryBtn" @click="recoverThis(item.data)"></div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
            }
        },
        props: ['item', 'txt', 'paletteColor'],   
        methods: {
            deleateThis(pos)
            {
                this.$emit('deleateThis', pos);    
            },
            recoverThis(pos)
            {
                this.$emit('recoverThis', pos);
                this.$emit('txtForDelPopUp', 'Note restored');       
            }
        },
        mounted: function () {    
        }
    }
</script>
