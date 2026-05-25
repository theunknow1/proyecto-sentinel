document.addEventListener('DOMContentLoaded', () => {
    // Manejo de pestañas
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            btn.classList.add('active');
            document.getElementById(btn.dataset.target).classList.add('active');
            // Detener el escáner si cambiamos de pestaña
            if(btn.dataset.target !== 'escaner' && html5QrcodeScanner) {
                stopScanner();
            }
        });
    });
    // Base de datos simulada usando localStorage para mantenerla oculta.
    // En un entorno de GitHub Pages sin backend, esto guarda la info de manera local
    // y solo puede validarse en este navegador. Sirve perfectamente de prueba conceptual.
    const DB_KEY = 'sentinel_luz_fec_students';
    const getStudents = () => JSON.parse(localStorage.getItem(DB_KEY)) || {};
    const saveStudent = (student) => {
        const students = getStudents();
        students[student.cedula] = student;
        localStorage.setItem(DB_KEY, JSON.stringify(students));
    };
    // Registro y Generación de QR
    const form = document.getElementById('registroForm');
    const qrResult = document.getElementById('qrResult');
    const qrcodeContainer = document.getElementById('qrcode');
    const carrerasPermitidas = [
        "Física", "Biología", "Matemáticas", 
        "Antropología", "Computación", "Química"
    ];
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value.trim();
        const apellido = document.getElementById('apellido').value.trim();
        const cedula = document.getElementById('cedula').value.trim();
        const carrera = document.getElementById('carrera').value;
        if (!carrerasPermitidas.includes(carrera)) {
            alert("Acceso denegado: Carrera no autorizada.");
            return;
        }
        const studentData = {
            nombre,
            apellido,
            cedula,
            carrera,
            timestamp: new Date().toISOString()
        };
        saveStudent(studentData);
        // Limpiar QR anterior
        qrcodeContainer.innerHTML = '';
        // Generar QR
        new QRCode(qrcodeContainer, {
            text: cedula,
            width: 200,
            height: 200,
            colorDark : "#0f172a",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.H
        });
        qrResult.classList.remove('hidden');
        form.reset();
    });
    // Escáner de QR
    let html5QrcodeScanner = null;
    const startScanBtn = document.getElementById('startScanBtn');
    const stopScanBtn = document.getElementById('stopScanBtn');
    const scanResultContainer = document.getElementById('scanResult');
    function onScanSuccess(decodedText, decodedResult) {
        // decodedText será la cédula del estudiante
        const students = getStudents();
        const student = students[decodedText];
        scanResultContainer.classList.remove('hidden');
        
        if (student) {
            scanResultContainer.innerHTML = `
                <div class="profile-card">
                    <h3>✅ Acceso Permitido</h3>
                    <div class="profile-detail">
                        <span class="detail-label">Nombre:</span>
                        <span class="detail-value">${student.nombre} ${student.apellido}</span>
                    </div>
                    <div class="profile-detail">
                        <span class="detail-label">Cédula:</span>
                        <span class="detail-value">V- ${student.cedula}</span>
                    </div>
                    <div class="profile-detail">
                        <span class="detail-label">Carrera:</span>
                        <span class="detail-value">${student.carrera}</span>
                    </div>
                </div>
            `;
            stopScanner();
        } else {
            scanResultContainer.innerHTML = `
                <div class="alert-denied">
                    ❌ denegado usuario no encontrado
                </div>
            `;
        }
    }
    function onScanFailure(error) {
        // Ignorar
    }
    function startScanner() {
        scanResultContainer.classList.add('hidden');
        if (!html5QrcodeScanner) {
            html5QrcodeScanner = new Html5Qrcode("reader");
        }
        
        const config = { fps: 10, qrbox: { width: 250, height: 250 } };
        
        html5QrcodeScanner.start(
            { facingMode: "environment" }, 
            config, 
            onScanSuccess, 
            onScanFailure
        ).then(() => {
            startScanBtn.classList.add('hidden');
            stopScanBtn.classList.remove('hidden');
        }).catch((err) => {
            alert(`Error al iniciar la cámara: ${err}`);
        });
    }
    function stopScanner() {
        if (html5QrcodeScanner && html5QrcodeScanner.isScanning) {
            html5QrcodeScanner.stop().then(() => {
                startScanBtn.classList.remove('hidden');
                stopScanBtn.classList.add('hidden');
            }).catch((err) => {
                console.error("Failed to stop scanner", err);
            });
        }
    }
    startScanBtn.addEventListener('click', startScanner);
    stopScanBtn.addEventListener('click', stopScanner);
  
    // Imprimir Código QR
    const printQrBtn = document.getElementById('printQrBtn');
    if (printQrBtn) {
        printQrBtn.addEventListener('click', () => {
            window.print();
        });
    }
});
