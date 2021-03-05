
//Hacemos el efecto de bajar y subir el scroll

//Objeto con propiedades
var propScroll = {
  posicion: window.pageYOffset, //obtenemos la altura que recorremos con el scroll
  scroll_suave: document.getElementsByClassName('scroll-suave'),//para hacer la bajada del scroll suave
  volver_arriba: document.getElementsByClassName('volver-arriba'),//para volver a la parte de arriba de la página
  destino: null, // a donde vamos a ir
  seccion_distancia: null, // la distancia de la sección a la cual queremos ir
  intervalo: null, // el tiempo en que se va a recorrer la distancia a la queremos ir
}

//Objeto con métodos de efecto scroll
var metScroll = {
    inicio: function() {
      //recorremos los elementos
      for (var i = 0; i < propScroll.scroll_suave.length; i++) {
        propScroll.scroll_suave[i].addEventListener('click', metScroll.moverse);
      }

      //recorremos el elemento aunque sea solo uno, porque talvez más adelante aumentamos otros elementos con la misma clase
      for (var i = 0; i < propScroll.volver_arriba.length; i++) {
        propScroll.volver_arriba[i].addEventListener('click', metScroll.subir);
      }

    },

    moverse: function (e) {
      //detenemos el evento por defecto de click, para obtener el href
      e.preventDefault();
      clearInterval(propScroll.intervalo); //limpiamos el intervalo al comienzo, porque cuando damos muchas veces click
      //a distintos enlaces los intervalos chocan entre si y se cargan y eso genera un error

      //obtenemos el atributo 'href' o sea el contenido que tendra este, depende a donde demos click
      propScroll.destino = this.getAttribute('href');

      //obtenemos la altura desde el tope del elemento hasta el elemento en el que hagamos click y le restamos 94px
      //para que no nos tape el titulo del menu de cada elemento
      propScroll.seccion_distancia = document.querySelector(propScroll.destino).offsetTop - 94;

      /*necesitamos obtener otra vez la distancia del tope al elemento, porque que pasa si
      no estamos en el principio de un elemento, sino estamos a medio elemento y queremos ir a
      otro elemento y si no obtenemos otra vez la distancia del elemento tope, nos moveremos
      de manera brusca */
      propScroll.posicion = window.pageYOffset;

      //hacemos un intervalo para que cierto tiempo se nos mueva el scroll
      propScroll.intervalo = setInterval( function(){
        //si la distancia donde esta el scroll actualmente es menor a la distancia donde se encuentra posicionada el elemento
        if (propScroll.posicion < propScroll.seccion_distancia) {
          //si se cumple la condición, la posicion va ir avanzando de 30px en 30px hasta llegar al elemento que le dimos click
          //sino le decimos que vaya de 30 en 30 no avanzara hacia abajo
          propScroll.posicion += 30;

          //Y si la posicion actual del scroll es mayor a la distancia donde esta el elemento al que hicimos click
          if (propScroll.posicion >= propScroll.seccion_distancia) {
            /*primero limpiamos el anteior intervalo o recorrido que hizo mas antes el scroll, porque no nos dejara subir a un elemento mas arriba
            y no limpiamos el intervalo anterior dado*/
            clearInterval(propScroll.intervalo);
          }

      } else {
        //esto pasara si la posicion no es menor a la distancia del elemento que le dimos clik, hara lo contrario, lo reducirá de 30px en 30px
        //porque sino le decimos que reduzca no nos dejara ir hacia arriba con el scroll
        propScroll.posicion -= 30;

        //si la posicion del scroll es menor o igual al lugar del elemento que dimos clik
        if (propScroll.posicion <= propScroll.seccion_distancia) {
          //igual limpiamos el intervalo anterior
          clearInterval(propScroll.intervalo);
        }
      }
      //esta funcion nos traslada en scroll atravez de la pantalla a una distancia que le demos
      //pasamos dos valores uno e n X y otro en Y, el de X lo dejamos en cero, el de Y lo ponemos segun la posicion del elemento al que dimos click
      window.scroll(0, propScroll.posicion);
    }, 15);//le decimos que se mueva de 30px en 30px cada 15 milisegundos
  },

  //para subir al enlace del home
  subir: function(e) {
    e.preventDefault();
    clearInterval(propScroll.intervalo);//limpiamos el intervalo al comiezo, porque cuando damos muchas veces click
    //a distintos enlaces los intervalos chocan entre si y se cargan y eso genera un error

    //otra vez obtenemos la distancia en px desde el tope al elemento que hicimos click
    propScroll.posicion = window.pageYOffset;

    //le damos un intervalo
    propScroll.intervalo = setInterval( function(){
      //si la posición del scroll es mayor a cero o sea a la seccion del home
      if (propScroll.posicion > 0) {
        //reducimos para subir el scroll al home
        propScroll.posicion -= 30;
        //si la posición del scroll es menor o igual a cero
        if (propScroll.posicion <= 0) {
          //limpiamos siempre el intervalo anterior para poder movernos
          clearInterval(propScroll.intervalo);
        }

      } else {
        /*
        ponemos el return, poque cuando le damos doble click al enlace del home no podemos
        bajar el scroll a las demás secciones, y si no se cumple la condición de arriba y
        nos encontramos en cero, con return le decimos que la función se detenga, la función
        del intervalo y como no pasamos ningun valor nos devuelve undefined. Ya no avanza más
        abajo a la parte de 'window.scrollTo(0, propScroll.posicion);'
        */
        return;
      }
      window.scrollTo(0, propScroll.posicion);
    }, 15);
  }
}
metScroll.inicio();
