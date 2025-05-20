import { Paciente } from "@/Interfaces/IPaciente";
import { db } from "./firebase";
import {collection,addDoc,doc,updateDoc,deleteDoc,getDocs} from "firebase/firestore";

const pacientesCollection = collection(db, "pacientes");

export const registrar = async (paciente: Paciente) => {
  const docRef = await addDoc(pacientesCollection, paciente);
  return docRef.id;
};

export const actualizar_datos = async (id: string, paciente: Paciente) => {
  const pacienteDoc = doc(db, "pacientes", id);
  const { id: _, ...datosPaciente } = paciente;
  await updateDoc(pacienteDoc, datosPaciente);
};

export const eliminar = async (id: string) => {
  const pacienteDoc = doc(db, "pacientes", id);
  await deleteDoc(pacienteDoc);
};

export const obtenerPacientes = async (): Promise<Paciente[]> => {
  const snapshot = await getDocs(pacientesCollection);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Paciente),
  }));
};
