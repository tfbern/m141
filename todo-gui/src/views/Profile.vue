<template>
  <v-flex>
    <h2>Benutzerprofil</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Bezeichnung</th>
            <th class="text-left">Wert</th>
            <th class="text-left">Aktion</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>Benutzername:</td><td colspan=2>{{ username }}</td></tr>
            <tr><td>Name:</td><td colspan=2>{{ name }}</td></tr>
            <tr><td>Benutzer ID:</td><td colspan=2>{{ id }}</td></tr>
            <tr><td>Passwort Hash:</td><td>{{ password }}</td><td><router-link to="/passwd">Passwort ändern</router-link></td></tr>
            <tr><td>Registriert:</td><td colspan=2>{{ formatDate(registered) }}</td></tr>
            <tr><td>Letztes Login:</td><td colspan=2>{{ formatDate(lastlogin) }}</td></tr>
            <tr><td>Token Header:</td><td colspan=2>{{ tokenHeader }}</td></tr>
            <tr><td>Token Payload:</td><td colspan=2>{{ tokenPayload }}</td></tr>
            <tr><td>Token Signature:</td><td colspan=2>{{ tokenSignature }}</td></tr>
            <tr><td>Token:</td><td colspan=2><textarea readonly disabled style="resize: none;" rows=2 cols=100 v-model="token"></textarea></td></tr>
            <tr><td>Signature Verificaion:</td><td v-bind:style="style()" colspan=2>{{ signature }}</td></tr>
        </tbody>
      </template>
    </v-simple-table>
    <v-row align="center" justify="center" style="margin-top:10px;">
      <v-col cols="12" sm="8" md="4" align="center">
        <v-card v-if="isAuth" class="elevation-12">
          <v-card-text>
            <v-form>
              <v-text-field v-model="secret" label="Secret"  type="text"></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="verify">Verify</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-flex>
</template>
<script>
export default {
  props: ['isAuth', 'username'],
  data() {
    return {
      id: '',
      name: '',
      password: '',
      registered: '',
      lastlogin: '',
      token: '',
      tokenParts: '',
      tokenHeader: '',
      tokenPayload: '',
      tokenSignature: '',
      signature: '',
      secret: '',
    };
  },
  created() {
    this.token = this.$store.getters.isLoggedIn
    if (this.token) {
      this.id = this.$store.getters.getUser.id;
      this.name = this.$store.getters.getUser.fullname;
      this.password = this.$store.getters.getUser.password;
      this.registered = this.$store.getters.getUser.registered;
      this.lastlogin = this.$store.getters.getUser.lastlogin;
      this.tokenParts = this.token.split('.') // 3 parts: header, payload, signature
      this.tokenHeader = new Buffer(this.tokenParts[0], 'base64').toString()
      this.tokenPayload = new Buffer(this.tokenParts[1], 'base64').toString()
      this.tokenSignature = this.tokenParts[2]
    }
  },
  methods: {
    formatDate(dateString) {
      if (dateString) {
        var d = new Date(dateString)
        return d.toLocaleString();
      } else {
        return null
      }
    },
    calculateSignature() {
      const crypto = require('crypto');
      if (this.secret) {
        this.signature = crypto.createHmac('sha256', this.secret)
              .update(this.tokenParts[0] + '.' + this.tokenParts[1] )
              .digest('base64') // base64, but we need base64-url
              .replace(/\+/g, '-') // replace + with -
              .replace(/\//g, '_') // replace / with _
              .replace(/=+$/, ''); // remove = at the end
      } else this.signature = ''
    },
    verify() {
      this.calculateSignature()
      return this.tokenSignature === this.signature
    },
    style() {
      return (this.verify()) ? 'color:green' : 'color:red'
    }
  }
};
</script>
