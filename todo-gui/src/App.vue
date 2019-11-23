<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <v-row> 
        <v-col align="start" justify="start">
          <div class="d-flex align-center">
            <v-img
              alt="Vuetify Logo"
              class="shrink mr-2"
              contain
              src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
              transition="scale-transition"
              width="40"
            />
            <h2>Aufgabenmanager</h2>
          </div>
        </v-col>
        <v-col align="center" justify="center">
        <div id="nav" style="margin-top:12px">
          <router-link style="color:white" to="/">Home</router-link><span v-if="isAuth"> | </span>
          <router-link style="color:white" v-if="isAuth" to="/tasks">Tasks</router-link><span v-if="isAuth"> | </span>
          <router-link style="color:white" v-if="isAuth" to="/users">Users</router-link>
        </div>
        </v-col>
        <v-col align="right" justify="right">
        <div id="nav" style="margin-top:12px">
          <router-link style="color:white" v-if="!isAuth" to="/register">Register</router-link><span v-if="!isAuth"> | </span>
          <router-link style="color:white" v-if="!isAuth" to="/login">Login</router-link>
          <router-link style="color:white" v-if="isAuth" to="/profile">Profil</router-link><span v-if="isAuth"> | </span>
          <!-- router-link does not support v-on:click -->
          <router-link style="color:white" v-if="isAuth" to="/"><span v-on:click="logout">Logout</span></router-link>
        </div>
        </v-col>
      </v-row> 
      <!--
      <v-btn
        href="https://github.com/tfbern/m141"
        target="_blank"
        text
      >
        <span class="mr-2">Version 0.9</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
      -->
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row align="center" justify="center" style="margin-top:20px;">
          <router-view :isAuth="isAuth" :username="username"/>
        </v-row>  
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: 'App',

  components: {
  },
  data: function () {
    return {
        isAuth: '',
        username: ''
    }
  },
  mounted() {
    this.init()
  },
  updated() {
    this.init()
  },
  methods: {
    init() {
      this.isAuth = this.$store.getters.isLoggedIn
      if (this.isAuth) {
        this.username = this.$store.getters.getUser.username;
      }
    },
    logout() {
      this.isAuth = false
      this.$store.dispatch('logout')
    }
  }
};
</script>
