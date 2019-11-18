// src/views/Home.vue
<template>
  <div>
    <h1>Willkommen bei Aufgabenmanager</h1>
    <p v-if="!isAuth">Um deine Aufgaben zu sehen, musst du dich <a href="/login">einloggen</a>.
       Falls du noch kein Benutzerkonto hast, musst du dich <a href="/register">registrieren</a>.
    </p>
    <p v-if="isAuth">Du  hast dich erfolgreich als <b>{{username}}</b> eingeloggt. Leider aktualisiert sich das Menu noch nicht automatisch, daher F5 drücken...
    </p>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      isAuth: this.$store.getters.isLoggedIn
    };
  },
  created() {
    if (this.$store.getters.isLoggedIn) {
        this.username = this.$store.getters.getUser.username;
    }
  }
};
</script>