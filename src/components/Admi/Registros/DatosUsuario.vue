<template>
    <!-- Título de la página -->
    <h2 class="text-xl font-bold bg-gradient-to-r from-[#F8F8F8] to-[#E5EAFF] text-[#2A5CAA] p-4 rounded-lg shadow-md text-center md:text-left">
        Información del usuario
    </h2>
    
    <div class="w-full bg-white flex flex-col md:flex-row">
    <!-- Sección de información -->
    <div class="flex-1 p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
            <!-- Primera fila -->
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Nombres:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Apellidos:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>

            <!-- Segunda fila -->
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Tipo de Identificación:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Número de Identificación:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>

            <!-- Tercera fila -->
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Número de Celular:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Correo Electrónico:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>
            </div>
            <div>
                <label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2">
                    Estado:
                </label>
                <p class="text-left w-full bg-[#F5F5F5] border border-gray-300 rounded-full py-3 px-4">Juana</p>           
            </div>
        </div>
    </div>

    <!-- Sección de botones -->
    <div class="flex flex-col gap-6 ml-2 p-8">
        <button class="btn-action">Editar</button>
        <button class="btn-action">Eliminar</button>
        <button class="btn-action">Activar / Inactivar</button>
        <button class="btn-action">Reenviar invitación</button>
        <button class="btn-action">Asignar Empresa y Banco</button>
    </div>
</div>
</template>
  

  