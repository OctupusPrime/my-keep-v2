<template>
    <div class="addBlock" :style="{'background-color':  paletteColor[item.color].color, 'border-color': paletteColor[item.color].borderColor}">
        <resize-observer @notify="handleResizeBlock" />
        <textareaAutosize class="mainTxt" 
                    v-model="textValue" 
                    :min-height="1"
                    :max-height="400"
                    placeholder="Take a note..."/>
        <div class="palette">
            <div class="paletteBtn"></div>
            <div class="items">
                <div v-for="(paletteItem, index) in paletteColor" class="color" 
                                    :class="{'active': item.color == index}" 
                                    :style="{'background-color': paletteItem.color, 'border-color': paletteItem.borderColor}" 
                                    :data-title="paletteItem.title" 
                                    @mouseover="addHover(index)" 
                                    @mouseout="removeHover(index)" 
                                    @click="comitAddColor(index)"></div>
            </div>    
        </div>
        <div class="addBtn" @click="comitAddBlock(textValue, item.color)">
            <div class="plus"></div>
            <p>Add</p>
        </div>
    </div>
</template>

<script>
    module.exports = {
        data: function () {
            return {
                textValue: '',
                borderColor: ''
            }
        },           
        props: ['item', 'paletteColor'],     
        methods: {
            comitAddColor(value)
            {
                this.$emit('comitAddColor', value);
            },
            addHover(i)
            {
                this.borderColor = this.paletteColor[i].borderColor;
                if (document.querySelector('.myKeep').classList.contains("dark"))
                    this.paletteColor[i].borderColor = '#fff';
                else
                    this.paletteColor[i].borderColor = '#000';
            },
            removeHover(i)
            {
                this.paletteColor[i].borderColor = this.borderColor;
            },
            comitAddBlock(txt, color)
            {
                if (txt.length > 0)
                {
                    this.$emit('comitAddBlock', txt, color);
                    this.textValue = '';
                }
            },
            handleResizeBlock({widht, height})
            {
                this.$emit('relocateAllBlocks', height); 
            }
        },
        mounted: function () {   
        }
    }
</script>
