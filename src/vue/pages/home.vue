<template>
    <div class="cont">
        <addBlock   :item="addBlock"
                    :paletteColor="colorInPalette"
                    @comitAddColor="comitAddColor"
                    @comitAddBlock="comitAddBlock"
                    @relocateAllBlocks="relocateAllBlocks">
                    </addBlock>
        <popUp :cont="popUpTxt" ref="popUp" @popUpCansel="popUpCansel"></popUp>
        <div class="main" @mousedown ="start($event, false)">
        <resize-observer @notify="handleResize" />

            <block :item="clon" :txt="clon.txt" :paletteColor="colorInPalette" :class="{ 'hidden': ishidden, 'clon': isclon}"></block>
            <block v-for="item in items"    :item="item"
                                            :txt="item.txt" 
                                            :paletteColor="colorInPalette" 
                                            :class="{ 'listMode': listMode}"
                                            @relocateBlock="relocateBlock"
                                            @comitInput="comitInput"
                                            @comitColor="comitColor"
                                            @deleateBlock="deleateBlock"
                                            @cloneBlock="cloneBlock"
                                            @txtForPopUp="txtForPopUp">
                                            </block>
        </div>
    </div>
</template>

<script>
    var $body = document.body;
    var $html = document.documentElement;
    var colum; 
    var storage;
    var index = 0;
    var margin = 25;
    var columnWidth = 0;
    var offset = 0;

    var div;
    var secondDiv;
    var cc = true;
    var cout;
    var deleateItem;

    var isClick = false;

    module.exports = {
        data: function () {
            return {
                items: [],
                clon :{
                    x: 0,
                    y: 0,
                    txt: "",
                    color: 0,
                    data: 'clon'
                },
                deleateItems: [],
                addBlock: {
                    color: 0
                },
                popUpTxt: '',

                ishidden: true,
                isclon: true
            }
        },
        props: ['colorInPalette', 'listMode'], 
        components: {
            'addBlock': require('../components/addBlock.vue'),
            'popUp': require('../components/popUp.vue'),
            'block': require('../components/block.vue')
        },        
        computed: {
            blockList: function () {
                return this.$store.getters['getBlocks'];
            },
            deleteBlock: function () {
                return this.$store.getters['getDeleteBlock'];
            }   
        }, 
        methods: {
            getMinIndex(array) {
                return array.indexOf(Math.min.apply(null, array));
            },
            comitAddColor(value)
            {
                this.addBlock.color =  value;
            },
            comitAddBlock(txt, color)
            {
                this.add(txt, color);
                this.addBlock.color = 0;
            },
            relocateAllBlocks(height)
            {
                offset = height + margin + 15;
                $('.block').addClass('active');
                this.position();   
                                           
                setTimeout(function()
                { 
                    $('.block').removeClass('active');
                }.bind(this), 10);
            },
            add(txtValue, colorValue)
            {       
                var data = {
                    x: 0,
                    y: offset,
                    data: this.items.length,
                    txt: txtValue,
                    color: colorValue
                };
                $('.block').addClass('active');
                this.items.unshift(data);
                    
                setTimeout(function()
                { 
                    $('.block').removeClass('active');
                }, 1);

                this.$store.dispatch('saveBlockList', this.items);   
            },
            start(e, isTouch)
            {
                setTimeout(function()
                {                 
                    if (e.target.className == "moveBlock")
                    {
                            $body.style.cssText = 'overflow: hidden;';
                            $html.style.cssText = 'overflow: hidden;';
                            if (document.body.offsetHeight > window.innerHeight)
                            {
                                if (isTouch)
                                    document.querySelector('.myKeep').classList.add('disableScrollMobile');
                                else
                                    document.querySelector('.myKeep').classList.add('disableScroll');
                            }


                        document.querySelector('.addBlock').classList.remove('hover');
                        $('.block').removeClass('addHover');

                        isClick = true;
                        cc = true;

                        div = document.querySelector('[data-position="' + (e.target.parentElement.dataset.position) + '"]');
                        secondDiv = div;
                    
                        this.isclon = true;

                        var i = Math.abs(JSON.parse(div.dataset.position) - this.items.length) - 1;

                        this.clon.x     = this.items[i].x;
                        this.clon.y     = this.items[i].y;
                        this.clon.txt   = this.items[i].txt;
                        this.clon.color = this.items[i].color;

                        document.querySelector('[data-position="' + (this.clon.data) + '"]').style.width = (columnWidth - 2) + 'px';
                        this.ishidden = false;
                        div.classList.add("hidden");

                        $('.block').removeClass('hoverClick');
                    }
                }.bind(this),10);

            },
            drag(e)
            {
                if (e.target.className == 'mainTxt')
                {
                    $('.block').attr('onmousedown', 'return true' );
                    $('.block').attr('onselectstart', 'return true' );    
                }
                else
                {
                    $('.block').attr('onmousedown', 'return false' );
                    $('.block').attr('onselectstart', 'return false' );     
                }
                if (isClick)
                {
                    this.clon.x = e.pageX -  div.clientWidth/2 - (document.querySelector('.home').offsetWidth - document.querySelector('.main').offsetWidth)/2;
                    this.clon.y = e.pageY - 64 - 17;
                    this.engine(this.clon.x, this.clon.y);
                }
            },
            end()
            {
                if (isClick)
                {
                    var i = Math.abs(JSON.parse(secondDiv.dataset.position) - this.items.length) - 1;
                    this.isclon = false;
                    this.clon.x = this.items[i].x;
                    this.clon.y = this.items[i].y;
                    this.$store.dispatch('saveBlockList', this.items);   
                    setTimeout(function()
                    { 
                        $body.style.cssText = 'overflow : visible;';
                        $html.style.cssText = 'overflow : visible;';
                        document.querySelector('.myKeep').classList.remove('disableScroll');
                        document.querySelector('.myKeep').classList.remove('disableScrollMobile');

                        secondDiv.classList.remove("hidden");
                        this.ishidden = true;
                
                        document.querySelector('.addBlock').classList.add('hover');
                        $('.block').addClass('addHover');

                    }.bind(this), 400);
                }

                isClick = false;
            },
            engine(x, y)
            {
                var blockPos = JSON.parse(div.dataset.position);
                var i = Math.abs(blockPos - this.items.length) - 1;
                if (cc)
                {
                    if (i + 1 < this.items.length)//left
                        if (x > this.items[i + 1].x && this.items[i].y == this.items[i + 1].y)
                            this.ghosting(i, blockPos - 1, i + 1);
                    if (i - 1 > -1)
                        if (x < this.items[i - 1].x && this.items[i].y == this.items[i - 1].y) 
                            this.ghosting(i, blockPos + 1, i - 1);

                    if (i + colum < this.items.length)//top
                        if (y > this.items[i + colum].y && this.items[i].x == this.items[i + colum].x)
                            this.ghosting(i, blockPos - colum, i + colum);
                    if (i - colum > -1)
                        if (y < this.items[i - colum].y && this.items[i].x == this.items[i - colum].x)
                            this.ghosting(i, blockPos + colum, i - colum);
                }
                this.$store.dispatch('saveBlockList', this.items);   

            },
            ghosting(firstPos, secondPos, arrayChange)
            {
                cc = false;
                var txt = this.items[firstPos].txt;
                var color = this.items[firstPos].color;
                this.items[firstPos].txt = this.items[arrayChange].txt;
                this.items[firstPos].color = this.items[arrayChange].color;
              
                secondDiv = document.querySelector('[data-position="' + (secondPos) + '"]');

                div.style.top = secondDiv.style.top;
                div.style.left = secondDiv.style.left;

                setTimeout(function()
                { 
                    div.classList.remove("hidden");
                }, 20);
                
                setTimeout(function(){ 
                    secondDiv.classList.add("hidden");
                    this.items[arrayChange].txt = txt;
                    this.items[arrayChange].color = color;
                }.bind(this), 50);

                setTimeout(function()
                { 
                    div.style.top = this.items[firstPos].y + 'px';
                    div.style.left = this.items[firstPos].x + 'px';
                }.bind(this), 20);

                setTimeout(function()
                { 
                    div = document.querySelector('[data-position="' + (secondPos) + '"]');
                    cc = true;
                }, 60);
            },
            position()
            {
                storage  = new Array(colum).fill(offset);
                for (var i = 0; i < this.items.length; i++)
                {
                    document.querySelector('[data-position="' + (this.items[i].data) + '"]').style.width = (columnWidth) + 'px';
                    var thisOffset = document.querySelector('[data-position="' + (this.items[i].data) + '"]').offsetHeight;

                    index = this.getMinIndex(storage);
                    this.items[i].x = (index * columnWidth) + (index * margin);
                    this.items[i].y = storage[index];

                    storage[index] += thisOffset + margin;    
                    index = 0;   
                }
                $('.block').addClass('addHover');
                document.querySelector('.main').style.height = (Math.max.apply(null, storage) - margin + 15) + 'px';
                this.$store.dispatch('saveBlockList', this.items);   
            },
            handleResize ({ width, height })
            {
                colum = Math.trunc(width/ 300) - 1;
                if (colum < 1)
                    colum = 1;
                columnWidth = (width - ((colum - 1) * margin)) / colum;
                
                this.position();
            },
            relocateBlock()
            {
                this.position();     
            },
            comitInput(value, pos)
            {
                this.items[Math.abs(pos - this.items.length) - 1].txt = value;
                this.$store.dispatch('saveBlockList', this.items);  
            },
            comitColor(value, pos)
            {
                this.items[Math.abs(pos - this.items.length) - 1].color = value;   
            },
            deleateBlock(pos)
            {
                $('.block').removeClass('addHover');
                $('.block').removeClass('active');
                div = document.querySelector('[data-position="' + (pos) + '"]');
                div.classList.add('hidden');
                var x = Math.abs(pos - this.items.length) - 1;
                cout = this.items.length - x - 1;
                var i = 0;
                 
                if (cout > 0 && this.items.length > 1)
                {
                    setTimeout(function() 
                    {  
                        this.myLoop(i, x, pos, cout); 
                    }.bind(this), 150);  
                }
                setTimeout(function() 
                { 
                    deleateItem = this.items.splice(this.items.length - 1, 1);
                    var data = {
                        x: 0,
                        y: 0,
                        txt: deleateItem[0].txt,
                        color: deleateItem[0].color,
                        data: this.deleateItems.length
                    };
                    this.deleateItems.unshift(data);

                    for (var x = 0;x < this.items.length; x++)
                        this.items[x].data = this.items.length - x - 1;
                    $('.block').addClass('addHover');

                    this.$store.dispatch('saveBlockList', this.items);   
                    this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems); 
                    this.position();
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
            cloneBlock(txt, color)
            {
                setTimeout(function() 
                {  
                    this.add(txt, color);
                }.bind(this), 300);
            },
            txtForPopUp(value)
            {
                this.popUpTxt = value;
                switch (value) {
                    case 'Note created':
                        this.$refs.popUp.show();
                        break;
                    case 'Note moved to trash can':
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
                    case 'Note created':
                        this.popUpTxt = 'Action canceled';
                        this.deleateBlock(this.items.length - 1);
                        break;
                    case 'Note moved to trash can':
                        this.popUpTxt = 'Action canceled';
                        this.add(deleateItem[0].txt, deleateItem[0].color);
                        this.deleateItems.splice(0, 1);
                        this.$store.dispatch('saveDeleatedBlockLocal', this.deleateItems); 
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
            if (this.blockList)
                this.items = this.blockList;
                
            this.$store.dispatch('loadDeleate');  
            if (this.deleteBlock)
                this.deleateItems = this.deleteBlock;
            
            colum = Math.trunc(document.querySelector('.main').offsetWidth/ 300) - 1;
            if (colum < 1)
                colum = 1;
            columnWidth = (document.querySelector('.main').offsetWidth - ((colum - 1) * margin)) / colum;

            offset = document.querySelector('.addBlock').offsetHeight;
            document.querySelector('.addBlock').classList.add('hover');
            document.querySelector('.main').style.height = (offset + margin + 15) + 'px';

            if (this.listMode)
                document.querySelector('.main').style.maxWidth = "600px";
            else
                document.querySelector('.main').style.maxWidth = "1400px";  
                
            document.querySelector('.main').addEventListener('touchstart', function(e){
                this.start(e, true);
            }.bind(this));
        }
    }
</script>
