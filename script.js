// Esto es para el carousel
document.addEventListener('DOMContentLoaded', function() {
    var carousel = document.querySelector('#carouselExampleAutoplaying');
    var prevButton = carousel.querySelector('.carousel-control-prev');
    var nextButton = carousel.querySelector('.carousel-control-next');
  
    prevButton.addEventListener('click', function() {
      carousel.classList.remove('transicion-manual');
      setTimeout(function() {
        carousel.classList.add('transicion-manual');
      }, 50); // Agrega un pequeño retraso para permitir que se aplique la clase antes de la transición
    });
  
    nextButton.addEventListener('click', function() {
      carousel.classList.remove('transicion-manual');
      setTimeout(function() {
        carousel.classList.add('transicion-manual');
      }, 50); // Agrega un pequeño retraso para permitir que se aplique la clase antes de la transición
    });
});

// Función que se ejecuta cuando el mouse entra o sale de la línea separadora
$(document).ready(function() {
    $('.linea-separadora').mouseenter(function() {
        // Cuando el mouse entra en la línea, cambia su ancho a 2px con una animación de 0.3 segundos
        $(this).animate({ borderTopWidth: '2px' }, 300);
    }).mouseleave(function() {
        // Cuando el mouse sale de la línea, restaura su ancho original con una animación de 0.3 segundos
        $(this).animate({ borderTopWidth: '1px' }, 300);
    });
});

// Cuando el mouse pasa por un enlace de .footer-social
$(document).ready(function() {
    $('.footer-social a').hover(function() {
        // Realiza una animación cuando el mouse entra en el enlace
        $(this).find('img').animate({ width: '40px', opacity: 0.5 }, 'fast');
    }).mouseleave(function() {
        // Restaura el estado original cuando el mouse sale del enlace
        $(this).find('img').animate({ width: '30px', opacity: 1 }, 'fast');
    });
});

//Animaciones para el header
$(document).ready(function() {
    $('header h1').hover(function() {
        // Verificar si el título ya está en negrita
        if ($(this).hasClass('negrita')) {
            // Si está en negrita, quitar la clase y volver al estado original
            $(this).removeClass('negrita');
        } else {
            // Si no está en negrita, agregar la clase para hacerlo negrita
            $(this).addClass('negrita');
        }
    });
    
    $(document).ready(function() {
        $('#animacion-header').animate({'width': '100%'}, 2000);
    });
});

// Esto es para cuando presiono una categoria, aparezcan los cards segun su respectiva
document.addEventListener('DOMContentLoaded', function() {
    const categorias = document.querySelectorAll('.categorias li');
    const productos = document.querySelectorAll('.card');
  
    categorias.forEach(category => {
      category.addEventListener('click', function() {
        const selectedCategory = this.dataset.category;
        filterProducts(selectedCategory);
  
        // Remover la clase 'active' de todos los elementos y luego agregarla al elemento seleccionado
        categorias.forEach(item => item.classList.remove('active'));
        this.classList.add('active');
      });
    });
  
    function filterProducts(category) {
      productos.forEach(product => {
        if (category === 'todo' || product.classList.contains(category)) {
          product.style.display = 'block';
        } else {
          product.style.display = 'none';
        }
      });
    }
});

// Funcion para los botones de los incrementa y decrementa la cantidad de los cards
document.addEventListener('DOMContentLoaded', function() {
    const cantidadInputs = document.querySelectorAll('.cantidad');

    cantidadInputs.forEach(input => {
        input.addEventListener('click', function() {
            this.select(); // Selecciona todo el texto en el input al hacer clic en él
        });

        // Verificar si ya se han agregado los botones
        if (!input.parentNode.querySelector('button')) {
            // Agregar botones para aumentar y disminuir la cantidad
            const incrementButton = document.createElement('button');
            incrementButton.textContent = '+';
            incrementButton.style.fontWeight = 'bold';
            incrementButton.addEventListener('click', function() {
                increment(input);
            });

            const decrementButton = document.createElement('button');
            decrementButton.textContent = '-';
            decrementButton.style.fontWeight = 'bold';
            decrementButton.addEventListener('click', function() {
                decrement(input);
            });

            input.parentNode.appendChild(incrementButton);
            input.parentNode.appendChild(decrementButton);
        }
    });

    function increment(input) {
        const currentValue = parseInt(input.value);
        input.value = currentValue + 1;
    }

    function decrement(input) {
        const currentValue = parseInt(input.value);
        if (currentValue > 1) {
            input.value = currentValue - 1;
        }
    }
});

