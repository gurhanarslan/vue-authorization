<template>
  <div class="container-fluid">
    <div class="row">
      <div
        class="col-12 position-absolute border drag"
        :class="{'bg-success': this.show, 'bg-danger':!this.show}"
      ></div>
      <div class="col-6 left mt-5" :class="{'bg-success': this.show, 'bg-danger':!this.show}"></div>
      <div class="col-6 right mt-5" :class="{'bg-success': this.show, 'bg-danger':!this.show}"></div>
      <div class="col-12">
        <div class="text-center">
          <img class="rounded-circle outline bg-light" src="/src/assets/vuered.png" alt />
        </div>
      </div>
      <div class="col-12 col-md-4 offset-md-4 focus rounded mt-5" :class="{'animated shake' : this.shake , '' : !this.shake}">
        <div class="text-center"></div>
        <div class="form-group text-center">
          <h4
            class="text-danger"
            :class="{'text-success': this.show, 'text-danger':!this.show}"
          >Kayıt Ol</h4>
          <div>
            <input
              v-model="user.userName"
              type="text"
              class="control w-40 mt-4 focusing rounded"
              :class="{'border border-success': this.show, 'control':!this.show}"
              placeholder="Username"
            />
          </div>
        </div>
        <div class="form-group text-center">
          <div>
            <input
              v-model="user.password"
              type="password"
              class="control w-40 focusing rounded"
              :class="{'border border-success': this.show, 'control':!this.show}"
              placeholder="Password"
            />
          </div>
        </div>
        <div class="form-group text-center mb-5">
          <button
            @click="registerUser"
            class="btn btn-outline-danger rounded w-40"
            :disabled="disabledRegister"
            :class="{'btn-outline-success': this.show, 'btn-outline-danger':!this.show}"
          >Kayıt Ol</button>
          <div class="small text-muted mt-3">
            * Zaten üye misiniz? Hemen
            <router-link tag="a" to="/login">Giriş Yap!</router-link>
          </div>
         
          <div class="bg-danger mt-5">
            <p
              class="text-white small"
            > {{err}}</p>
          </div>
          <div v-if="show" class="bg-success mt-5">
            <p class="text-white small">* Kayıt işlemi Başarılı!</p>
          </div>
          <div v-if="user.userName.length < 3" class="bg-danger mt-5">
            <p
              class="text-white small"
            >* Kullanıcı Adınız En az 3 Karakterden oluşmalıdır! {{3-user.userName.length}} Karakter daha ekleyiniz!</p>
          </div>
          <div v-if="user.password.length < 6" class="bg-danger mt-2">
            <p
              class="text-white small"
            >* Şifreniz en az 6 karakterden oluşmalıdır! {{6-user.password.length}} Karakter daha ekleyiniz!</p>
          </div>
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
        logged: false
      },
      err: "",
      show: false,
      register: true,
      shake:false
    };
  },
  computed: {
    ...mapGetters(["getUsers"]),
    disabledRegister() {
      if ((this.user.userName.length > 2) & (this.user.password.length > 5)) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    registerUser() {
      this.user.logged = false;
      //console.log(this.getUsers[0].userName)
      for (let i = 0; i < this.getUsers.length; i++) {
        if (this.getUsers[i].userName == this.user.userName) {
          this.register = false;
        }
      }
      if (this.register) {
        this.$store.dispatch("registerUser", this.user);
        this.show = true;

        setTimeout(() => {
          this.show = false;
         
          this.$router.replace("/login");
        }, 2000);
      } else {
          this.shake=true
        this.err =
          "Bu Kullanıcı adı kullanılıyor! Lütfen başka kullanıcı adı giriniz.";
          setTimeout(()=>{
             this.err=""
           this.shake=false
          },2000)
        this.register = true;
      }
    }
  },
  created() {
    this.$store.dispatch("getAll");
  }
};
</script>

<style>
body {
  background: whitesmoke;
}
.left {
  top: 10px;
  left: 15px;
  height: 90px;
  transform: rotate(8deg);
  transition: 0.2s linear all;
  background-color: #dc3545;
}
.right {
  top: 10px;
  right: 15px;
  transition: 0.2s linear all;
  height: 90px;
  transform: rotate(-8deg);
  background-color: #dc3545;
}
.drag {
  background-color: #dc3545;
  transition: 0.2s linear all;

  height: 150px;
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
  border: 1px solid #f04b5b;
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