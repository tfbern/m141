<template>
  <v-flex>
    <h2>Benutzerverwaltung</h2>
    <v-data-table :headers="headers" :items="records" :items-per-page="10" class="elevation-1">
      <template slot="item" slot-scope="props">
        <tr>
          <td class="text-start">{{ props.item.username }}</td>
          <td class="text-start">{{ props.item.role }}</td>
          <td class="text-start">{{ props.item.fullname }}</td>
          <td class="text-start">{{ formatDate(props.item.registered) }}</td>
          <td class="text-start">{{ formatDate(props.item.lastlogin) }}</td>
          <td class="text-start"> 
            <v-icon small @click="deleteItem(props.item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="init">Reload</v-btn>
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import axios from 'axios'
export default {
  props: ['username'],
  name: 'Users',

  data: () => ({
    headers: [
      { text: 'Benutzername', value: 'username'},
      { text: 'Rolle', value: 'role'},
      { text: 'Name', value: 'fullname'},
      { text: 'Registriert', value: 'registered'},
      { text: 'Letztes Login', value: 'lastlogin'},
      { text: 'Actions', value: 'action', sortable: false },
    ],
    records: []
  }),
  
  created () {
    this.init()
  }, 
  
  methods: {
    async init () {
      this.records = await axios.get('/api/user')
      this.records = this.records.data
    },
    async deleteItem (item) {
      if (item.username == this.username) {
        return alert ('This is your active account. Won\'t delete it!')
      }
      const index = this.records.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        var data = await axios.delete(`/api/user/${item.id}`)
                                .then(results => results.data)
        if (data == 1) {
          this.records.splice(index, 1)
        } else {
          alert (data.sqlMessage)
        }
      }
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