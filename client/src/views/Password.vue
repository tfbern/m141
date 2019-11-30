// src/views/Password.vue
<template>
  <v-col cols="12" sm="8" md="4">
    <div v-if="isAuth">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Passwort ändern</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form>
            <v-text-field
              v-model="password"
              label="Aktuelles Passwort"
              name="password"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>

            <v-text-field
              v-model="newPassword"
              id="newPassword"
              label="Neues Password"
              name="newPassword"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <v-text-field
              v-model="newPasswordRepeat"
              id="newPasswordRepeat"
              label="Neues Passwort"
              name="newPasswordRepeat"
              prepend-icon="mdi-lock"
              type="password"
            ></v-text-field>
            <p style="color:red; text-align:center;" v-if="msg">{{ msg }}</p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="passwd">ändern</v-btn>
        </v-card-actions>
      </v-card>
    </div>
  </v-col>
</template>
<script>
import axios from 'axios';
export default {
  name: 'Password',
  props: ['isAuth'],
  data() {
    return {
      id: '',
      username: '',
      password: '',
      newPassword: '',
      newPasswordRepeat: '',
      msg: '',
    };
  },
  mounted() {
    if (this.$store.getters.isLoggedIn) {
      this.id = this.$store.getters.getUser.id;
      this.username = this.$store.getters.getUser.username;
    }
  },
  methods: {
    async passwd() {
      try {
        const credentials = {
          username: this.username,
          password: this.password,
          newPassword: this.newPassword,
          newPasswordRepeat: this.newPasswordRepeat
        };
        const data = await axios.put(`/api/user/${this.id}`, credentials)
                                .then(response => response.data);
        console.log(data)
        this.msg = data.msg;
        this.$store.dispatch('logout');
        this.$router.push('/login');
      } catch (error) {
        this.msg = 'Cannot change password!';
      }
    },
  }
};
</script>
