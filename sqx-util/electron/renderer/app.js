// Para agregar nuevos módulos, crea un botón adicional y llama a window.api.runModule('nombre_modulo', payload)

const button = document.getElementById('run-btn');
const resultDiv = document.getElementById('result');

button.addEventListener('click', async () => {
  button.disabled = true;
  resultDiv.textContent = 'Ejecutando...';
  try {
    const response = await window.api.runModule('create_sqx_building_blocks', { example: true });
    resultDiv.textContent = JSON.stringify(response, null, 2);
  } catch (err) {
    resultDiv.textContent = `Error: ${err.message}`;
  } finally {
    button.disabled = false;
  }
});
