<template>
  <div id="app">
    <h1> prueba de despliegue</h1>
    <header>
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

