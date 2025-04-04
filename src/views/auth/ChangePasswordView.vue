<template>
	<div class="contenido flex justify-center items-center min-h-screen p-4">
		<div class="w-full max-w-2xl bg-white shadow-md p-6 rounded-lg">
			<h2 class="text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3 rounded-md">
				Cambiar Contraseña
			</h2>
			<div class="flex flex-col md:flex-row gap-6">
				<form class="flex flex-col gap-6 w-full md:w-1/2" @submit.prevent="changePassword">
					<div class="flex flex-col w-full">
						<label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2" for="newPassword">Nueva
							Contraseña</label>
						<div class="flex w-full">
							<input class="flex-1 h-10 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
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
							<input class="flex-1 h-10 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
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
	</template>

<script setup>
import Cookies from 'js-cookie';
import { reactive, ref } from 'vue';

const VUE_APP_URL = process.env.VUE_APP_URL;
const password = reactive({
	new_password: ""
});

const showNewPassword = ref(false);
const showRepeatPassword = ref(false);

function toggleShowNewPassword() {
	showNewPassword.value = !showNewPassword.value;
}

function toggleShowRepeatPassword() {
	showRepeatPassword.value = !showRepeatPassword.value;
}


function changePassword() {
	let token = Cookies.get('jwt');
	fetch(`${VUE_APP_URL}/users/password/`, {
		method: 'POST',
		body: JSON.stringify(password),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then(() => {
			// Cambiar validaciones
			alert("Contraseña cambiada de manera correcta");
			// Redirige al login
			window.location.href = "/"; // Ajusta la ruta según tu configuración
		})
		.catch((err) => {
			console.error(err)
			alert("La contraseña no pudo ser cambiada")
		});
}

</script>
<style scoped>
</style>