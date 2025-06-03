// src/pages/PagoPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { Compra } from "../models/Compra";
import { CompraService } from "../services/compraService";

const PagoPage = () => {
  const { compraId } = useParams();
  const navigate = useNavigate();
  const [compra, setCompra] = useState<Compra | null>(null);
  const compraService = new CompraService();

  useEffect(() => {
    if (compraId) {
      compraService
        .obtenerDetalleCompra(Number(compraId))
        .then((data) => setCompra(data))
        .catch((error) => {
          console.error(error);
          alert("No se pudo obtener la información de la compra.");
        });
    }
  }, [compraId]);

  const confirmarPago = () => {
    navigate(`/confirmacion/${compraId}`);
  };

  if (!compra) {
    return <div className="p-6">Cargando compra...</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Pago de Compra</h1>
      <p className="mb-2">
        <strong>Monto Total:</strong> Bs. {compra.total}
      </p>

      <div className="my-4">
        <img
          src="/public/image.png"
          alt="QR de pago"
          className="mx-auto"
        />
        <p className="text-center text-sm mt-2">Escanee para pagar (QR ficticio)</p>
      </div>

      <div className="text-center mt-6">
        <button
          onClick={confirmarPago}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded"
        >
          Confirmar Pago
        </button>
      </div>
    </div>
  );
};

export default PagoPage;
