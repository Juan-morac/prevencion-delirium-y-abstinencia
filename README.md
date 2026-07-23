# Delirium y Abstinencia HCFB

Aplicación web progresiva (PWA) móvil para:

- Aplicar y guardar **4AT** con explicación paso a paso.
- Aplicar y guardar **CAM** con las 4 características, frases guía y apoyo visual.
- Registrar **EVA** y reevaluaciones.
- Consultar el **flujograma de delirium**.
- Revisar una pestaña de **causas frecuentes de delirium** con definición y orientación clínica básica.
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

## Identidad institucional

La versión incluye una reproducción vectorial del logo HCFB basada en el material institucional del protocolo. Antes de una publicación oficial se recomienda reemplazarla por el archivo maestro autorizado por Comunicaciones del Hospital. La paleta utiliza azul institucional, azul claro, naranja, rojo y turquesa del identificador visual.

## Módulos clínicos nuevos

- Abstinencia por alcohol, benzodiacepinas, hipnóticos Z, opioides y sedoanalgesia prolongada.
- Manejo farmacológico excepcional del delirium.
- Dosis iniciales orientativas tomadas del borrador operativo HCFB v8.
- Precauciones sobre QT, Parkinson/cuerpos de Lewy, sedación, aspiración, caídas e interacciones.

**Advertencia:** las dosis y esquemas deben ser validados formalmente por equipo médico y Farmacia Clínica antes de uso institucional. Toda indicación farmacológica corresponde a médico.
