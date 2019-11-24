<template>
  <v-flex>
    <h2>Benutzerprofil</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Bezeichnung</th>
            <th class="text-left">Wert</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>Benutzername:</td><td >{{ username }}</td></tr>
            <tr><td>BenutzerID:</td><td>{{ id }}</td></tr>
            <tr><td>Password:</td><td>{{ password }}</td></tr>
            <tr><td>Registriert:</td><td>{{ formatDate(registered) }}</td></tr>
            <tr><td>Letztes Login:</td><td>{{ formatDate(lastlogin) }}</td></tr>
            <tr><td>Token:</td><td>{{ token }}</td></tr>
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
