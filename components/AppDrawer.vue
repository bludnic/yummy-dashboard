<template>
  <v-navigation-drawer
    v-model="drawer"
    fixed
    app
  >
    <v-list>
      <template v-for="(item, i) in items">
        <v-list-group
          v-if="item.children"
          :prepend-icon="item.icon"
          no-action
        >
          <v-list-tile slot="activator">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
          <v-list-tile v-for="subItem in item.children" :key="subItem.title" router :to="subItem.to">
            <v-list-tile-content>
              <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list-group>

        <v-list-tile
          v-if="!item.children"
          router
          :to="item.to"
          dense
          class="pt-0"
        >
          <v-list-tile-action>
            <v-icon v-html="item.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  },
  data () {
    return {
      items: [
        {
          icon: 'mdi-file-document-box',
          title: 'Orders',
          to: '/orders'
        },
        {
          icon: 'mdi-food',
          title: 'Products',
          to: '/products',
          children: [
            {
              title: 'All products',
              to: '/products'
            },
            {
              title: 'Add new',
              to: '/product'
            },
            {
              title: 'Categories',
              to: '/categories'
            }
          ]
        },
        { icon: 'mdi-approval', title: 'Coupons', to: '/coupons' },
        { icon: 'mdi-bell', title: 'Notifications', to: '/notifications' },
        { icon: 'mdi-account-multiple', title: 'Users', to: '/users' },
        { icon: 'mdi-store', title: 'Shop options', to: '/options' }
      ]
    }
  },
  props: ['value']
}
</script>

<style lang="css" scoped>
</style>
