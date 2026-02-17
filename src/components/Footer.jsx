import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";
import { WHATSAPP_PHONE_NUMBER } from "../utils/constants";
import apiClient from "../utils/axios";

export default function Footer() {
  const [footerText, setFooterText] = useState("Cargando footer...");
  const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=Hola!%20Estoy%20interesado%20en%20tus%20bolsos.`;

  useEffect(() => {
    const fetchFooterContent = async () => {
      try {
        const response = await apiClient.get("/settings");
        setFooterText(
          response.data?.footer_text ||
            `© ${new Date().getFullYear()} Pearl by You. Todos los derechos reservados.`
        );
      } catch {
        setFooterText(`© ${new Date().getFullYear()} Pearl by You. Todos los derechos reservados.`);
      }
    };

    fetchFooterContent();
  }, []);

  return (
    <footer className="page-shell mt-8 mb-5">
      <div className="soft-card p-4 md:p-5">
        <div className="grid">
          <div className="col-12 md:col-4">
            <h3 className="font-semibold text-2xl m-0 mb-2">PEARL</h3>
            <p className="line-height-3 text-sm text-pearl-soft m-0">
              Tu bolso, tu mood. Piezas pensadas para elevar tu look todos los días.
            </p>
          </div>

          <div className="col-12 md:col-4">
            <h4 className="font-semibold text-xl mt-0 mb-2">Navegación</h4>
            <ul className="list-none p-0 m-0 line-height-3">
              <li><Link to="/" className="no-underline">Inicio</Link></li>
              <li><Link to="/catalogo" className="no-underline">Catálogo</Link></li>
              <li><Link to="/sobre-nosotros" className="no-underline">Sobre Nosotros</Link></li>
            </ul>
          </div>

          <div className="col-12 md:col-4">
            <h4 className="font-semibold text-xl mt-0 mb-2">Contacto</h4>
            <p className="m-0 mb-2 text-sm">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="no-underline">
                +{WHATSAPP_PHONE_NUMBER}
              </a>
            </p>
            <p className="m-0 mb-3 text-sm">
              <a href="mailto:pearlbyyou@gmail.com" className="no-underline">pearlbyyou@gmail.com</a>
            </p>
            <div className="flex gap-2">
              <Button icon="pi pi-instagram" rounded text severity="secondary" onClick={() => window.open("https://instagram.com/pearlbyou", "_blank")} aria-label="Instagram" />
              <Button icon="pi pi-facebook" rounded text severity="secondary" onClick={() => window.open("https://facebook.com/pearlbyyou", "_blank")} aria-label="Facebook" />
              <Button icon="pi pi-tiktok" rounded text severity="secondary" onClick={() => window.open("https://www.tiktok.com/@pearl_byou", "_blank")} aria-label="TikTok" />
            </div>
          </div>
        </div>

        <div className="border-top-1 mt-4 pt-3 border-300 text-sm text-pearl-soft flex flex-column md:flex-row md:justify-content-between gap-2">
          <p className="m-0">{footerText}</p>
          <p className="m-0">Desarrollado por Alejandro Zambrano</p>
        </div>
      </div>
    </footer>
  );
}
