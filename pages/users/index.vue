<template>
  <v-container grid-list-xl>
    <v-layout row wrap>
      <v-flex xs12>
        <users-data-table v-model="users" :dialog.sync="dialog" @saved="saved"></users-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import UsersDataTable from '~/components/UsersDataTable'

export default {
  async asyncData ({ app }) {
    const users = await app.$axios.$get('/user')
    return { users }
  },
  data () {
    return {
      dialog: false,

      snackbar: false,
      snackbarColor: 'dark',
      snackbarText: 'Item created succesfully'
    }
  },
  methods: {
    saved (promise) {
      promise.then(res => {
        this.getUsers()
      })
    },
    async getUsers () {
      this.users = await this.$axios.$get('/user')
    }
  },
  components: {
    UsersDataTable
  }
}
</script>

<style lang="css" scoped>
</style>
