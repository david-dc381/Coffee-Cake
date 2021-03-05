//Para la versión móvil

//Propiedades de menu movil

var propMenu = {
  burger_menu: document.getElementById('burger-menu'),
  slideMenu: document.getElementById('slideMenu'),
  menu_activo: false, //para ver si el menu es activado o se hizo click en el
  elem_menu: document.querySelectorAll('#slideMenu .menu-principal a'), //seleccionamos los enlaces del menu
}

// Métodos de menu movil
var metMenu = {
  inicio: function() {
    //añadimos un evento click al icono de burger_menu
    propMenu.burger_menu.addEventListener('click', metMenu.toogleMenu);

    //recorremos todos los elementos de tipo enlace
    for (var i = 0; i < propMenu.elem_menu.length; i++) {
      //le damos un evento click a cada enlace
      propMenu.elem_menu[i].addEventListener('click', metMenu.ocultarMenu);
    }
  },

  toogleMenu: function(){
    //si es falso
    if ( propMenu.menu_activo == false ) {
        //lo volvemos a true
        propMenu.menu_activo = true;
        //añadimos una clase más a al slice menu que es el padre que contiene los demás elementos
        propMenu.slideMenu.className = propMenu.slideMenu.className + ' active';

    } else {
      //para ocultar el menu cuando se hace click otra vez en el icono del menu
      //si esta en true lo volvemos a false
      propMenu.menu_activo = false;
      //y con replace remplazamos la clase 'active' por una vacía, una que no tenga nada
      propMenu.slideMenu.className = propMenu.slideMenu.className.replace('active', '');
    }
  },

  //oculta el menu cuando le damos click a una seccion del document en el menu desplegable
  ocultarMenu: function() {
    //hacemos los mismo que el else
    //convertirmos el menu activo a false
    propMenu.menu_activo = false;
    //y con replace remplazamos la clase 'active' por una vacía, una que no tenga nada
    propMenu.slideMenu.className = propMenu.slideMenu.className.replace('active', '');
  }
}
metMenu.inicio();
