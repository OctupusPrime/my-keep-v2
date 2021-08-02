var Vue   = require('vue');
var Vuex  = require('vuex');
// var Axios = require('axios');


Vue.use(Vuex);

// localStorage.clear();
module.exports = new Vuex.Store({
    state:{
        blocks: JSON.parse(localStorage.getItem('blocks')) || [],
        settings: JSON.parse(localStorage.getItem('settings')) || {},
        deleteBlocks: JSON.parse(localStorage.getItem('deleteBlocks')) || []
    },
    getters:{
        getBlocks: function(state)
        {
            return state.blocks;
        },
        getSettings: function(state)
        {
            return state.settings;
        },
        getDeleteBlock: function(state)
        {
            return state.deleteBlocks;
        } 
    },
    mutations:{
        loadBlocks: function(state)
        {            
            state.blocks = JSON.parse(localStorage.getItem('blocks'));
        },
        loadSettings: function(state)
        {
            state.settings = JSON.parse(localStorage.getItem('settings'));
        },
        loadDeleateBlock: function(state)
        {
            state.deleteBlocks = JSON.parse(localStorage.getItem('deleteBlocks'));
        }
    },
    actions:{
        saveBlockList: function (context, data)
        {
            localStorage.setItem('blocks', JSON.stringify(data));
        },
        saveSettingLocal: function(context, data)
        {
            localStorage.setItem('settings', JSON.stringify(data));    
        },
        saveDeleatedBlockLocal: function(context, data)
        {
            localStorage.setItem('deleteBlocks', JSON.stringify(data));    
        },
        loadBlocks: function (context)
        {
            context.commit('loadBlocks');
        },
        loadSettings: function (context)
        {
            context.commit('loadSettings');
        },
        loadDeleate: function (context)
        {
            context.commit('loadDeleateBlock');
        }
    }
});