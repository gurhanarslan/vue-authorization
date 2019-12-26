import Home from './components/home'
import Login from './components/login'
import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from './components/register'

Vue.use(VueRouter);

export const routes = [
    {path:'/', component:Home, name:'homePage'},
    {path:'/login',component:Login, name:'login'},
    {path:'/register',component:Register , name:'register'},
    {path:'*', redirect: '/'}

]

export const router = new VueRouter({
    routes,
    mode:'history'
})


