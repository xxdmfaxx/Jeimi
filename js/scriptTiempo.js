// 📅 Cambia esta fecha por la de ustedes (AAAA, MM - 1, DD, hh, mm, ss)
// OJO: el mes empieza en 0 (enero = 0, febrero = 1, etc.)
const fechaInicio = new Date(2024, 8, 5, 7, 0, 0); 
// Ejemplo: 15 de agosto 2023 a las 8:30 pm

function actualizarContador() {
  const ahora = new Date();
  let diferencia = ahora - fechaInicio;

  // Calcular componentes de tiempo
  const segundosTotales = Math.floor(diferencia / 1000);
  const minutosTotales = Math.floor(segundosTotales / 60);
  const horasTotales = Math.floor(minutosTotales / 60);
  const diasTotales = Math.floor(horasTotales / 24);

  const anios = Math.floor(diasTotales / 365);
  const meses = Math.floor((diasTotales % 365) / 30.44); // aprox
  const dias = diasTotales % 30.44 | 0;

  const horas = horasTotales % 24;
  const minutos = minutosTotales % 60;
  const segundos = segundosTotales % 60;

  document.getElementById("tiempo").innerText =
    `Llevamos ${anios} años, ${meses} meses, ${dias} días,
    ${horas} horas, ${minutos} minutos y ${segundos} segundos 💕`;
}

// Actualizar cada segundo
setInterval(actualizarContador, 1000);
actualizarContador();
