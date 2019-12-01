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
          <router-link class="router-link" to="/">Home</router-link><span v-if="isAuth"> | </span>
          <router-link class="router-link" v-if="isAuth" to="/tasks">Tasks</router-link><span v-if="isAuth && role === 'admin'"> | </span>
          <router-link class="router-link" v-if="isAuth && role === 'admin'" to="/users">Users</router-link><span v-if="isAuth && role === 'admin'"> | </span>
          <router-link class="router-link" v-if="isAuth && role === 'admin'" to="/system">System</router-link>
        </div>
        </v-col>
        <v-col align="right" justify="right">
        <div id="nav" style="margin-top:12px">
          <router-link class="router-link" v-if="!isAuth" to="/register">Register</router-link><span v-if="!isAuth"> | </span>
          <router-link class="router-link" v-if="!isAuth" to="/login">Login</router-link>
          <router-link class="router-link" v-if="isAuth" to="/profile">{{fullname}}</router-link><span v-if="isAuth"> | </span>
          <!-- router-link does not support v-on:click -->
          <router-link class="router-link" v-if="isAuth" to="/login"><span v-on:click="logout">Logout</span></router-link>
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
          <router-view :isAuth="isAuth" :username="username" :fullname="fullname" :role="role"/>
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
        username: '',
        fullname: '',
        role: ''
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
        this.role = this.$store.getters.getUser.role;
        this.fullname = this.$store.getters.getUser.fullname;
      }
    },
    logout() {
      this.isAuth = false
      this.$store.dispatch('logout')
    }
  }
};
</script>
<style>
  .router-link {
    color:white !important;
    text-decoration: none;  
  }
  .router-link-exact-active {
    color:white !important;
    text-decoration: underline; 
  }
</style>