<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12 position-absolute border drag"
       :class="{'': this.show, 'bg-danger':!this.show}"
      ></div>
      <div class="col-6 left mt-5" :class="{'': this.show, 'bg-danger':!this.show}"></div>
      <div class="col-6 right mt-5" :class="{'': this.show, 'bg-danger':!this.show}"></div>
      <div class="col-12">
        <div class="text-center">
          <img class="rounded-circle outline bg-light" src="/src/assets/logo.png" alt />
        </div>
      </div>
      <div class="col-12 col-md-4 offset-md-4 focus rounded mt-5"  :class="{'': this.show, 'animated shake':!this.show}">
        <div class="text-center"></div>
        <div class="form-group text-center">
          <h4 class="text-vue"  :class="{'': this.show, 'text-danger':!this.show}">Giriş Yap</h4>
          <div>
            <input
              v-model="user.userName"
              type="text"
              class="control w-40 mt-4 focusing rounded"
              :class="{'': this.show, 'border-danger':!this.show}"
              placeholder="Username"
            />
          </div>
        </div>
        <div class="form-group text-center">
          <div>
            <input
              v-model="user.password"
              type="password"
               :class="{'': this.show, 'border-danger':!this.show}"
              class="control w-40 focusing rounded"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group text-center mb-5">
          <button
           :class="{'': this.show, 'border-danger':!this.show}"
           @click="login" class="btn btn-outline-danger rounded w-40">Giriş Yap</button>
          <div class="small text-muted mt-3">* Üye değil misiniz? Hemen <router-link tag="a" to="/register">Üye Ol!</router-link></div>
            <div class="small bg-danger text-white mt-3">{{err}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      user: {
        userName: "",
        password: "",
        key:""
      },
      show: true,
      err:""
    };
  },
  computed: {
    ...mapGetters(["getUser"])
  },
  methods: {
    login() {
      this.$store.dispatch("login", this.user);
      if (this.getUser[0][0].userName == this.user.userName & this.getUser[0][0].password == this.user.password) {
        setTimeout(() => {
         
          this.$router.replace('/')
        }, 1000);
      }else{
          this.show=false
          this.err="Kullanıcı Adı veya Şifrenizi yanlış girdiniz!"
        setTimeout(()=>{
        this.show=true
        this.err=""
        
        },3000)
        
      }

    }
  },
  created() {
    this.$store.dispatch("getAll");
  }
};
</script>

<style scoped>
body {
  background-color: whitesmoke;
}
.text-vue {
  color: #41b883;
}
.btn-outline-danger {
  border-color: #41b883 !important;
  color: #41b883 !important;
}
.btn-outline-danger:hover {
  background-color: #41b883;
  color: whitesmoke !important;
}
body {
  background: whitesmoke;
}
.left {
  top: 10px;
  left: 15px;
  transition: 0.2s linear all;
  height: 90px;
  transform: rotate(8deg);
  background-color: #41b883;
}
.right {
  top: 10px;
  right: 15px;
  transition: 0.2s linear all;
  height: 90px;
  transform: rotate(-8deg);
  background-color: #41b883;
}
.drag {
  background-color: #41b883;
  height: 150px;
  transition: 0.2s linear all;
}
.text-white::placeholder {
  color: #dc3545;
}
.focusing:focus {
  width: 100% !important;
  transition: all 0.3s linear;
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.425);
}
.w-40 {
  width: 60%;
}
.control {
  border: 1px solid #41b883;
  height: 40px;
  padding: 2px;
}
input[type="text"],
input[type="password"] {
  width: 60%;
  transition: 0.5s linear all;
  padding: 12px 20px;
  margin: 8px 0;
  box-sizing: border-box;
}
.focus {
  box-shadow: 1px 2px 2px 2px rgba(0, 0, 0, 0.397);
  padding: 50px 10px;
}
</style>