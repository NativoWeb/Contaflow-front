<template>
	<SidebarMenu />
	<div class="contenido">
		<div class="w-[80%] m-auto bg-white shadow-md p-6">
			<h2
				class="flex flex-col text-left text-[#2A5CAA] font-bold text-2xl mb-6 bg-gradient-to-r from-gray-100 to-[#E5EAFF] p-3">
				Cambiar Contraseña</h2>
			<div class="flex gap-6">
			<form class="flex flex-col gap-6 w-[50%]" @submit.prevent="changePassword">
				<div class="flex flex-col items-start w-[100%]">
					<label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2" for="newPassword">Nueva
					Contraseña</label>
					<div class="flex w-[80%] flex-row">
						<div class="w-[100%] max-w-[400px] min-w-[250px]">
							<input
								class="w-[100%] max-w-[400px] h-8 ml-5 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
								v-model="password.new_password" :type="showNewPassword ? 'text' : 'password'" id="newPassword">
						</div>
					<div class="col">
						<button
								class="w-[50px] flex items-center justify-center h-8 bg-[#08245B] text-white rounded-r-full p-2"
								type="button" @click="toggleShowNewPassword">
							<img v-if="showNewPassword" src="../assets/eyes-open.svg" alt="Ocultar contraseña"/>
							<img v-else src="../assets/eyes-close.svg" alt="Mostrar contraseña"/>
						</button>
					</div>
					</div>
					</div>
						<div class="flex flex-col items-start w-[100%]">
							<label class="block uppercase tracking-wide text-[#193368] text-xs font-bold mb-2"
								for="confirmPassword">Confirmar Contraseña</label>
							<div class="flex flex-row w-[80%] ">
								<div class="w-[100%] max-w-[400px] min-w-[250px]">
									<input
										class="w-[100%] max-w-[400px] h-8 ml-5 bg-[#F5F5F5] text-gray-700 border border-gray-300 rounded-l-full py-1 px-4 focus:outline-none focus:bg-white focus:border-gray-500"
										:type="showRepeatPassword ? 'text' : 'password'" id="confirmPassword">
								</div>
								<div class="col">
									<button
										class="w-[50px] flex items-center justify-center h-8 bg-[#08245B] text-white rounded-r-full p-2"
										type="button" @click="toggleShowRepeatPassword">
										<img v-if="showRepeatPassword" src="../assets/eyes-open.svg" alt="Ocultar contraseña" />
										<img v-else src="../assets/eyes-close.svg" alt="Mostrar contraseña" />
									</button>
								</div>
							</div>
						</div>

						<button class="ml-5 w-40" type="submit">Enviar</button>
					</form>

					<!-- Requisitos de la contraseña -->
					<div class="p-4 bg-gray-50 w-[60%] rounded-lg">
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
import SidebarMenu from './SidebarMenu.vue';

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
	fetch('http://127.0.0.1:8000/api/password/', {
		method: 'POST',
		body: JSON.stringify(password),
		headers: {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${token}`
		}
	})
		.then(res => res.json())
		.then((res) => {
			console.log(res)
			// Cambiar validaciones
			alert("Contraseña cambiada de manera correcta")
		})
		.catch((err) => {
			console.error(err)
			alert("La contraseña no pudo ser cambiada")
		});
}

</script>

<style>
.contenido {
	padding: 20px;
	height: 100vh;
	transition: margin-left 0.3s ease;
	padding-top: 250px;
	background-color: #F5F5F5;
	margin-left: 80px;
	/* Esto se aplica por defecto en pantallas de escritorio */
}

.menu-lateral.open~.contenido {
	margin-left: 309px;
	width: calc(100% - 309px);
}

/* Media query para pantallas móviles */
@media (max-width: 768px) {
	.contenido {
		margin-left: 0;
		/* Esto se aplica en pantallas móviles */
		padding-top: 110px;
	}

	.menu-lateral.open~.contenido {
		margin-left: 0;
		/* Asegúrate de que el margen izquierdo sea 0 en móviles incluso cuando el menú esté abierto */
		width: 100%;
		/* Asegúrate de que el contenido ocupe el 100% del ancho en móviles */
		padding-top: 110px;
	}
}

@tailwind base;
@tailwind components;
@tailwind utilities;
</style>