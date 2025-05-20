import { createRouter, createWebHistory } from 'vue-router'
import Paciente from '@/components/Paciente.vue'
import LoginPaciente from '@/components/LoginPaciente.vue'

const routes = [  {
    path: '/pacientes',
    name: 'Pacientes',
    component: Paciente           
  }, 

  {
    path: '/LoginPaciente',
    name: 'loginPaciente',
    component: LoginPaciente           
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