// Funcion para la table del agregar al carrito
document.addEventListener('DOMContentLoaded', function() {
  const botonMostrarCarrito = document.getElementById('botonMostrarCarrito');
  const contenedorCarrito = document.getElementById('contenedor-carrito');
  const botonOcultarCarrito = document.getElementById('botonOcultarCarrito');

  // Ocultar el carrito al cargar la página
  contenedorCarrito.classList.remove('active');

  botonMostrarCarrito.addEventListener('click', function() {
    contenedorCarrito.classList.toggle('active'); // Mostrar/ocultar el carrito al hacer clic en el botón principal
  });

  botonOcultarCarrito.addEventListener('click', function() {
    contenedorCarrito.classList.remove('active'); // Ocultar el carrito al hacer clic en el botón "Ocultar Carrito"
  });

  let temporizadorIntervalo; // Variable para almacenar el intervalo del temporizador
  let segundosRestantes = 60; // Duración inicial del temporizador en segundos (1 minuto)
  
  // Función para cargar los datos del carrito desde el almacenamiento local
  function cargarCarritoDesdeLocalStorage() {
    const datosGuardados = localStorage.getItem('cartData');

    if (datosGuardados) {
      const datosParseados = JSON.parse(datosGuardados);

      datosParseados.forEach(item => {
        const nuevaFila = document.createElement('tr');
        nuevaFila.dataset.codigo = item.codigo;
        nuevaFila.innerHTML = `
          <td>${item.codigo}</td>
          <td>${item.nombre}</td>
          <td>${item.precio}</td>
          <td class="cantidad"><input type="text" value="${item.cantidad}" readonly></td>
          <td class="total">${item.total}</td>
        `;

        const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
        cuerpoTabla.appendChild(nuevaFila);
      });

      // Calcular el total general
      calcularTotalGeneral();
    }
  }

  // Función para guardar los datos del carrito en el almacenamiento local
  function guardarCarritoEnLocalStorage() {
    const filasTabla = document.querySelectorAll('.tabla-carrito tbody tr');
    const datosGuardados = [];

    filasTabla.forEach(fila => {
      const codigo = fila.dataset.codigo;
      const nombre = fila.cells[1].textContent;
      const precio = parseFloat(fila.cells[2].textContent);
      const cantidad = parseInt(fila.querySelector('.cantidad input').value);
      const total = parseFloat(fila.cells[4].textContent);

      datosGuardados.push({
        codigo: codigo,
        nombre: nombre,
        precio: precio,
        cantidad: cantidad,
        total: total
      });
    });

    localStorage.setItem('cartData', JSON.stringify(datosGuardados));
  }

  // Función para calcular el total general
  function calcularTotalGeneral() {
    const filas = document.querySelectorAll('.tabla-carrito tbody tr');
    let totalGeneral = 0;
    filas.forEach(fila => {
      const totalFila = parseFloat(fila.cells[4].textContent);
      totalGeneral += totalFila;
    });

    // Redondear hacia abajo el total general y mostrarlo como número entero
    totalGeneral = Math.floor(totalGeneral);

    // Actualizar el total general en el pie de la tabla
    const totalGeneralElemento = document.querySelector('.tabla-carrito tfoot td:last-child');
    totalGeneralElemento.textContent = '₡' + totalGeneral;
  }

  // Función para actualizar el temporizador en la página del carrito
  function actualizarTemporizador() {
    const temporizadorElemento = document.getElementById('temporizador');

    temporizadorIntervalo = setInterval(function() {
      segundosRestantes--;
      if (segundosRestantes <= 0) {
        clearInterval(temporizadorIntervalo); // Detener el temporizador cuando llegue a cero
        temporizadorElemento.textContent = 'El tiempo ha expirado';
        // Eliminar los datos del carrito del almacenamiento local
        localStorage.removeItem('cartData');
        // Actualizar la página después de eliminar el almacenamiento
        location.reload();
      } else {
        const minutos = Math.floor(segundosRestantes / 60);
        const segundos = segundosRestantes % 60;
        temporizadorElemento.textContent = `Tiempo restante: ${minutos}:${segundos < 10 ? '0' : ''}${segundos}`;
      }
    }, 1000); // Actualizar cada segundo
  }

  function actualizarCantidadCarrito() {
    const cantidadMostrarCarritoElemento = document.getElementById('cantidadMostrarCarrito');
    const cantidadMostrarCarrito = parseInt(cantidadMostrarCarritoElemento.textContent) || 0;
    cantidadMostrarCarritoElemento.textContent = cantidadMostrarCarrito + 1;
  }

  // Llamar a la función para cargar los datos del carrito al cargar la página
  cargarCarritoDesdeLocalStorage();

  // Agregar un evento click a cada botón "Agregar al carrito"
  const botonesAgregarCarrito = document.querySelectorAll('.agregar-al-carrito');
  botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', () => {
      // Iniciar el temporizador solo si aún no ha sido iniciado
      if (!temporizadorIntervalo) {
        actualizarTemporizador();
      }

      const codigo = boton.getAttribute('data-codigo');
      const nombre = boton.getAttribute('data-nombre');
      const precio = parseFloat(boton.getAttribute('data-precio'));
      const cantidadInput = boton.parentElement.querySelector('.cantidad input');
      const cantidad = parseInt(cantidadInput.value);
      const total = precio * cantidad;

      // Buscar si ya existe una fila con el mismo código
      const filaExistente = document.querySelector(`.tabla-carrito tbody tr[data-codigo="${codigo}"]`);

      if (filaExistente) {
        // Si existe, actualizar la cantidad y el total
        const cantidadCelda = filaExistente.querySelector('.cantidad input');
        const nuevaCantidad = parseInt(cantidadCelda.value) + cantidad;
        cantidadCelda.value = nuevaCantidad;
        filaExistente.querySelector('.total').textContent = precio * nuevaCantidad;
      } else {
        // Si no existe, agregar una nueva fila
        const nuevaFila = document.createElement('tr');
        nuevaFila.dataset.codigo = codigo;
        nuevaFila.innerHTML = `
          <td>${codigo}</td>
          <td>${nombre}</td>
          <td>${precio}</td>
          <td class="cantidad"><input type="text" value="${cantidad}" readonly></td>
          <td class="total">${total}</td>
        `;

        const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
        cuerpoTabla.appendChild(nuevaFila);

        cantidadInput.value = 1; // Establecer el valor a 1
      }

      // Calcular el total general
      calcularTotalGeneral();

      // Guardar el carrito en el almacenamiento local
      guardarCarritoEnLocalStorage();

      // Actualizar la cantidad en el botón
      actualizarCantidadCarrito();
    });
  });
});

