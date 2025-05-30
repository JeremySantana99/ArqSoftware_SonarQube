<template>
  <div>
    <header class="top-bar">
      <img src="@/assets/Imagen1.jpg" class="logo" alt="Logo" />
    </header>

    <h1 class="title">Login del Paciente</h1>

    <form @submit.prevent="loginPaciente">
      <input v-model="email" type="email" placeholder="Email" required />
      <input v-model="password" type="password" placeholder="Contraseña" required />
      <button type="submit">Ingresar</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="mensaje" class="success">{{ mensaje }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { obtenerPacientes } from '@/services/PacienteService';
import '@/assets/main.css';
import type { Paciente } from '@/Interfaces/IPaciente';

export default defineComponent({
  name: 'LoginPaciente',
  setup() {
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const mensaje = ref('');

    const loginPaciente = async () => {
      error.value = '';
      mensaje.value = '';
      const pacientes: Paciente[] = await obtenerPacientes();

      const encontrado = pacientes.find(
        (p) => p.email === email.value && p.password === password.value
      );

      if (encontrado) {
        mensaje.value = `Bienvenido/a, ${encontrado.nombres}!`;
      } else {
        error.value = 'Correo o contraseña inválidos';
      }
    };

    return {
      email,
      password,
      error,
      mensaje,
      loginPaciente,
    };
  },
});
</script>

<style scoped>
.error {
  color: red;
  margin-top: 10px;
}

.success {
  color: green;
  margin-top: 10px;
}
</style>