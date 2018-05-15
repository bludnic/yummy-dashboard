<template>
  <v-container grid-list-xl>
    <v-layout row wrap justify-center>
      <v-flex xs12 md4>
        <login-card></login-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import LoginCard from '~/components/LoginCard'
export default {
  layout: 'login',
  components: {
    LoginCard
  }
}
</script>
