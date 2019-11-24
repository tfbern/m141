<template>
  <v-flex>
    <v-data-table :headers="headers" :items="records" :items-per-page="10" class="elevation-1" @update="alet('update')">
      <!-- the header of the data table -->
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Aufgabenliste</v-toolbar-title>
          <div class="flex-grow-1"></div>
          <!-- dialog -->
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Neue Aufgabe</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12">
                      <v-text-field v-model="editedItem.text" label="Bezeichung"></v-text-field>
                      <v-text-field v-model="editedItem.startdate" label="Start"></v-text-field>
                      <v-text-field v-model="editedItem.duedate" label="Fälligkeit"></v-text-field>
                      <v-select :items="priorities" v-model="editedItem.priority" label="Priorität"> </v-select>
                      <v-select :items="owners" item-text="fullname" v-model="editedItem.userfull" label="Besitzer"> </v-select>
                      <v-select :items="states" v-model="editedItem.status" label="Status"> </v-select>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <!-- the actual data table -->
      <template slot="item" slot-scope="props">
        <tr>
          <td class="text-start">
            <v-icon v-if="props.item.status !== 'erledigt'" small @click="toggleItem(props.item)">mdi-checkbox-blank-outline</v-icon>
            <v-icon v-else small @click="toggleItem(props.item)">mdi-checkbox-marked-outline</v-icon>
          </td>
          <td v-bind:style="style(props.item)" class="text-start">{{ props.item.text }}</td>
          <td v-bind:style="style(props.item)" class="text-start">{{ formatDate(props.item.startdate) }}</td>
          <td v-bind:style="style(props.item)" class="text-start">{{ formatDate(props.item.duedate) }}</td>
          <td v-bind:style="style(props.item)" class="text-start">{{ props.item.priority }}</td>
          <td v-bind:style="style(props.item)" class="text-start">{{ props.item.userfull }}</td>
          <td v-bind:style="style(props.item)" class="text-start">{{ props.item.status }}</td>
          <td class="text-start"> 
            <v-icon small class="mr-2" @click="editItem(props.item)">mdi-pencil</v-icon>
            <v-icon small @click="deleteItem(props.item)">mdi-delete</v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:no-data>
        <p>You don't have any tasks or there is no connection to database!</p>
        <!--<v-btn color="primary" @click="init">Reload</v-btn>-->
      </template>
    </v-data-table>
  </v-flex>
</template>

<script>
import axios from 'axios'
export default {
  props: ['isAuth', 'username'],
  name: 'Tasks',

  data: () => ({
    headers: [
      { text: 'Erledigt', value: 'status'},
      { text: 'Task', value: 'text'},
      { text: 'Start', value: 'startdate'},
      { text: 'Fälligkeit', value: 'duedate'},
      { text: 'Priorität', value: 'priority'},
      { text: 'Besitzer', value: 'userfull'},
      { text: 'Status', value: 'status'},
      { text: 'Actions', value: 'action', sortable: false },
    ],
    records: [],
    dialog: false,
    editedIndex: -1,
    editedId: -1,
    editedItem: {},
    defaultItem: {startdate:"2020-1-1", duedate:"2020-12-31", priority:"normal", status:"nicht begonnen"},
    priorities: [],
    states: [],  
    owners: [], // array of objects with properties id, firstname, lastname and fullname
    currentUser: ''
  }),
  
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Neue Aufgabe' : 'Aufgabe editieren'
    }
  },
  
  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  
  created () {
    this.init()
  },  
  
  methods: {
    async init () {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.priorities = await axios.get('/api/task/priorities')
                              .then(results => results.data)
      this.states = await axios.get('/api/task/states')
                              .then(results => results.data)
      this.owners = await axios.get('/api/user')
                              .then(results => results.data)
      this.currentUser = this.owners.find(data => data.username === this.username)
      if (this.currentUser !== undefined) {
        this.records = await axios.get(`/api/tasks/${this.currentUser.id}`)
                                .then(results => results.data)
      }
    },
    toggleItem (item) {
      var index = this.records.indexOf(item)
      var status = this.records[index].status
      status = (status === 'erledigt') ? 'in Bearbeitung' : 'erledigt'
      if (item.id) {
        axios.put(`/api/tasks/${item.id}`, {status:status})
        this.records[index].status = status
      } else {alert('ID missing, cannot toggle')}
    },
    editItem (item) {
      item.startdate = this.formatDate(item.startdate)
      item.duedate = this.formatDate(item.duedate)
      this.editedIndex = this.records.indexOf(item)
      this.editedId = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.records.indexOf(item)
      if (confirm('Are you sure you want to delete this item?')) {
        this.records.splice(index, 1)
        axios.delete(`/api/task/${item.id}`)
      }
    },
    async save () {
      this.editedItem.kuser = this.owners.find(obj => obj.fullname === this.editedItem.userfull).id
      if (this.editedIndex > -1) { // update
        delete this.editedItem.userfirst // do not send this attribute to API
        delete this.editedItem.userlast // do not send this attribute to API
        // will send possibly wrong editedItem.userfull to API but it does not hurt
        var data = await axios.put(`/api/tasks/${this.editedId}`, this.editedItem)
                                .then(results => results.data)
        if (!data.code){
          if (this.currentUser.fullname === this.editedItem.userfull) {
            Object.assign(this.records[this.editedIndex], this.editedItem)
          } else {
            // remove item from this view because it now belongs to a different user
            this.records.splice(this.editedIndex, 1)
            alert('Aufgabe wurde ' + this.editedItem.userfull + 'zugewiesen.')
          }
        } else alert(data.sqlMessage)
      } else { // create
        this.editedItem.id = await axios.post('/api/tasks', this.editedItem)
                              .then(results => results.data[0])
        if (this.currentUser.fullname === this.editedItem.userfull) {
          this.records.push(this.editedItem)
        } else {alert('Aufgabe wurde ' + this.editedItem.userfull + 'zugewiesen.')}
      }
      this.close()
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    style(item) {
      return (item.status === 'erledigt') ? 'text-decoration:line-through':''
    },
    formatDate(dateString) {
      if (dateString) {
        var d = new Date(dateString)
        return d.getFullYear()  + "-" + (d.getMonth()+1) + "-" + d.getDate() 
      } else {
        return null
      }
    }
  }
};
</script>