// Esto es para que cuando se envie el correo aparezca un mensaje 
document.querySelector('formulario-contacto').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe automáticamente
    
    // Envía el formulario de forma asincrónica utilizando Fetch API o XMLHttpRequest
    fetch('https://formsubmit.co/2a1680794fd69a882a28c2cdff5f6000', {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => {
        if (response.ok) {
            alert("Pronto nos pondremos en contacto contigo.");
            // Redirigir a la página de destino después de enviar el formulario
            window.location.href = 'https://mel19matamoros.github.io/MelanyCosmetics.github.io/contacto.html';
        } else {
            alert("Hubo un error al enviar el correo.");
        }
    })
    .catch(error => {
        alert("Hubo un error al enviar el correo.");
        console.error('Error:', error);
    });
});

// Función para guardar los valores de las cajas de texto en localStorage
function guardarDatos() {
    var email = document.getElementById('Email').value;
    var nombre = document.getElementById('Nombre').value;
    var nacimiento = document.getElementById('Nacimiento').value;
    var genero = document.getElementById('Genero').value;
    var tipoPiel = document.getElementById('Tipo-Piel').value;

    localStorage.setItem('email', email);
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('nacimiento', nacimiento);
    localStorage.setItem('genero', genero);
    localStorage.setItem('tipoPiel', tipoPiel);
}

