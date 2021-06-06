<template>
  <button
      @click="$emit('myAction')"
  >
    {{ txt }}
  </button>
</template>

<script>
export const props = {
  txt: {
    type: String,
    required: true
  },
}
export default {
  props
}
</script>