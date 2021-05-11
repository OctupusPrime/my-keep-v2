<template>
    <div class="block" :data-position="item.data" :style="{'background-color':  paletteColor[item.color].color, 'border-color': paletteColor[item.color].borderColor, top: item.y + 'px', left: item.x + 'px'}">
    <resize-observer @notify="handleResizeBlock" />
    <textareaAutosize class="mainTxt" 
                v-model="textValue" 
                :min-height="1"
                :max-height="410"
                @input="comitInput(textValue, item.data)"/>
    <div class="moveBlock"></div>
    <div class="palette">
        <div class="paletteBtn"></div>
        <div class="items">
            <div v-for="(paletteItem, index) in paletteColor" class="color" 
                            :class="{'active': item.color == index}" 
                            :style="{'background-color': paletteItem.color, 'border-color': paletteItem.borderColor}" 
                            :data-title="paletteItem.title" 
                            @mouseover="addHover(index)" 
                            @mouseout="removeHover(index)" 
                            @click="comitColor(index, item.data)"></div>
        </div>    
    </div>
        <div class="deleteBtn" @click="deleateBlock(item.data)"></div>
        <div class="cloneBtn" @click="cloneBlock(textValue, item.color)"></div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                textValue: '',
                borderColor: '',
                isHide: false,
                isActive: false
            }
        },   
        props: ['item', 'txt', 'paletteColor'],             
        watch: { 
            'txt'(){
                this.textValue = this.txt;
            }
        },
        methods: {
            handleResizeBlock({widht, height})
            {
                this.$emit('relocateBlock');  
            },
            deleateBlock(pos)
            {
                this.$emit('deleateBlock', pos);   
                this.$emit('txtForPopUp', 'Note moved to trash can');
            },
            cloneBlock(txt, color)
            {
               this.$emit('cloneBlock', txt, color);  
               this.$emit('txtForPopUp', 'Note created');   
            },
            comitInput(value, pos)
            {
                if (value.length > 0)
                    this.$emit('comitInput', value, pos);    
            },
            comitColor(index, pos)
            {
                this.$emit('comitColor', index, pos); 
            },
            addHover(i)
            {
                this.borderColor = this.paletteColor[i].borderColor
                if (document.querySelector('.myKeep').classList.contains("dark"))
                    this.paletteColor[i].borderColor = '#fff';
                else
                    this.paletteColor[i].borderColor = '#000';
            },
            removeHover(i)
            {
                this.paletteColor[i].borderColor = this.borderColor;
            },
        },
        mounted: function () {   
            setTimeout(function(){
                this.textValue = this.txt; 
            }.bind(this), 10);
        }
    }
</script>
