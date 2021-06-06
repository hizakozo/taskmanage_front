<template>
  <b-button @click="join" class="text-center mt-5" variant="outline-success">join</b-button>
</template>

<script>
export default {
  name: "join",
  data() {
    return {
      body: {
        token: this.$route.params['token']
      }
    }
  },
  methods: {
    join() {
      this.callPost(`/projects/join`, this.body)
          .then(data => {
            if (data) {
              this.$router.push({name: 'signIn'})
            }
          })
    }
  }
}
</script>