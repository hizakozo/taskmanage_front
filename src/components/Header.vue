<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <router-link tag="b-nav-item" :to="{name: 'projects'}">
          プロジェクトリスト
        </router-link>
        <b-nav-item @click="showModal">
          メンバー
        </b-nav-item>
      </b-navbar-nav>
      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            <em>User</em>
          </template>
          <b-dropdown-item @click="showProfile">Profile</b-dropdown-item>
          <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      sidebar: true
    }
  },
  methods: {
    signOut() {
      const userId = this.$store.state.userId
      this.callPost(`/user/signOut`, {user_id: userId})

      sessionStorage.removeItem('userToken')
      this.$router.push({name: 'signIn'})
    },
    showProfile() {
      this.$router.push({name: 'userProfile'})
    },
    showModal() {
      this.$emit('show-modal')
    }
  }
}
</script>