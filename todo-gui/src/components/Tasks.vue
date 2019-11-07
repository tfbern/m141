<template>
  <v-container>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-data-table :headers="headers" :items="records" :items-per-page="10" class="elevation-1" hide-default-footer>
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Aufgabenliste</v-toolbar-title>
              <div class="flex-grow-1"></div>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark class="mb-2" v-on="on">New Item</v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">{{ formTitle }}</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12" sm="6" md="4">
                          <v-text-field v-model="editedItem.text" label="Bezeichung"></v-text-field>
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
            <template v-slot:item.action="{ item }">
              <v-icon
                small
                class="mr-2"
                @click="editItem(item)"
              >mdi-pencil</v-icon>
              <v-icon
                small
                @click="deleteItem(item)"
              >mdi-delete</v-icon>
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
        { text: 'Start', value: 'start'},
        { text: 'Fälligkeit', value: 'due'},
        { text: 'Priorität', value: 'priority'},
        { text: 'Besitzer', value: 'owner'},
        { text: 'Status', value: 'status'},
        { text: 'Actions', value: 'action', sortable: false },
      ],
      records: [
        // will be shown if database is not available
        {"done": false, text: "Standardeintrag"}
      ],
      dialog: false,
      editedIndex: -1,
      editedId: -1,
      editedItem: {
      },
      defaultItem: {
      }
  }),
  
  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
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
    },
    editItem (item) {
      this.editedIndex = this.records.indexOf(item)
      this.editedId = item.id
      // console.log(this.editedIndex, this.editedId)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.records.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.records.splice(index, 1)
      axios.delete(`/api/todo/${item.id}`)
    },
    async save () {
      if (this.editedIndex > -1) {
        // update
        Object.assign(this.records[this.editedIndex], this.editedItem)
        await axios.put(`/api/todo/${this.editedId}`, this.editedItem)
      } else {
        // create
        this.records.push(this.editedItem)
        await axios.post('/api/todo', this.editedItem)
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
  }
};
</script>
