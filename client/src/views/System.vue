<template>
  <v-flex>
    <h2>System</h2>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Bezeichnung</th>
            <th class="text-left">Wert</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>Server Betriebssystem:</td><td>{{ server.serverEnv.OS }}</td></tr>
            <tr><td>Server Computername:</td><td>{{ server.serverEnv.COMPUTERNAME }}</td></tr>
            <tr><td>Server Prozessor:</td><td>{{server.serverEnv.PROCESSOR_IDENTIFIER }}</td></tr>
            <tr><td>Datenbank Engine:</td><td>{{ server.knexconf.client }}</td></tr>
            <tr><td>Datenbank:</td><td>{{ server.knexconf.connection.split('@')[1].split('/')[1]}}</td></tr>
            <tr><td>Datenbank-URL:</td><td>{{ server.knexconf.connection }}</td></tr>
            <tr><td>Server Umgebungsvariable PORT:</td><td>{{ server.serverEnv.PORT }}</td></tr>
            <tr><td>Server Umgebungsvariable DATABASE_URL:</td><td>{{ server.serverEnv.DATABASE_URL }}</td></tr>
        </tbody>
      </template>
    </v-simple-table>
  </v-flex>
</template>
<script>
import axios from 'axios'
export default {
  props: ['isAuth', 'username'],
  data() {
    return {
      server: ''
    };
  },
  created() {
    this.init()
    this.token = this.$store.getters.isLoggedIn
    if (this.token) {
      this.id = this.$store.getters.getUser.id;
      this.name = this.$store.getters.getUser.fullname;
      this.role = this.$store.getters.getUser.role;
    }

  },
  methods: {
    async init() {
      this.server = await axios.get('/api/system')
                        .then(res => res.data)
      console.log('ddfs')
    },
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
