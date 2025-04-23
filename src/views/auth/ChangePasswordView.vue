<template>
	<div class="contenido flex justify-center items-center min-h-screen p-4">
		<div class="w-full max-w-2xl bg-white shadow-md p-6 rounded-lg">
			<h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3 rounded-md">
				Cambiar Contraseña
			</h2>
			<div class="flex flex-col md:flex-row gap-6">
				<form class="flex flex-col gap-6 w-full md:w-1/2" @submit.prevent="btnChangePassword">
					<div class="flex flex-col w-full">
						<label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2" for="newPassword">Nueva
							Contraseña</label>
						<div class="flex w-full">
							<input autocomplete="on" class="flex-1 h-10 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
								v-model="password.new_password" :type="showNewPassword ? 'text' : 'password'" id="newPassword">
							<button class="w-12 flex items-center justify-center bg-[#08245B] text-white rounded-r-full" type="button"
								@click="toggleShowNewPassword">
								<img v-if="showNewPassword" src="@/assets/eyes-open.svg" alt="Ocultar contraseña" />
								<img v-else src="@/assets/eyes-close.svg" alt="Mostrar contraseña" />
							</button>
						</div>
					</div>

					<div class="flex flex-col w-full">
						<label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2" for="confirmPassword">Confirmar Contraseña</label>
						<div class="flex w-full">
							<input autocomplete="on" class="flex-1 h-10 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"	
							v-model="password.confirm_password"
							:type="showRepeatPassword ? 'text' : 'password'" id="confirmPassword">
							<button class="w-12 flex items-center justify-center bg-[#08245B] text-white rounded-r-full" type="button"
								@click="toggleShowRepeatPassword">
								<img v-if="showRepeatPassword" src="@/assets/eyes-open.svg" alt="Ocultar contraseña" />
								<img v-else src="@/assets/eyes-close.svg" alt="Mostrar contraseña" />
							</button>
						</div>
					</div>

					<button class="w-full md:w-40 bg-[#2A5CAA] text-white py-2 rounded-lg font-bold" type="submit">Enviar</button>
				
				</form>

					<!-- Requisitos de la contraseña -->
					<div class="p-4 bg-gray-50 w-full  md:w-1/2 rounded-lg">
						<h3 class="text-[#193368] font-bold mb-4">Requisitos para la contraseña:</h3>
						<ul class="list-disc list-inside text-sm text-gray-700">
							<li>Debe tener al menos 8 caracteres.</li>
							<li>Debe contener al menos una letra mayúscula.</li>
							<li>Debe contener al menos una letra minúscula.</li>
							<li>Debe contener al menos un número.</li>
						</ul>
					</div>
				</div>
			</div>
		</div>

		<div v-if="err" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-red-600">Error</h3>
            <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div class="mb-6">
            <p class="text-gray-700">{{ err }}</p>
          </div>
          <div class="flex justify-end">
            <button @click="closeModal" class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors">
              Entendido
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="success" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
      <div class="bg-white rounded-xl shadow-xl transform transition-all max-w-md w-full">
        <div class="p-6">
          <div class="flex justify-between items-center mb-4">
            <h3 class="text-2xl font-bold text-green-600">Éxito</h3>
            <button @click="closeSuccessModal" class="text-gray-500 hover:text-gray-700">
              &times;
            </button>
          </div>
          <div class="mb-6">
            <p class="text-gray-700">{{ success }}</p>
          </div>
          <div class="flex justify-end">
            <button @click="closeSuccessModal" class="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="bg-white p-8 rounded-lg shadow-xl">
        <img src="@/assets/loader.svg" alt="Cargando...">
        <p class="mt-4 text-center">Cambiando contraseña...</p>
      </div>
    </div>
	</template>

<script setup>
	import { reactive, ref } from 'vue';
import AuthServices from '@/services/authService';
import { useRouter } from 'vue-router';

const router = useRouter();
const changePassword = new AuthServices();
const err = ref(false);
const success = ref(false);
const isLoading = ref(false);

const password = reactive({
  new_password: "",
  confirm_password: ""
});

const showNewPassword = ref(false);
const showRepeatPassword = ref(false);

function toggleShowNewPassword() {
  showNewPassword.value = !showNewPassword.value;
}

function toggleShowRepeatPassword() {
  showRepeatPassword.value = !showRepeatPassword.value;
}

async function btnChangePassword() {
  // Validación básica
  if (password.new_password !== password.confirm_password) {
    err.value = "Las contraseñas no coinciden.";
    return;
  }

  // Validación de requisitos
  if (!validatePasswordRequirements(password.new_password)) {
    err.value = "La contraseña no cumple con los requisitos.";
    return;
  }

  isLoading.value = true;
  err.value = false;
  success.value = false;

  try {
    const successResult = await changePassword.changePasswordService(password);
    if (successResult) {
      success.value = changePassword.data.value || "Contraseña cambiada exitosamente";
    } else {
      err.value = changePassword.errorMsg.value || "Error al cambiar la contraseña";
    }
  } catch (error) {
    err.value = error.message || "Ocurrió un error inesperado";
  } finally {
    isLoading.value = false;
  }
}

function validatePasswordRequirements(pwd) {
	const regexpPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,12}$/.test(pwd)
  return regexpPassword
}

function closeModal() {
  err.value = false;
}

function closeSuccessModal() {
  success.value = false;
  router.push('/home');
}
</script>