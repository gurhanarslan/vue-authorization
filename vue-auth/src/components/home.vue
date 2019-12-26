<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-8 offset-md-2 ">
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ratione, aspernatur?</p>
      <div class="tex-center">
        <strong>
          Hoşgeldiniz,
          <span class="text-danger">{{getUser[0][0].userName}}</span> Bey/Hanım 10 saniye sonra oturumunuz kapanacaktır!
        </strong>
      </div>
      </div>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters(["getUser"])
  },
  created() {
    let token = this.$store.getters.getToken;
    if (token.length > 0) {
      console.log("got it");
      setTimeout(() => {
        this.$store.dispatch("token", this.token);
      }, 10000);
    } else {
      this.$router.replace("/login");
    }
  }
};
</script>

<style>
</style>