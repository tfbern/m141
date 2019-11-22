// src/views/Home.vue
<template>
  <div>
    <h1>Willkommen bei Aufgabenmanager</h1>
    <p v-if="!isAuth">Um deine Aufgaben zu sehen, musst du dich <a href="/login">einloggen</a>.
      Falls du noch kein Benutzerkonto hast, musst du dich <a href="/register">registrieren</a>.
    </p>
    <p v-if="isAuth">Du  hast dich erfolgreich als <a href="profile">{{username}}</a> eingeloggt.
    </p>
  </div>
</template>
<script>
export default {
  props: ['isAuth', 'username']
};
</script>