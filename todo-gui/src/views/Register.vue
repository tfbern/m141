// src/views/SignUp.vue
<template>
  <v-col cols="12" sm="8" md="4">
    <v-card class="elevation-12">
      <v-toolbar color="primary" dark flat>
        <v-toolbar-title>Register</v-toolbar-title>
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

          <v-text-field
            v-model="password_repeat"
            id="password_repeat"
            label="Password (repeat)"
            name="password-repeat"
            prepend-icon="mdi-lock"
            type="password"
          ></v-text-field>
          <p style="color:red; text-align:center;" v-if="msg">{{ msg }}</p>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="signUp">Register</v-btn>
      </v-card-actions>
    </v-card>
  </v-col>
</template>
<script>
import AuthService from '@/services/AuthService.js';
export default {
  data() {
    return {
      username: '',
      password: '',
      password_repeat: '',
      msg: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await AuthService.signUp(credentials);
        this.msg = response.msg;
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>