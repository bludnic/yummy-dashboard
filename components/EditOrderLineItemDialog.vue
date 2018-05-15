<template>
  <v-dialog v-model="dialog">
    <template slot="activator">
      <v-btn icon>edit</v-btn>
    </template>

    <template slot="content">

      <v-select
        v-model="menuitemId"
        :items="menuItems"
        item-key="_id"
        item-value="name"
      >
      </v-select>
      <v-select
        v-model="size"
        :items="menuItem.prices"
        item-key="name"
        item-value="name"
      >
      </v-select>
      <v-textfield v-model="quantity"></v-textfield>

      <!-- OptionGroups -->
      <edit-order-lineitem-optiongroups
        v-model="options"
        :items="menuItem.optionGroups"
      >
      </edit-order-lineitem-optiongroups>
      <!-- OR -->
<!--       <edit-order-lineitem-optiongroup
        v-for="group in options"
        :optiongroup-id="group.group"
        :options="group.value"
      >
      </edit-order-lineitem-optiongroup> -->

    </template>
  </v-dialog>
</template>

<script>
export default {
  data () {
    return {
      dialog: false
    }
  },
  watch: {
    menuitemId () {
      // Reset LineItem attributes when select MenuItem
      this.size = null
      this.quantity = null // maybe not
      this.options = null
    }
  },
  computed: {
    dialog: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    },

    menuItems () {
      return this.$store.state.order.menuItems // or fetch with axios
    },

    menuItem () {
      return this.$store.state.order.menuItems.find(menuItem => menuItem._id === this.menuitemId)
    }
  },
  props: ['value', 'menuitemId', 'size', 'quantity', 'options']
}
</script>

<style lang="css" scoped>
</style>