document.getElementById("location-btn").addEventListener("click", function() {
    var mapContainer = document.getElementById("map-container");
    var mapIframe = document.getElementById("map-iframe");
  
    // Si el mapa ya está visible, lo oculta
    if (mapContainer.style.display === "block") {
        mapContainer.style.display = "none";
    } else {
        // Si el mapa no está visible, muestra el mapa
        // Reemplaza la URL del iframe con la URL de Google Maps que proporciona la ubicación exacta
        mapIframe.src = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d291.931031014439!2d-84.29977203391974!3d10.120345706202865!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8fa058cd3aa97a0b%3A0xe9101af95f237827!2s4PC2%2B545%2C%20Provincia%20de%20Alajuela%2C%20Caj%C3%B3n!5e0!3m2!1ses!2scr!4v1711485368124!5m2!1ses!2scr";
      
        // Muestra el contenedor del mapa
        mapContainer.style.display = "block";
    }
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
        $('#animated-heading').animate({'width': '100%'}, 2000);
    });
});

document.querySelector('form').addEventListener('submit', function(event) {
        // Muestra el mensaje apenas se envía el formulario
        alert("El correo ha sido enviado satisfactoriamente al correo suministrado.");

        // Puedes agregar cualquier lógica adicional aquí, como redireccionar al usuario a otra página
});
