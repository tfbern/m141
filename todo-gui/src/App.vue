<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink mt-1 hidden-sm-and-down"
          contain
          min-width="100"
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
          width="100"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        <span class="mr-2">Latest Release</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <v-container>
        <v-row align="center" justify="center"> 
            <div id="nav" style="margin-top:20px; margin-bottom:20px">
                <router-link class="nav-link" to="/">Home</router-link> |
                <router-link v-if="!isAuth" to="/register">Register</router-link><span v-if="!isAuth"> | </span>
                <router-link v-if="!isAuth" to="/login">Login</router-link>
                <router-link v-if="isAuth" to="/tasks">Tasks</router-link><span v-if="isAuth"> | </span>
                <router-link v-if="isAuth" to="/profile">Profil</router-link><span v-if="isAuth"> | </span>
                <!-- router-link does not support v-on:click -->
                <router-link v-if="isAuth" to="/"><span v-on:click="logout">Logout</span></router-link>
            </div>
        </v-row> 
        <v-row align="center" justify="center">
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
