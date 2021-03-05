(function(){
  //Creamos el efecto parallax del fondo de imagen en Contacto

  // Objetos con propiedades de Parallax
  var propiedadesParallax = {
    seccion: document.querySelector('.parallax'),
    recorrido: null,
    limite: null,
  }

  // Objeto con Métodos de Parallax
  var metodosParallax = {
    inicio: function() {
      //hacemos un evento del window del documento para hacer recorrer la img, mientras el scroll baja
      window.addEventListener('scroll', metodosParallax.scrollParallax);
    },

    scrollParallax: function() {
      /**
      'window.pageYOffset', este método sirve para saber cuanto de scroll hacemos al recorrer la página
      y nos la muestra en px
      **/
      propiedadesParallax.recorrido = window.pageYOffset;
      /*
      'offsetTop', nos ayuda a saber la altura en px desde el tope de la página hasta el elemento
      que le indicamos, y esa diferencia de de altura nos la muestra en px.

      'offsetHeight', nos ayuda a saber la altura en px de un elemento
      */

      /* Y al final sumamos las medidas obtenidas para obtener la mediad exacta que queramos
        Establecimos el el recorrido y el límite del scroll en el documento
        Y almacenamos todo esto en una propiedad llamada 'limite'
      */
      propiedadesParallax.limite = propiedadesParallax.seccion.offsetTop + propiedadesParallax.seccion.offsetHeight;

      /*
      HACEMOS UNA CONDICIONAL PARA EL FUNCIONAMIENTO DEL PARALLAX:
        *Primero comparamos si el recorrido que hicimos con el scroll es mayor a la medida que es desde el tope hasta el elemento de contacto menos
          el tamaño de la altura de todo el navegador, sacando así un offsetTop total, para que el efecto parallax funcione desde mucho más antes
          de llegar a la sección de contacto y así no mostrarnos espacios en blanco en el top de la img.

        *Segundo evaluamos si el recorrido con el scroll por el navegador es menor o igual al limite, así para que cuando se pase el scroll del límite dado
            a recorrer, está segunda parte del if no se cumpla y al ser un '&&' toda la condición se vuelve false y no se hace ya el efecto parallax cuando
            ya se pase esa sección de la img.
      */
      if ( propiedadesParallax.recorrido > propiedadesParallax.seccion.offsetTop - window.outerHeight && propiedadesParallax.recorrido <= propiedadesParallax.limite ) {

        /*
          CUMPLIDA LA CONDICIÓN:
          * Damos el estilo de la posiciónY dandole el valor del recorrido del scroll menos la distancia desde el tope de la página hasta el inicio del elemento
          * Luego lo dividimos entre 1.5 px, debemos indicar que son en px, ya que el navegador nos lanza los valores en px.
          * Se divive entre 1.5 porque queremos que la img baje un poco mas lento, ya que el navegador al hacer scroll baja cada 100px y nosotros al dividir
            entre 1.5, estamos reduciendo la cantidad de pixeles en la que baja la img y así hacerlo más lento dandole ese pequeño estilo
        */
        propiedadesParallax.seccion.style.backgroundPositionY = (propiedadesParallax.recorrido - propiedadesParallax.seccion.offsetTop) / 1.5 + 'px';

      } else {
          //Y bueno si no se cumple la condición que la posición en Y no reduzca nada y sea cero.
          propiedadesParallax.seccion.style.backgroundPositionY = 0;
      }


    }
  }

  metodosParallax.inicio();

}());
