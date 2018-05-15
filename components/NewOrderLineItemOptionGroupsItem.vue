<template>
  <tr>
    <td><v-checkbox v-model="selectedComputed"></v-checkbox></td>
    <td>{{ name }}</td>
    <td>{{ price }} {{ currency }}</td>
    <td>
      <v-btn icon small @click="quantityComputed=-1">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <span>{{ quantityComputed }}</span>
      <v-btn icon small  @click="quantityComputed=1">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </td>
  </tr>
</template>

<script>
export default {
  computed: {
    selectedComputed: {
      get () {
        return this.selected
      },
      set (value) {
        this.$emit('update:selected', this.groupId, this.optionId, value)
      }
    },
    quantityComputed: {
      get () {
        return this.$store.getters['order/getLineItemOptionQuantity']({
          menuitemId: this.menuitemId,
          groupId: this.groupId,
          optionId: this.optionId
        })
        // this.$store.getters.order.getLineItemOptionQuantity({
        //   menuitemId: this.menuitemId,
        //   groupId: this.groupId,
        //   optionId: this.optionId
        // })
      },
      set (value) {
        this.$store.commit('order/updateLineItemOptionQuantity', {
          menuitemId: this.menuitemId,
          groupId: this.groupId,
          optionId: this.optionId,
          value: value
        })
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
  props: ['menuitemId', 'groupId', 'optionId', 'name', 'price', 'quantity', 'selected']
}
</script>

<style lang="css" scoped>
</style>
