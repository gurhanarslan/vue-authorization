<template>
 <div>
      <router-view></router-view>
 </div>
</template>

<script>
import login from './components/login'
import register from './components/register'
import home from './components/home'
import about from './components/about'
import header from './components/shared/header'
import { mapGetters } from "vuex";
export default {
  data(){
    return{
      token:""
    }
  },
  components:{
    appLogin:login,
    appRegister:register,
    appHome:home,
    appAbout:about,
    appHeader:header
  },
    computed: {
    ...mapGetters(["getUser"])
  },
  }
</script>

<style>

</style>
