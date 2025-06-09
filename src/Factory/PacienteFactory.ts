import { Paciente } from '@/Interfaces/IPaciente';

export class PacienteFactory {
  static crearPaciente(paciente?: Partial<Paciente>): Paciente {
    return {
      nombres: paciente?.nombres ?? '',
      email: paciente?.email ?? '',
      password: paciente?.password ?? '',
      telefono: paciente?.telefono ?? '',
      edad: paciente?.edad ?? 0,
      genero: paciente?.genero ?? '',
      ...(paciente?.id ? { id: paciente.id } : {}) 
    };
  }
}


//El patrón Factory Method es un patrón creacional cuyo propósito es encapsular la creación de objetos, 
// de forma que se centraliza en una clase dedicada (la fábrica), en lugar de crear instancias directamente por toda la aplicación.

