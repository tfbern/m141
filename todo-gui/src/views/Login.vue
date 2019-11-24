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
      username: '',
      password: '',
      msg: '',
    };
  },
  methods: {
    async login() {
      try {
        const credentials = {
          username: this.username,
          password: this.password
        };
        const data = await axios.post('/api/user/login', credentials)
                                .then(response => response.data);
        this.msg = data.msg;
        const token = data.token;
        const user = data.user;
        this.$store.dispatch('login', { token, user });
        this.$router.push('/');
      } catch (error) {
        // console.log(error)
        this.msg = 'Username or password is incorrect';
      }
    },
  }
};
</script>
