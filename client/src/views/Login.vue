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
      ldapServer: 'ldap.forumsys.com',
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
        if (this.validateUrl(this.ldapServer)) {
          this.msg = 'LDAP server is valid...';
          postBody.ldapServer = this.ldapServer
          loginEndpoint = 'ldaplogin'
        } else {
          this.msg = 'LDAP server is not valid';
          return
        }
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
      this.showLdapServer = false
      this.username = this.password = ''
      // https://www.forumsys.com/tutorials/integration-how-to/ldap/online-ldap-test-server/
      if (value === 'LDAP Server') {
        this.showLdapServer = true
        this.username = 'cn=read-only-admin,dc=example,dc=com'
        this.password = 'password'
      }
    }, 
    validateUrl (str) {
      var pattFQDN = /^(?=.{1,254}$)((?=[a-z0-9-]{1,63}\.)(xn--+)?[a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,63}$/i
      var pattIP = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
      var isFQDN = pattFQDN.test(str);
      var isIP = pattIP.test(str);
      return (isFQDN | isIP) ? true : false
    }
  }
};
</script>
