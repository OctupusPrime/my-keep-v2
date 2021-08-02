var Vue       = require('vue');
var VueRouter = require('vue-router');


Vue.use(VueRouter);

const routes = [
    {
        name: 'home',
        path: '/',
        component: require('../../vue/pages/home.vue')
    },
    {
        name: 'trash',
        path: '/trash',
        component: require('../../vue/pages/trash.vue')
    },
    {
        name: 'doc',
        path: '/doc',
        component: require('../../vue/pages/doc.vue')
    },
    { 
        path: '*', 
        redirect: '/' 
    }
]

const router = new VueRouter({
    mode: 'history',
    base: '/portfolio/',
    routes
})
  

module.exports = router;