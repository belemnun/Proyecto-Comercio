const tarjeta = document.querySelector('#tarjeta');
const btnAbrirFormulario = document.querySelector('#btn-abrir-formulario');
const formulario = document.querySelector('#formulario-tarjeta');
const numeroTarjeta = document.querySelector('#tarjeta .numero');
const nombreTarjeta = document.querySelector('#tarjeta .nombre');
const logoMarca = document.querySelector('.logo-marca');
const firma = document.querySelector('#tarjeta .firma p');
const mesExpiracion = document.querySelector('#tarjeta .mes');
const yearExpiracion = document.querySelector('#tarjeta .year');
const ccv = document.querySelector('#tarjeta .ccv');


const mostrarImagenMarca = (marca) => {
    logoMarca.innerHTML = '';
    const imagen = document.createElement('img');
    imagen.src = `../img/tarjetas/logos/${marca}.png`;
    logoMarca.appendChild(imagen);
};


formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value.trim();

 
    valorInput = valorInput.replace(/\s+/g, '').replace(/\D/g, '');

  
    valorInput = valorInput.replace(/(\d{4})/g, '$1 ').trim();

    numeroTarjeta.textContent = valorInput || '#### #### #### ####';

    if (valorInput.startsWith('4')) {
        mostrarImagenMarca('visa');
    } else if (valorInput.startsWith('5')) {
        mostrarImagenMarca('mastercard');
    } else {
        logoMarca.innerHTML = '';
    }
});


tarjeta.addEventListener('click', () => {
    tarjeta.classList.toggle('active');
});


btnAbrirFormulario.addEventListener('click', () => {
    btnAbrirFormulario.classList.toggle('active');
    formulario.classList.toggle('active');
});


for (let i = 1; i <= 12; i++) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectMes.appendChild(opcion);
}


const yearActual = new Date().getFullYear();
for (let i = yearActual; i <= yearActual + 8; i++) {
    const opcion = document.createElement('option');
    opcion.value = i;
    opcion.innerText = i;
    formulario.selectYear.appendChild(opcion);
}


formulario.inputNumero.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNumero.value = valorInput
        .replace(/\s/g, '') 
        .replace(/\D/g, '') 
        .replace(/([0-9]{4})/g, '$1 ')
        .trim(); 

    numeroTarjeta.textContent = valorInput || '#### #### #### ####';
    logoMarca.innerHTML = '';

    if (valorInput.startsWith('4')) {
        const imagen = document.createElement('img');
        imagen.src = '../img/tarjetas/visa.png';
        logoMarca.appendChild(imagen);
    } else if (valorInput.startsWith('5')) {
        const imagen = document.createElement('img');
        imagen.src = '../img/tarjetas/mastercard.png';
        logoMarca.appendChild(imagen);
    }

    // voltear la tarjeta para que el usuario vea el frente y el reverso
    mostrarFrente();
});

// Input nombre de tarjeta
formulario.inputNombre.addEventListener('keyup', (e) => {
    let valorInput = e.target.value;

    formulario.inputNombre.value = valorInput.replace(/[0-9]/g, '');
    nombreTarjeta.textContent = valorInput;
    firma.textContent = valorInput;

    if (!valorInput) {
        nombreTarjeta.textContent = 'Jhon Doe';
    }

    mostrarFrente();
});

// seleccionar mes
formulario.selectMes.addEventListener('change', (e) => {
    mesExpiracion.textContent = e.target.value;
    mostrarFrente();
});

// seleccionar el año
formulario.selectYear.addEventListener('change', (e) => {
    yearExpiracion.textContent = e.target.value.slice(2);
    mostrarFrente();
});

// evento de ccb
formulario.inputCCV.addEventListener('keyup', () => {
    if (!tarjeta.classList.contains('active')) {
        tarjeta.classList.toggle('active');
    }

    formulario.inputCCV.value = formulario.inputCCV.value
        .replace(/\s/g, '') 
        .replace(/\D/g, ''); 

    ccv.textContent = formulario.inputCCV.value;
});
