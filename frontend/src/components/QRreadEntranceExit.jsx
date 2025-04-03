import React, { useState } from "react";
import jsQR from "jsqr";
import { updateReservationQR } from "../services/reservations/api";
import { useNavigate } from "react-router-dom";

const QRreadEntranceExit = ({ isOpen, onClose, type }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [qrContent, setQrContent] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const allowedTypes = ["image/png", "image/jpeg"];
      if (allowedTypes.includes(file.type)) {
        setSelectedFile(file);
      } else {
        alert(
          "Tipo de archivo no soportado. Por favor selecciona un archivo png o jpg."
        );
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!selectedFile) {
      alert("Por favor, sube un archivo.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const imageDataUrl = e.target.result;
      const image = new Image();
      image.src = imageDataUrl;
      image.onload = async () => {
        const canvas = document.createElement("canvas");
        canvas.width = image.width;
        canvas.height = image.height;
        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, image.width, image.height);
        const imageData = context.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const code = jsQR(imageData.data, canvas.width, canvas.height);
        if (code) {
          setQrContent(code.data);
          const qrId = code.data;
          console.log(qrId.split(",")[0].split(":")[1].trim(), "qr");
          try {
            await updateReservationQR({
              id: qrId.split(",")[0].split(":")[1].trim(),
              type: type,
            });
            console.log("QR Code content:", code.data);
            if (type == 1) {
              alert("Bienvenido a la unidad.");
            } else {
              alert("Gracias por utilizar nuestros servicios, buen viaje.");
            }
            navigate(0);
          } catch {
            alert("Tenemos problemas en el sistema, intentelo más tarde.");
          }
        } else {
          alert(
            "No se pudo leer el código QR. Asegúrate de que la imagen contenga un QR válido."
          );
        }
      };
      image.onerror = () => {
        alert("Error al cargar la imagen.");
      };
    };
    reader.onerror = () => {
      alert("Error al leer el archivo.");
    };
    reader.readAsDataURL(selectedFile);
  };

  // Función para cerrar el modal y limpiar el estado
  const handleCloseModal = () => {
    setSelectedFile(null);
    setQrContent("");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal fade show"
      tabIndex="-1"
      role="dialog"
      style={{ display: "block", backgroundColor: "rgba(0, 0, 0, 0.5)" }}
    >
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{type === 1 ? "Entrada" : "Salida"}</h5>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={handleCloseModal}
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <input
                  type="file"
                  className="form-control"
                  accept=".png, .jpg, .jpeg"
                  onChange={handleFileChange}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                {type === 1 ? "Leer QR  de entrada" : "Leer QR de salida"}
              </button>
            </form>
            {qrContent && (
              <div className="mt-3">
                <p>Contenido del QR:</p>
                <pre>{qrContent}</pre>
              </div>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseModal}
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRreadEntranceExit;
