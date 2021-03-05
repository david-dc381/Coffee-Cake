(function(){

  //HACEMOS LOS EFECTOS PARA EL FORMULARIO

  //Objeto con propiedades de formulario
  var propiedadesFormulario = {
    //accedemos al name del formulario  de manera directa
    formulario: document.formulario_contacto,
    //accedemos también de forma directa a los elementos del formulario inputs,etc.
    elementos: document.formulario_contacto.elements,
    error: null, //para almacenar la nueva etiqueta 'p', donde mostrarmos el error de llenado de formulario
    textoError: null, //el texto que tendra el nuevo elemento 'p'
  }

  //Objeto con métodos de formulario
    var metodosFormulario = {
      inicio: function() {
        //recorremos los elementos del formulario
        for (var i = 0; i < propiedadesFormulario.elementos.length; i++) {
          /*hacemos una condicion cuando en el recorrido de los elementos nos toque los
          input que queremos creamos dos eventos un focus y un blur.
          La ultima condicion es para ver el tipo de elemento de textarea ya que es un
          elemento node o nodo como todos los demás y le ponemos toLowerCase, porque al hacer la
          comparación de 'textarea' esta por defecto nos la comprara en mayúscula y por eso la
          cambiamos a minúscula.
          **/
          if ( propiedadesFormulario.elementos[i].type == 'text' || propiedadesFormulario.elementos[i].type == 'email' ||
              propiedadesFormulario.elementos[i].nodeName.toLowerCase() == 'textarea' ) {

                propiedadesFormulario.elementos[i].addEventListener('focus', metodosFormulario.focusInput);
                propiedadesFormulario.elementos[i].addEventListener('blur', metodosFormulario.blurInput);
          }
        }

        //Creamos un evento 'submit' para el envio de formulario, para verificar si los datos son llenados cuando se envie por submit
        propiedadesFormulario.formulario.addEventListener('submit', metodosFormulario.validarInputs);
      },

      focusInput: function() {
        /*
        selecionamos el padre del elemento al cual hacemos click en su input, una vez selecionado
        el padre, accedemos a sus hijos en el esta en la posición 1 que es el label y a ese le
        asignamos una clase extra que es el de active
        */
        this.parentElement.children[1].className = 'label active';
      },

      blurInput: function() {
        /*
        hacemos una condición donde evaluamos si el input esta vacío, no tiene nada escrito encima de el
        entonces si es así podemos quitar la clase active al elemento label
        */
        if ( this.value == '' ) {
          this.parentElement.children[1].className = 'label';
        }
      },

      validarInputs: function(e) {

        //hacemos un recorrido de todos los inputs
        for (var i = 0; i < propiedadesFormulario.elementos.length; i++) {
          //verificamos si los input estan vacios
          if ( propiedadesFormulario.elementos[i].value == '' ) {
            /*
            Si algún input está vacio detenemos su evento por defecto del formulario.
            Y como sabemos que los eventos por defecto de todo formulario es el de submit,
            pues detenemos su evento de envio.
            */
            e.preventDefault();

            /*
            Primero accedemos al padre de los elementos que es 'input-group', y luego
            averiguamos la cantidad de hijos con (children) y (lenght).
            Verificamos si la cantidad de elementos es menor a 3, en caso de ser true
            nos realizara el proceso
            */
            if ( propiedadesFormulario.elementos[i].parentElement.children.length < 3 ) {
                propiedadesFormulario.error = document.createElement('p');
                /*al mostrar el texto accedemos a la propiedad name de cada elemento en el recorrido del for,
                indicado así el respectivo nombre del input que no se lleno con los datos.*/
                propiedadesFormulario.textoError = document.createTextNode('Porfavor llena el campo con tu ' + propiedadesFormulario.elementos[i].name);
                propiedadesFormulario.error.appendChild(propiedadesFormulario.textoError);
                propiedadesFormulario.error.className = 'error';//damos la clase error al nuevo párrafo

                /* aqui accedemos al padre de los input que es 'input-group' y a partir de ahí le decimos
                  que nos agrege el nuevo párrafo que creamos, que por defecto nos lo agrega al final de
                  los elementos.
                */
                propiedadesFormulario.elementos[i].parentElement.appendChild(propiedadesFormulario.error);
            }

          } else {
            /*
              En caso contrario vemos si:
              Accedemos otra vez al padre y preguntamos si la cantidad de hijos son mayores o iguales a 3
              porque con los párrafos de mensaje de error aumentarian la cantidad de hijos.
            */
            if (propiedadesFormulario.elementos[i].parentElement.children.length >= 3) {

              /*
              Y si es igual o mayor a 3, conseguimos a todos los elementos 'p' dentro los hijos y los
                almacenamos en la propiedad 'error'.
              */
              propiedadesFormulario.error = propiedadesFormulario.elementos[i].parentElement.getElementsByTagName('p')[0];

              /*
              Despues indicamos accediendo al padre eliminar a la cantidad de párrafos que se alamacenarán
              dentro la propiedad 'error'
              */
              propiedadesFormulario.elementos[i].parentElement.removeChild(propiedadesFormulario.error);

            }
          }
        }
      }
    }
    metodosFormulario.inicio();
}());