// Función para cargar los valores guardados en localStorage y colocarlos en las cajas de texto
function cargarDatos() {
    document.getElementById('Email').value = localStorage.getItem('email') || '';
    document.getElementById('Nombre').value = localStorage.getItem('nombre') || '';
    document.getElementById('Nacimiento').value = localStorage.getItem('nacimiento') || '';
    document.getElementById('Genero').value = localStorage.getItem('genero') || '';
    document.getElementById('Tipo-Piel').value = localStorage.getItem('tipoPiel') || '';
}

// Cargar los datos almacenados cuando la página se carga
window.onload = cargarDatos;

// Guardar los datos cuando el formulario se envía
document.querySelector('formulario-contacto').addEventListener('submit', function(event) {
    guardarDatos();
});

// Para cuando presiono el boton de comprar me aparezca otra hoja de html
document.addEventListener('DOMContentLoaded', function() {
  const listaProductos = document.getElementById('lista-productos');

  // Recuperar los datos del carrito del almacenamiento local
  const datosGuardados = localStorage.getItem('cartData');

  if (datosGuardados) {
      const datosParseados = JSON.parse(datosGuardados);

      // Iterar sobre los datos del carrito y mostrarlos en la lista de productos
      datosParseados.forEach(item => {
          const nombreProducto = item.nombre;
          const cantidadProducto = item.cantidad;

          // Crear un elemento de lista para cada producto
          const itemProducto = document.createElement('li');
          itemProducto.textContent = `${nombreProducto} - Cantidad: ${cantidadProducto}`;

          // Agregar el elemento de lista al contenedor de lista de productos
          listaProductos.appendChild(itemProducto);
      });
  }

  // Agregar evento para limpiar el carrito cuando se envía el formulario
  const formularioCompra = document.getElementById('formulario-compra');
  formularioCompra.addEventListener('submit', function(event) {
      // Evitar que el formulario se envíe por defecto
      event.preventDefault();

      // Limpiar la tabla del carrito (eliminar filas)
      const cuerpoTabla = document.querySelector('.tabla-carrito tbody');
      cuerpoTabla.innerHTML = '';

      // Limpiar el almacenamiento local
      localStorage.removeItem('cartData');

      window.location.href = 'productos.html';
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const botonCompraAzul = document.getElementById('botonComprarAzul');
  const listaProductosCarrito = document.getElementById('lista-productos');

  botonCompraAzul.addEventListener('click', function() {
      const filasProductos = document.querySelectorAll('.tabla-carrito tbody tr');
      
      // Limpiamos la lista de productos en el carrito antes de agregar nuevos
      listaProductosCarrito.innerHTML = '';

      filasProductos.forEach(function(fila) {
          const nombre = fila.querySelector('td:nth-child(2)').innerText;
          const cantidad = fila.querySelector('td:nth-child(4)').innerText;

          // Creamos un elemento de lista con los detalles del producto
          const productoItem = document.createElement('li');
          productoItem.textContent = `${nombre} - Cantidad: ${cantidad}`;

          // Agregamos el elemento de lista a la lista de productos en el carrito
          listaProductosCarrito.appendChild(productoItem);
      });
  });
});
