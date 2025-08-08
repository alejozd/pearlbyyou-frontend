import React from "react";

// ✅ Correcto: Usa primeflex directamente
import "primeflex/primeflex.css"; // ← Así se importa el CSS

// ✅ PrimeReact no tiene 'Container' como componente, pero puedes usar divs con clases de primeflex
// o crear tu propio contenedor con className

// Ejemplo con primeflex: usa 'p-container' o clases como 'grid', 'col', 'mx-2', etc.
export default function Home() {
  return (
    <div className="py-5">
      {/* ✅ Usa primeflex: container + centrado */}
      <div className="px-4 md:px-6 lg:px-8">
        <div className="text-center mb-5">
          <h2 className="text-900 text-3xl font-bold">Nuestros Bolsos</h2>
          <p className="text-600">
            Descubre nuestros diseños únicos y hechos a mano.
          </p>
        </div>

        {/* Grid con primeflex */}
        <div className="grid grid-nogutter justify-content-center gap-4">
          {/* Aquí van tus ProductCard */}
          {/* (el código de map sigue igual) */}
        </div>
      </div>
    </div>
  );
}
