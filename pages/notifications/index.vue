<template>
  <div>
   <v-container grid-list-xl>
      <v-layout row wrap>
        <v-flex xs12 md4>
          <v-card>
            <v-card-text>
              <v-text-field label="Push title" v-model="push.title"></v-text-field>
              <v-text-field label="Push message" v-model="push.message"></v-text-field>
              <v-select label="Group" v-model="push.group" :items="groups"></v-select>

              <v-btn color="primary" @click="send">Send push</v-btn>
              <v-btn flat icon><v-icon color="grey lighten-1">mdi-image</v-icon></v-btn>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  data () {
    return {
      groups: ['all', 'customers', 'new_users'],

      push: {
        title: '',
        message: '',
        group: 'new_users'
      }
    }
  },
  methods: {
    send () {

    }
  }
}
</script>

<style lang="css" scoped>
</style>
