# Delirium HCFB

Aplicación web progresiva (PWA) móvil para:

- Aplicar y guardar **4AT**.
- Aplicar y guardar **CAM**.
- Registrar **EVA** y reevaluaciones.
- Consultar el **flujograma de delirium**.
- Marcar medidas preventivas y de manejo no farmacológico.
- Leer códigos QR para registrar **asistencia a la unidad** y **visita realizada**.
- Revisar historial y exportar datos en CSV.
- Funcionar offline después de la primera carga.

## Importante

Esta aplicación es una herramienta de apoyo y no reemplaza la valoración clínica, el diagnóstico médico ni los protocolos institucionales vigentes.

La versión incluida en este ZIP guarda la información **solo en el navegador del dispositivo**. No existe sincronización entre equipos ni autenticación institucional. Para un uso hospitalario formal conviene migrar el registro a una base de datos segura con control de acceso, auditoría y autorización de la institución.

No se deben ingresar nombres completos, RUT ni otros datos sensibles de pacientes.

## Publicar en GitHub Pages

1. Crea un repositorio nuevo en GitHub, por ejemplo `delirium-hcfb`.
2. Descomprime este archivo ZIP.
3. Sube **todos los archivos y carpetas del proyecto a la raíz del repositorio**.
4. En GitHub entra a `Settings` → `Pages`.
5. En `Build and deployment`, selecciona:
   - Source: `Deploy from a branch`
   - Branch: `main`
   - Folder: `/ (root)`
6. Guarda los cambios.
7. GitHub mostrará una URL parecida a:
   `https://TU-USUARIO.github.io/delirium-hcfb/`

La cámara requiere HTTPS; GitHub Pages ya utiliza HTTPS.

## Formato de los QR

Formato simple recomendado:

```text
HCFB|VISITA|UPC ADULTO|D37
```

También se puede usar JSON:

```json
{
  "unit": "UPC Adulto",
  "location": "D37"
}
```

El QR solo contiene la ubicación. El nombre, rol y turno del funcionario se obtienen del perfil configurado en la aplicación.

## Lector QR

El lector usa la API nativa `BarcodeDetector`. Funciona principalmente en Chrome o Edge compatibles, especialmente en Android. Cuando el navegador no la soporte, la aplicación permite pegar o escribir el contenido del QR manualmente.

## PIN inicial

El PIN administrativo predeterminado es:

```text
2468
```

Cámbialo en `Configuración`.

Este PIN es una protección local básica, no una autenticación segura para producción.

## Estructura

- `index.html`: interfaz.
- `styles.css`: estilos.
- `app.js`: lógica clínica, QR, almacenamiento e historial.
- `manifest.webmanifest`: instalación PWA.
- `sw.js`: funcionamiento offline.
- `icons/`: íconos de la aplicación.

## Prueba local

Debido al Service Worker, no abras el archivo directamente con doble clic. Levanta un servidor local:

```bash
python -m http.server 8000
```

Luego abre:

```text
http://localhost:8000
```

Para probar la cámara se recomienda la URL publicada en GitHub Pages, porque usa HTTPS.