<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-data-table :headers="headers" :items="records" :items-per-page="10" class="elevation-1">
          <!-- Top bar of the table -->
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
                          <v-checkbox v-model="editedItem.done" label="erledigt"></v-checkbox>
                          <v-text-field v-model="editedItem.text" label="Bezeichung"></v-text-field>
                          <v-text-field v-model="editedItem.startdate" label="Start"></v-text-field>
                          <v-text-field v-model="editedItem.duedate" label="Fälligkeit"></v-text-field>
                          <!--<v-date-picker v-model="picker" label="Start"> </v-date-picker>-->
                          <v-select :items="priorities" v-model="editedItem.priority" label="Priorität"> </v-select>
                          <v-select :items="owner" v-model="editedItem.ownerfull" label="Besitzer"> </v-select>
                          <v-select :items="stati" v-model="editedItem.status" label="Status"> </v-select>
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
          <!-- Top bar of the table -->
          <template slot="item" slot-scope="props">
            <tr>
              <td class="text-start">
                <v-icon v-if="props.item.done == false" small @click="toggleItem(props.item)">mdi-checkbox-blank-outline</v-icon>
                <v-icon v-else small @click="toggleItem(props.item)">mdi-checkbox-marked-outline</v-icon>
              </td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ props.item.text }}</td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ formatDate(props.item.startdate) }}</td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ formatDate(props.item.duedate) }}</td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ props.item.priority }}</td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ props.item.ownerfull }}</td>
              <td v-bind:style="cross(props.item.done)" class="text-start">{{ props.item.status }}</td>
              <td class="text-start"> 
                <v-icon small class="mr-2" @click="editItem(props.item)">mdi-pencil</v-icon>
                <v-icon small @click="deleteItem(props.item)">mdi-delete</v-icon>
              </td>
            </tr>
          </template>
          <template v-slot:no-data>
            <v-btn color="primary" @click="init">Reload</v-btn>
          </template>
        </v-data-table>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import axios from 'axios'
export default {
  name: 'Tasks',

  data: () => ({
      headers: [
        { text: 'Erledigt', value: 'done'},
        { text: 'Task', value: 'text'},
        { text: 'Start', value: 'startdate'},
        { text: 'Fälligkeit', value: 'duedate'},
        { text: 'Priorität', value: 'priority'},
        { text: 'Besitzer', value: 'ownerfull'},
        { text: 'Status', value: 'status'},
        { text: 'Actions', value: 'action', sortable: false },
      ],
      records: [
        // will be shown if database is not available
        {"done": false, text: "Standardeintrag, keine Verbindung zu Datenbank?"}
      ],
      dialog: false,
      editedIndex: -1,
      editedId: -1,
      editedItem: {
        done:false
      },
      defaultItem: {
      },
      picker: new Date().toISOString().substr(0, 10),
      priorities: [],
      prioritiesAssociative: [],
      stati: [],
      statesAssociative: [],
      owner: [],
      ownerAssociative: []
      // priorities: ["niedrig","normal","hoch"],
      // stati: ["nicht begonnen", "in Bearbeitung", "erledigt", "wartet auf jemanden","zurückgestellt"],
      // besitzer: ["Max Muster","Samuel Hess","Karin Fröhlich"],
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
      let response = await axios.get('/api/todo')
      this.records = response.data
      
      let priorities = await axios.get('/api/priority')
      priorities = priorities.data
      priorities.forEach(element => {
        this.priorities.push(element.priority)
        this.prioritiesAssociative[element.priority] = element.id
      });

      let owners = await axios.get('/api/owner')
      owners = owners.data
      owners.forEach(element => {
        this.owner.push(element.fullname)
        this.ownerAssociative[element.fullname] = element.id
      });

      let states = await axios.get('/api/status')
      states = states.data
      states.forEach(element => {
        this.stati.push(element.status)
        this.statesAssociative[element.status] = element.id
      });
    },
    toggleItem (item) {
      this.editedIndex = this.records.indexOf(item)
      var done = this.records[this.editedIndex].done
      this.records[this.editedIndex].done = !done
      axios.put(`/api/todo/${item.id}`, {done:!done})
    },
    editItem (item) {
      item.startdate = this.formatDate(item.startdate)
      this.editedIndex = this.records.indexOf(item)
      this.editedId = item.id
      // console.log(this.editedIndex, this.editedId)
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
    save () {
      console.log(this.editedItem.done)
      this.editedItem.kpriority = this.prioritiesAssociative[this.editedItem.priority]
      this.editedItem.kstatus = this.statesAssociative[this.editedItem.status]
      this.editedItem.kowner = this.ownerAssociative[this.editedItem.ownerfull]
      if (this.editedIndex > -1) {
        // update
        Object.assign(this.records[this.editedIndex], this.editedItem)
        axios.put(`/api/todo/${this.editedId}`, this.editedItem)
      } else {
        // create
        this.records.push(this.editedItem)
        axios.post('/api/todo', this.editedItem)
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
    cross(status) {
      return (status==true) ? 'text-decoration:line-through':''
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
