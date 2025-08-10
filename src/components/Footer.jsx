import React from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";

export default function Footer() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hola!%20Estoy%20interesado%20en%20tus%20bolsos.`;

  return (
    <footer className="bg-pearl-light text-pearl-dark py-6 mt-7">
      <div className="px-4 md:px-2 lg:px-8">
        <div className="grid">
          {/* Sección de Logo y Copyright */}
          <div className="col-12 md:col-4">
            <h3 className="font-bold text-3xl">PEARL</h3>
            <p className="line-height-3 text-sm">
              Tu bolso, tu mood. Accesorios únicos para cada ocasión.
            </p>
            <p className="text-sm mt-3">
              &copy; 2025 Pearl by You. Todos los derechos reservados.
            </p>
          </div>

          {/* Sección de Enlaces */}
          <div className="col-12 md:col-4">
            <h3 className="font-bold text-2xl">Enlaces</h3>
            <ul className="list-none p-0 m-0 line-height-3">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-pearl-dark no-underline hover:text-pearl-dark-hover transition-colors duration-200"
                >
                  Inicio
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/catalogo"
                  className="text-pearl-dark no-underline hover:text-pearl-dark-hover transition-colors duration-200"
                >
                  Catálogo
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre-nosotros"
                  className="text-pearl-dark no-underline hover:text-pearl-dark-hover transition-colors duration-200"
                >
                  Sobre Nosotros
                </Link>
              </li>
            </ul>
          </div>

          {/* Sección de Contacto y Redes Sociales */}
          <div className="col-12 md:col-4">
            <h3 className="font-bold text-2xl">Contáctanos</h3>
            <div className="flex align-items-center mb-2">
              <i className="pi pi-whatsapp mr-2 text-xl" />
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pearl-dark no-underline hover:text-pearl-dark-hover transition-colors duration-200"
              >
                +{WHATSAPP_PHONE_NUMBER}
              </a>
            </div>
            <div className="flex align-items-center mb-4">
              <i className="pi pi-envelope mr-2 text-xl" />
              <a
                href="mailto:tu-correo-aqui@ejemplo.com"
                className="text-pearl-dark no-underline hover:text-pearl-dark-hover transition-colors duration-200"
              >
                tu-correo-aqui@ejemplo.com
              </a>
            </div>
            <h4 className="font-bold text-lg mt-0">Síguenos</h4>
            <div className="flex gap-2 mt-2">
              <Button
                icon="pi pi-instagram"
                rounded
                text
                severity="secondary"
                onClick={() =>
                  window.open("https://instagram.com/pearlbyou", "_blank")
                }
                aria-label="Instagram"
              />
              <Button
                icon="pi pi-facebook"
                rounded
                text
                severity="secondary"
                onClick={() =>
                  window.open("https://facebook.com/pearlbyou", "_blank")
                }
                aria-label="Facebook"
              />
              <Button
                icon="pi pi-tiktok"
                rounded
                text
                severity="secondary"
                onClick={() =>
                  window.open("https://www.tiktok.com/@pearl_byou", "_blank")
                }
                aria-label="TikTok"
              />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
