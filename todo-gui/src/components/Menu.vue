<template>
  <div ref="component1" id="nav" style="margin-top:20px; margin-bottom:20px">
    <router-link class="nav-link" to="/">Home</router-link> |
    <router-link v-if="!isAuth" to="/register">Register</router-link><span v-if="!isAuth"> | </span>
    <router-link v-if="!isAuth" to="/login">Login</router-link>
    <router-link v-if="isAuth" to="/tasks">Tasks</router-link><span v-if="isAuth"> | </span>
    <router-link v-if="isAuth" to="/profile">Profil</router-link><span v-if="isAuth"> | </span>
    <!-- router-link does not support v-on:click -->
    <router-link v-if="isAuth" to="/"><span v-on:click="logout">Logout</span></router-link>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isAuth: this.$store.getters.isLoggedIn
    };
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      // this.$router.push('/');
    }
  }
};
</script>
<style>
.router-link-active {
    color: red;
}
</style>