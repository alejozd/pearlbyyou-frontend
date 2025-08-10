import React from "react";

export default function AboutUs() {
  return (
    <div className="px-4 md:px-2 lg:px-8 mt-5">
      <div className="text-center">
        <h1 className="text-pearl text-5xl md:text-6xl font-bold mb-3">
          Sobre Nosotros
        </h1>
        <p className="text-pearl text-xl md:text-2xl mt-0 mb-5">
          Descubre la historia detrás de Pearl by You.
        </p>
      </div>
      <div className="grid justify-content-center">
        <div className="col-12 md:col-10 lg:col-8">
          <p className="text-pearl line-height-3 text-lg">
            En Pearl by You, creemos que un bolso es más que un simple
            accesorio; es una extensión de tu personalidad y estado de ánimo.
            Nuestra marca nació de la pasión por crear piezas únicas que
            combinan diseño moderno con artesanía de calidad. Cada uno de
            nuestros bolsos es confeccionado con atención al detalle y
            materiales cuidadosamente seleccionados para ofrecerte una pieza que
            te acompañe en cada momento.
          </p>
          <p className="text-pearl line-height-3 text-lg mt-3">
            Nuestra misión es empoderar a cada mujer, ofreciéndole un bolso que
            la haga sentir segura, elegante y auténtica. Queremos ser parte de
            tus historias, tus celebraciones y tu día a día. ¡Gracias por ser
            parte de nuestro viaje!
          </p>
        </div>
      </div>
    </div>
  );
}
