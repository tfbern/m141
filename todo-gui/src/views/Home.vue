// src/views/Home.vue
<template>
  <v-flex>
    <h2>Willkommen bei Aufgabenmanager</h2>
    <p v-if="isAuth">Du hast dich erfolgreich als <router-link to="/profile">{{username}}</router-link> eingeloggt.
    <p v-else>Um deine Aufgaben zu sehen, musst du dich <router-link to="/login">einloggen</router-link>.
      Falls du noch kein Benutzerkonto hast, musst du dich <router-link to="/register">registrieren</router-link>.
    </p>
  </v-flex>
</template>
<script>
export default {
  props: ['isAuth', 'username']
};
</script>