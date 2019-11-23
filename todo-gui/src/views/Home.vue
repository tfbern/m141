// src/views/Home.vue
<template>
  <v-flex>
    <h2>Willkommen bei Aufgabenmanager</h2>
    <p v-if="isAuth">Du hast dich erfolgreich als <a href="profile">{{username}}</a> eingeloggt.
    <p v-else>Um deine Aufgaben zu sehen, musst du dich <a href="/login">einloggen</a>.
      Falls du noch kein Benutzerkonto hast, musst du dich <a href="/register">registrieren</a>.
    </p>
  </v-flex>
</template>
<script>
export default {
  props: ['isAuth', 'username']
};
</script>