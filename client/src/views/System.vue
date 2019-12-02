<template>
  <v-flex>
    <h2>System Overview</h2>
    <h3>Webserver</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Bezeichnung</th>
            <th class="text-left">Wert</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>Hostname / Uptime:</td><td>{{ hostname }} / {{ (uptime/3600).toFixed(2) }} Stunden</td></tr>
            <tr><td>Anzahl CPUs x Typ:</td><td>{{ numberOfCpus }} x {{ cpu }}</td></tr>
            <tr><td>OS Typ / Plattform / RAM</td><td>{{ osType }} / {{ platform }} / {{ totalmem / 1000000000 + ' GB' }}</td></tr>
            <tr v-for="(item, index) in Object.keys(networkInterfaces)" v-bind:key="index"><td>{{item}}:</td><td>{{ networkInterfaces[item][1] }}</td></tr>
            <tr><td>Umgebungsvariable PORT:</td><td>{{ serverEnvPort  }}</td></tr>
        </tbody>
      </template>
    </v-simple-table>
    <br>
    <h3>Datenbank-Server</h3>
    <v-simple-table>
      <template v-slot:default>
        <thead>
          <tr>
            <th class="text-left">Bezeichnung</th>
            <th class="text-left">Wert</th>
          </tr>
        </thead>
        <tbody>
            <tr><td>Hostname / Port:</td><td>{{ dbHostnamePort }}</td></tr>
            <tr><td>Datenbank Engine:</td><td>{{ dbEngine }}</td></tr>
            <tr><td>Datenbank:</td><td>{{ database }}</td></tr>
            <tr><td>Datenbank-URL:</td><td>{{ databaseURL }}</td></tr>
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
      system: '',
      dbEngine: '',
      database: '',
      databaseURL: '',
      serverEnvPort: '',
      hostname: '',
      dbHostnamePort: '',
      cpu: '',
      numberOfCpus: '',
      totalmem: '',
      osType: '',
      platform: '',
      uptime: '',
      networkInterfaces: ''
    };
  },
  created() {
    this.init()
  },
  methods: {
    async init() {
      this.system = await axios.get('/api/system')
                        .then(res => res.data)
      this.dbEngine = this.system.knexconf.client
      this.database = this.system.knexconf.connection.split('@')[1].split('/')[1]
      this.dbHostnamePort = this.system.knexconf.connection.split('@')[1].split('/')[0]
      this.databaseURL = this.system.knexconf.connection
      this.serverEnvPort = this.system.serverEnv.PORT     
      this.hostname = this.system.hostname   
      this.cpu = this.system.cpus[0].model
      this.numberOfCpus = this.system.cpus.length
      this.totalmem = this.system.totalmem
      this.osType = this.system.osType
      this.platform = this.system.platform
      this.uptime = this.system.uptime
      this.networkInterfaces = this.system.networkInterfaces
    }
  }
};
</script>
