# 🛡️ SENTINEL LUZ FEC - Sistema de Verificación Estudiantil

![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![GitHub Pages](https://img.shields.io/badge/github%20pages-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

**SENTINEL LUZ FEC** es una aplicación web del tipo *Prueba de Concepto (PoC)* diseñada para simular un sistema de control de acceso estudiantil mediante códigos QR. Desarrollado con una interfaz moderna y futurista basada en **Glassmorphism**, el sistema opera de manera 100% local, ideal para despliegues rápidos y gratuitos en **GitHub Pages**.

---

## ✨ Características Principales

* **Registro Local:** Permite registrar estudiantes directamente en el navegador guardando la información de manera segura en `localStorage`.
* **Generación de QR Dinámica:** Genera de forma automática un código QR de alta fidelidad utilizando la cédula del estudiante como identificador único.
* **Filtro por Carrera:** Validación automática en el formulario de registro para permitir únicamente el acceso a carreras autorizadas de la Facultad Experimental de Ciencias (FEC).
* **Escáner QR Integrado:** Utiliza la cámara del dispositivo en tiempo real para escanear, descifrar y verificar si el estudiante está registrado.
* **Módulo de Impresión Integrado:** Estilos CSS (`@media print`) optimizados para imprimir o guardar en PDF la credencial de acceso QR de forma limpia y profesional.

---

## 🛠️ Tecnologías y Librerías Utilizadas

El proyecto fue construido utilizando tecnologías web estándar (Vanilla Web) para asegurar ligereza y nula dependencia de servidores backend:

* **HTML5 & CSS3:** Estructuración y diseño responsivo usando variables CSS y animaciones fluidas de fondo.
* **Vanilla JavaScript (ES6+):** Lógica del negocio, manejo del DOM y almacenamiento local.
* **Fuentes:** [Outfit](https://fonts.google.com/specimen/Outfit) de Google Fonts.
* **Librerías Externas via CDN:**
    * [QRCode.js](https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js) - Para la generación de los códigos QR.
    * [Html5-Qrcode](https://unpkg.com/html5-qrcode) - Framework robusto para el escaneo de códigos QR a través de la cámara web.

---

## 🚀 Instalación y Despliegue Local

Para ejecutar este proyecto localmente en tu computadora, no necesitas configurar ningún servidor (Node.js, Apache, etc.). Sigue estos sencillos pasos:

1. **Clona este repositorio:**
   ```bash
   git clone [https://github.com/TU-USUARIO/TU-REPOSITORIO.git](https://github.com/TU-USUARIO/TU-REPOSITORIO.git)
