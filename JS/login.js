const btn_iniciar = document.querySelector("#btn-iniciar");
const btn_registrar = document.querySelector("#btn-registrar");
const contenedor = document.querySelector(".contenedor");

btn_registrar.addEventListener("click", () => {
  contenedor.classList.add("modo-registrar");
});

btn_iniciar.addEventListener("click", () => {
  contenedor.classList.remove("modo-registrar");
});

$("#icono-buscar").click(function() {
  $(".nav").toggleClass("buscar");
  $(".nav").toggleClass("no-buscar");
  $(".entrada-buscar").toggleClass("buscar-activo");
});

$('.menu-toggle').click(function(){
   $(".nav").toggleClass("navegacion-movil");
   $(this).toggleClass("activo");
});
