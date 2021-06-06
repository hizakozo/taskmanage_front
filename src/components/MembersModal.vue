<template>
  <div>
    <b-list-group v-for="user in users" v-bind:key="user.user_id">
      <b-list-group-item class="d-flex align-items-center mt-2">
        <b-avatar class="mr-3" :src="user.avatar" variant="white"></b-avatar>
        <span class="mr-auto">{{user.name}}</span>
      </b-list-group-item>
    </b-list-group>
    <b-button
        class="mt-4 float-right"
        variant="info"
        @click="viewPage">
      招待
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'membersModal',
  props: {
    users: {type: Array, required: true}
  },
  methods: {
    viewPage() {
      this.$emit('view-page')
    }
  }
}
</script>