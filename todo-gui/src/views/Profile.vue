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
            <tr><td>Passwort Hash:</td><td>{{ password }}</td><td><a href="/passwd">Passwort ändern</a></td></tr>
            <tr><td>Registriert:</td><td colspan=2>{{ formatDate(registered) }}</td></tr>
            <tr><td>Letztes Login:</td><td colspan=2>{{ formatDate(lastlogin) }}</td></tr>
            <tr><td>Token:</td><td colspan=2><textarea readonly disabled style="resize: none;" rows=2 cols=100 v-model="token"></textarea></td></tr>
        </tbody>
      </template>
    </v-simple-table>

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
      token: ''
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
    }
  }
};
</script>
