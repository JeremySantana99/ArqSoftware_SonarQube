<template>
  <div id="app">
    <header>
      <h1>Commit Google run</h1>
      <nav>
        <RouterLink to="/pacientes">Pacientes</RouterLink> |
        <RouterLink to="/LoginPaciente">Login</RouterLink>
      </nav>
    </header>
    <main>
      <RouterView />
    </main>
  </div>
</template>

<script setup>
</script>

<style scoped>
nav {
  margin: 20px;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
</style>

