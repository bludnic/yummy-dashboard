<template>
  <v-card>
    <v-toolbar flat>
      <v-toolbar-title>Yummy dashboard</v-toolbar-title>
    </v-toolbar>
    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs12>
          <v-text-field label="E-mail" v-model="email" single-line></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-text-field label="Password" type="password" v-model="password" single-line></v-text-field>
        </v-flex>
        <v-flex xs12>
          <v-btn @click="login">Login</v-btn>
        </v-flex>
      </v-layout>
    </v-container>

    <v-snackbar :timeout="2000" :top="true" :color="color" v-model="snackbar">
      {{ snackbarText }}
    </v-snackbar>
  </v-card>
</template>

<script>

import Cookies from 'browser-cookies'
export default {
  data () {
    return {
      email: 'admin@gmail.com',
      password: 'qwertyqwerty',

      snackbar: false,
      snackbarText: '',
      color: 'grey'
    }
  },
  methods: {
    async login () {
      try {
        const auth = await this.$axios.$post('/login', { email: this.email, password: this.password })

        Cookies.set('token', auth.token)
        this.$store.commit('SET_TOKEN', auth.token)
        console.log('setCookies', auth.token)

        this.email = ''
        this.password = ''
        this.success()
      } catch (err) {
        this.error(err)
      }
    },
    success () {
      this.color = 'grey darken-3'
      this.snackbarText = 'Logged success'
      this.snackbar = true
      this.$router.push({ path: '/orders' })
    },
    error (err) {
      this.color = 'red darken-3'
      this.snackbarText = err.message
      this.snackbar = true
    }
  }
}
</script>

<style lang="css" scoped>
</style>
