import Vue from 'vue'
import Vuex from 'vuex'
import {router} from './router'

Vue.use(Vuex);

const state={
    users:[],
    user:[],
    token:""
}
const getters= {
    getUsers(state){
        return state.users
    },
    getUser(state){
        return state.user
    },
    getToken(state){
        return state.token
    }
   
}
const mutations= {
    register(state,payload){
       state.users.push(payload)
       console.log('rigster')
       console.log(state.users)
    },
    gettingUser(state,payload){
        state.user=[]
        console.log('getUser')
        console.log(payload)
        if(payload.length==0){
            state.token=""
            console.log('true')
            
            state.user.push([{userName:'logout'}])   
        }
        else{
            state.user.push(payload)    
            state.token=payload[0].key
        }
       // console.log(state.token)
    },
    logout(state){
        state.token=""
        router.replace('/login')
    }
}

const actions= {
    registerUser({state,commit},payload){
       Vue.http.post('https://vue-users-86c13.firebaseio.com/user.json',payload)
       .then(response=>{
            let filter = state.users.filter(res =>{
                return res.userName=payload.userName
            })
            console.log(filter)
           console.log(response.data.name)
           payload.key=response.data.name
        commit('register',payload)
       })
   
    },
    getAll({commit}){
        let users= Vue.http.get('https://vue-users-86c13.firebaseio.com/user.json')
        .then(response=>{
            let data = response.data
            for(let key in data){
                data[key].key=key
                commit('register',data[key])
            }
        })
    },
    login({state,commit},payload){
        console.log('loginpayload')
        console.log(payload)
        let user = state.users.filter(response=>{
            if( response.userName==payload.userName &&
                response.passowrd==payload.passowrd)
             {
                 return payload
             }
             else{
                 
             }
             
        })
        console.log('user')
        console.log(user)
        commit('gettingUser',user)
    },
    token({commit},){
        console.log('workedtoken')
        commit('logout')
    },
   

    
}

export default{
    state,
    getters,
    mutations,
    actions
}
