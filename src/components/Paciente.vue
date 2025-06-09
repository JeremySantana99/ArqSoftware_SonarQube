<template>
  <div>
    <header class="top-bar">
      <img src="@/assets/Imagen1.jpg" class="logo" alt="Logo" />
    </header>
    <h1 class="title">Registro de Paciente</h1>

    <form @submit.prevent="registrarPaciente">
      <input v-model="paciente.nombres" placeholder="Nombres" required />
      <input v-model="paciente.email" type="email" placeholder="Email" required />
      <input v-model="paciente.password" type="password" placeholder="Contraseña" required />
      <input v-model="paciente.telefono" placeholder="Teléfono" required />
      <input v-model.number="paciente.edad" type="number" placeholder="Edad" required />
      <select v-model="paciente.genero" required>
        <option disabled value="">Selecciona Género</option>
        <option>Masculino</option>
        <option>Femenino</option>
        <option>Otro</option>
      </select>
      

      <div class="form-buttons">
        <button type="submit">{{ modoEdicion ? 'Guardar' : 'Registrar' }}</button>
        <button type="button" @click="limpiarFormulario">Salir</button>
      </div>
    </form>

    <div v-if="listaPacientes.length">
      <h2>Pacientes Registrados</h2>
      <div v-for="(item, index) in listaPacientes" :key="item.id" class="paciente-card">
        <p><strong>Nombre:</strong> {{ item.nombres }}</p>
        <p><strong>Email:</strong> {{ item.email }}</p>
        <p><strong>Teléfono:</strong> {{ item.telefono }}</p>
        <p><strong>Edad:</strong> {{ item.edad }}</p>
        <p><strong>Género:</strong> {{ item.genero }}</p>
        <div class="card-buttons">
          <button @click="editarPaciente(index)">Editar</button>
          <button @click="eliminarPaciente(item.id, index)">Eliminar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { registrar, actualizar_datos, eliminar, obtenerPacientes } from '../services/PacienteService';
import { Paciente } from '@/Interfaces/IPaciente';
import { PacienteFactory } from '@/Factory/PacienteFactory';
import '@/assets/main.css';

export default defineComponent({
  name: 'Paciente',
  setup() {
    const paciente = ref<Paciente>(PacienteFactory.crearPaciente());
    const listaPacientes = ref<Paciente[]>([]);
    const modoEdicion = ref(false);
    const indexEditando = ref<number | null>(null);
    const idEditando = ref<string | null>(null);

    const cargarPacientes = async () => {
      listaPacientes.value = await obtenerPacientes();
    };

    const registrarPaciente = async () => {
      try {
        if (modoEdicion.value && idEditando.value !== null) {
          await actualizar_datos(idEditando.value, paciente.value);
          listaPacientes.value[indexEditando.value!] = {
            ...paciente.value,
            id: idEditando.value
          };
        } else {
          const pacienteSinId = { ...paciente.value };
          delete pacienteSinId.id;

          const id = await registrar(pacienteSinId);
          listaPacientes.value.push({ ...pacienteSinId, id });
        }
        alert("Paciente registrado exitosamente");
        limpiarFormulario();
      } catch (error) {
        console.error("Error en registrarPaciente:", error);
        alert("Hubo un error al registrar el paciente.");
      }
    };

    const limpiarFormulario = () => {
      paciente.value = PacienteFactory.crearPaciente();
      modoEdicion.value = false;
      idEditando.value = null;
      indexEditando.value = null;
    };

    const eliminarPaciente = async (id: string, index: number) => {
      await eliminar(id);
      listaPacientes.value.splice(index, 1);
    };

    const editarPaciente = (index: number) => {
      const pacienteSeleccionado = listaPacientes.value[index];
      paciente.value = PacienteFactory.crearPaciente(pacienteSeleccionado);
      modoEdicion.value = true;
      idEditando.value = pacienteSeleccionado.id!;
      indexEditando.value = index;
    };

    onMounted(() => {
      cargarPacientes();
    });

    return {
      paciente,
      listaPacientes,
      registrarPaciente,
      eliminarPaciente,
      editarPaciente,
      limpiarFormulario,
      modoEdicion
    };
  }
});
</script>
