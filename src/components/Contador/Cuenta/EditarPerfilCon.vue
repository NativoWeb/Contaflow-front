<template>

        <section class="w-full h-full bg-white shadow-md">
          <h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
            Editar Perfil
          </h2>
          <div>
            <!-- Formulario -->
            <form class="w-full p-6">
              <!-- Primera fila -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Nombres:
                  </label>
                  <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese su NIT">
                </div>
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Apellidos: 
                  </label>
                  <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Razón Social">
                </div>
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Celular:
                  </label>
                  <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Dirección">
                </div>
              </div>
    
              <!-- Segunda fila -->
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Correo:
                  </label>
                  <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Dirección">
                </div>
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Rol: 
                  </label>
                  <p class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text">Contador</p>
                </div>
                <div>
                  <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Dirección:
                  </label>
                  <input class="w-full bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-full py-3 px-4 focus:outline-none focus:bg-white focus:border-gray-500" type="text" placeholder="Ingrese la Dirección">
                </div>
              </div>
              <div class="flex justify-center items-center w-full space-x-8">
                  <button @click="router.push('/CuentaContador')"  type="button" class="w-48 bg-[#F0F0F0] hover:bg-[#DCF2F1] text-[#08245B] font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none">
                      Cancelar
                  </button>
                  <button type="submit" class="w-48 bg-[#08245B] hover:bg-[#2a4b8d] text-white font-bold py-3 px-6 rounded-full shadow-lg shadow-gray-500/50 transition-transform duration-300 hover:scale-105 focus:outline-none">
                      Guardar
                  </button>
              </div>

            </form>
          </div>
        </section>

  </template>

    
<script setup>

import { useRouter } from "vue-router"; // Importar useRouter

const router = useRouter(); // Instancia de router
  </script>
  