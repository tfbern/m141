// src/views/Login.vue
<template>
  <v-col cols="12" sm="8" md="4">
    <p v-if="isAuth">You are already logged in! See your <a href="profile">profile</a>.</p>
    <v-card v-if="!isAuth" class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Login</v-toolbar-title>
      </v-toolbar>
      <v-card-text>
        <v-form>
          <v-select prepend-icon="mdi-database" :items="loginMethods" v-model="loginMethod" label="Login Methode" @change="changeMethod"></v-select>
          <v-text-field
            v-show="showLdapServer"
            v-model="ldapServer"
            id="ldapServer"
            label="LDAP Server"
            name="ldapServer"
            prepend-icon="mdi-server"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="username"
            label="Username"
            name="login"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>
          <v-text-field
            v-model="password"
            id="password"
            label="Password"
            name="password"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
          <p style="color:red; text-align:center;" v-if="msg">{{ msg }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Login',
  props: ['isAuth'],
  data() {
    return {
      loginMethods: ['Eigene Datenbank', 'LDAP Server'],
      loginMethod: 'Eigene Datenbank',
      showLdapServer: false,
      ldapServer: '',
      username: '',
      password: '',
      msg: '',
    };
  },
  methods: {
    async login() {
      var loginEndpoint = 'login'
      var postBody = {
        username: this.username,
        password: this.password
      };
      if (this.loginMethod === 'LDAP Server') {
        postBody.ldapServer = this.ldapServer
        loginEndpoint = 'ldaplogin'
      }
      try {
        const data = await axios.post('/api/user/'+loginEndpoint, postBody)
                                .then(response => response.data);
        this.msg = data.msg;
        const token = data.token;
        const user = data.user;
        this.$store.dispatch('login', { token, user });
        this.$router.push('/');
      } catch (error) {
        this.msg = 'Username or password is incorrect';
      }
    },
    changeMethod(value) {
      this.showLdapServer = (value === 'Eigene Datenbank') ? false : true
    }
  }
};
</script>
