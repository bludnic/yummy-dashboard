<template>
  <tr class="text--small" v-if="options.length > 0">
    <td colspan="4">
      <div v-for="optionGroup in options" :key="optionGroup._id">
        <p v-for="option in optionGroup.value" :key="option._id">
          <strong>{{ optionGroup.groupRef && optionGroup.groupRef.name }}:</strong>
          {{ option.optionRef && option.optionRef.name }} ( {{ option.optionRef && option.optionRef.price }} {{ currency }} ) x

          {{ option.quantity }} =
          {{ option.quantity * (option.optionRef && option.optionRef.price) }} {{ currency }}
        </p>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    options: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    currency () {
      return this.$store.state.options.currency
    }
  },
  data () {
    return {

    }
  },
  props: ['value']
}
</script>

<style lang="css" scoped>
</style>
