<template>
    <div class="cont">
        <div class="clearBtn" @click="deleteAll">Clear all</div>
        <div class="backGroundClear"> 
            <div class="img"></div>
            <p>There is nothing in the basket.</p>
        </div>
        <modalCont ref="modal" :cont="modalTxt" @initThis="initThis"></modalCont>
        <popUp :cont="popUpTxt" ref="popUp" @popUpCansel="popUpCansel"></popUp>
        <div class="main">
        <resize-observer @notify="handleResize" />
            <deleatedBlock v-for="item in deleateItems"
                                :item="item"
                                :txt="item.txt" 
                                :paletteColor="colorInPalette"
                                :class="{ 'listMode': listMode}"
                                @deleateThis="deleateClick"
                                @recoverThis="recoverThis"
                                @txtForDelPopUp="txtForDelPopUp">
                                </deleatedBlock>
        </div> 
    </div>
</template>

<script>
    var colum; 
    var storage;
    var index = 0;
    var margin = 25;
    var columnWidth = 0;
    var offset = 0;
    
    var div;
    var secondDiv;
    var cout;
    var deleateItem;

    module.exports = {
        data: function () {
            return {
                modalTxt: '',
                txtPopUp: '',
                pos: '',
                items: [],
                deleateItems: []
            }
        },
        props: ['colorInPalette', 'listMode'], 
        components: {
            'deleatedBlock': require('../components/deleatedBlock.vue'),
            'popUp': require('../components/popUp.vue'),
            'modalCont': require('../components/modalCont.vue')
        },    
        computed: {
            storeItems: function () {
                return this.$store.getters['getBlocks'];
            },
            deleteBlock: function () {
                return this.$store.getters['getDeleteBlock'];
            }   
        }, 
        methods: {
            deleteAll()
            {
                this.modalTxt = 'Empty trash? Notes will be deleted permanently.';
                this.$refs.modal.openMob();
            },
            deleateClick(pos)
            {
                this.modalTxt = 'Delete a note permanently?';
                this.$refs.modal.openMob();
                this.pos = pos;
            },
            initThis(cont)
            {
                switch (cont) {
                    case 'Empty trash? Notes will be deleted permanently.':
                        this.deleateItems = [];
                        document.querySelector('.clearBtn').classList.remove('active');
                        document.querySelector('.backGroundClear').classList.add('active');
                        this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems); 
                        break;
                    case 'Delete a note permanently?':
                        this.deleateThis(this.pos);
                        break;
                }
            },
            add(txtValue, colorValue)
            {       
                var data = {
                    x: 0,
                    y: offset,
                    data: this.deleateItems.length,
                    txt: txtValue,
                    color: colorValue
                };
                $('.deleatedBlock').addClass('active');
                this.deleateItems.unshift(data);
                setTimeout(function()
                { 
                    $('.deleatedBlock').removeClass('active');
                    this.position();
                }.bind(this), 1);

                document.querySelector('.backGroundClear').classList.remove('active');
                document.querySelector('.clearBtn').classList.add('active');

                this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems);   
            },
            drag(e)
            {

            },
            end()
            {

            },
            getMinIndex(array) {
                return array.indexOf(Math.min.apply(null, array));
            },
            ghosting(firstPos, secondPos, arrayChange)
            {
                var txt = this.deleateItems[firstPos].txt;
                var color = this.deleateItems[firstPos].color;
                this.deleateItems[firstPos].txt = this.deleateItems[arrayChange].txt;
                this.deleateItems[firstPos].color = this.deleateItems[arrayChange].color;
              
                secondDiv = document.querySelector('[data-deleated="' + (secondPos) + '"]');

                div.style.top = secondDiv.style.top;
                div.style.left = secondDiv.style.left;

                setTimeout(function()
                { 
                    div.classList.remove("hidden");
                }, 20);
                
                setTimeout(function(){ 
                    secondDiv.classList.add("hidden");
                    this.deleateItems[arrayChange].txt = txt;
                    this.deleateItems[arrayChange].color = color;
                }.bind(this), 50);

                setTimeout(function()
                { 
                    div.style.top = this.deleateItems[firstPos].y + 'px';
                    div.style.left = this.deleateItems[firstPos].x + 'px';
                }.bind(this), 20);

                setTimeout(function()
                { 
                    div = document.querySelector('[data-deleated="' + (secondPos) + '"]');
                }, 100);
            },
            position()
            {
                storage  = new Array(colum).fill(offset);
                for (var i = 0; i < this.deleateItems.length; i++)
                {
                    document.querySelector('[data-deleated="' + (this.deleateItems[i].data) + '"]').style.width = (columnWidth) + 'px';
                    var thisOffset = document.querySelector('[data-deleated="' + (this.deleateItems[i].data) + '"]').offsetHeight;

                    index = this.getMinIndex(storage);
                    this.deleateItems[i].x = (index * columnWidth) + (index * margin);
                    this.deleateItems[i].y = storage[index];

                    storage[index] += thisOffset + margin;    
                    index = 0;   
                }
                document.querySelector('.main').style.height = (Math.max.apply(null, storage) - margin + 15) + 'px';
                this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems); 
            },
            handleResize ({ width, height })
            {
                colum = Math.trunc(width/ 300) - 1;
                if (colum < 1)
                    colum = 1;
                columnWidth = (width - ((colum - 1) * margin)) / colum;
                
                this.position();
            },
            deleateThis(pos)
            {
                div = document.querySelector('[data-deleated="' + (pos) + '"]');
                div.classList.add('hidden');
                var x = Math.abs(pos - this.deleateItems.length) - 1;
                cout = this.deleateItems.length - x - 1;
                var i = 0;
                 
                if (cout > 0 && this.deleateItems.length > 1)
                {
                    setTimeout(function() 
                    {  
                        this.myLoop(i, x, pos, cout); 
                    }.bind(this), 150);  
                }
                setTimeout(function() 
                { 
                    deleateItem = this.deleateItems.splice(this.deleateItems.length - 1, 1);
                    
                    if (this.deleateItems.length < 1)
                        document.querySelector('.backGroundClear').classList.add('active');
                        document.querySelector('.clearBtn').classList.remove('active');

                    for (var x = 0;x < this.deleateItems.length; x++)
                        this.deleateItems[x].data = this.deleateItems.length - x - 1;

                    this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems); 
                }.bind(this), 400 + cout * 125);
                
            },
            myLoop(i, x, pos, cout)
            {
                setTimeout(function() 
                {  
                    this.ghosting(x, pos - 1, x + 1);
                    x++;
                    pos--;
                    i++;                
                    if (i < cout) {         
                        this.myLoop(i, x, pos, cout);             
                    }                       
                }.bind(this), 125);  
            },
            recoverThis(pos)
            {
                var i = Math.abs(pos - this.deleateItems.length) - 1;
                var data = {
                    x: 0,
                    y: 0,
                    txt: this.deleateItems[i].txt,
                    color: this.deleateItems[i].color,
                    data: this.items.length
                };
                this.items.unshift(data);

                setTimeout(function() 
                {  
                    this.deleateThis(pos);
                }.bind(this), 100);  

                this.$store.dispatch('saveBlockList', this.items);   
            },
            txtForDelPopUp(value)
            {
                this.popUpTxt = value;
                switch (value) {
                    case 'Note restored':
                        setTimeout(function() 
                        { 
                            this.$refs.popUp.show();
                        }.bind(this), 400 + cout * 100);
                        break;
                }
            },
            popUpCansel(value)
            {
                switch (value) {
                    case 'Note restored':
                        this.popUpTxt = 'Action canceled';
                        console.log(deleateItem[0].txt);
                        this.add(deleateItem[0].txt, deleateItem[0].color);
                        this.items.splice(0, 1);
                        this.$store.dispatch('saveBlockList', this.items);   
                        break;
                }
            },
            hidePopUp()
            {
                this.$refs.popUp.closeThis();
            }
        },
        mounted: function () {  
            this.$store.dispatch('loadBlocks');  
            if (this.storeItems)
                this.items = this.storeItems;
            this.$store.dispatch('loadDeleate');  
            if (this.deleteBlock)
            {
                this.deleateItems = this.deleteBlock;
                if (this.deleateItems.length < 1)
                    document.querySelector('.backGroundClear').classList.add('active');
                else
                    document.querySelector('.clearBtn').classList.add('active');

                 colum = Math.trunc(document.querySelector('.main').offsetWidth/ 300) - 1;
                if (colum < 1)
                    colum = 1;
                columnWidth = (document.querySelector('.main').offsetWidth - ((colum - 1) * margin)) / colum;
                
                document.querySelector('.main').style.height = (15 + 21 + 15) + 'px';
                offset = 15 + 21 + 15;

                setTimeout(function() 
                {  
                    this.position();
                }.bind(this), 10);
            }
            else{
                document.querySelector('.backGroundClear').classList.add('active');
                document.querySelector('.clearBtn').classList.remove('active');  
            }

            if (this.listMode)
                document.querySelector('.main').style.maxWidth = "600px";
            else
                document.querySelector('.main').style.maxWidth = "1400px";  
        }
    }
</script>