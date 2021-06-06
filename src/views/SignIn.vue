<template>
  <div>
    <b-card class="mt-5 w-25 ml-auto mr-auto">
      <b-form-group label="login id">
        <b-form-input v-model="form.login_id" placeholder="Enter login id"
                      name="input-loginId"/>
      </b-form-group>
      <b-form-group label="password">
        <b-form-input v-model="form.password" required placeholder="Enter password"
                      name="input-password"/>
      </b-form-group>
      <hr class="mt-5">
      <b-button @click="onLogin" class="float-right" variant="outline-success">sign in</b-button>
      <router-link class="float-left" tag="b-button" :to="{name: 'signUp'}">
        sign up
      </router-link>
    </b-card>
    <img src="https://taskmanage-storage-area.s3-ap-northeast-1.amazonaws.com/user/IMG_1358.jpg" alt="">
  </div>
</template>

<script>

export default {
  name: 'signIn',
  components: {},
  data() {
    return {
      form: {
        login_id: '',
        password: ''
      }
    }
  },
  methods: {
    onLogin() {
      this.callPost('/user/signIn', this.form)
          .then(response => {
            sessionStorage.setItem('userToken', response.user_token);
            this.$store.commit('getUserId', response.user_id)
            this.$router.push({name: 'projects'})
          })
          .catch(error => {
          })
    }
  }
}
</script>

<style>

</style>