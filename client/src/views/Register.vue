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
            v-model="firstname"
            label="Vorname"
            name="firstname"
            prepend-icon="mdi-account"
            type="text"
          ></v-text-field>

          <v-text-field
            v-model="lastname"
            label="Nachname"
            name="lastname"
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
import axios from 'axios';
export default {
  data() {
    return {
      username: '',
      firstname: '',
      lastname: '',
      password: '',
      password_repeat: '',
      msg: ''
    };
  },
  methods: {
    async signUp() {
      try {
        const account = {
          username: this.username,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password,
          password_repeat: this.password_repeat
        };
        const response = await axios
          .post('/api/user', account)
          .then(response => response.data);
        this.msg = response.msg;
        this.$router.push('/login')
      } catch (error) {
        this.msg = error.response.data.msg;
      }
    }
  }
};
</script>