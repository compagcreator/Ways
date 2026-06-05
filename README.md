# WAYS · Sitio de estética y uñas

Sitio estático (sin backend) con 3 funciones:

1. **Tomar pedidos** → el formulario de turnos arma un mensaje y lo abre en WhatsApp.
2. **Pagar la seña** → botón que redirige a tu link de pago (Mercado Pago / MODO).
3. **Contacto directo** → botón flotante de WhatsApp + CTA en el hero.

## ▶️ Cómo verlo
Abrí `index.html` con doble clic, o levantá un servidor local:
```
npx serve .
```

## ⚙️ Configuración (lo único obligatorio)
Editá el bloque `CONFIG` arriba de **`script.js`**:

| Campo | Qué poner |
|-------|-----------|
| `whatsapp` | Tu número internacional sin `+` ni espacios. AR: `549` + característica sin `0` + número sin `15`. Ej: `5491123456789` |
| `paymentLink` | Tu link de cobro de la seña (Mercado Pago, MODO…). Si lo dejás vacío, el botón de pago pide el link por WhatsApp. |
| `mapsLink` | Link de Google Maps de tu local. |
| `defaultMsg` | Mensaje precargado del botón de WhatsApp. |

## ✏️ Personalizar
- **Nombre/marca**: buscá `WAYS` en `index.html`.
- **Servicios y precios**: sección `#servicios` en `index.html`.
- **Colores**: variables `:root` arriba de `styles.css`.
- **Foto del hero**: cambiá `img/nail-01.jpg` en `.hero__img` (`styles.css`) por la que prefieras.
- **Galería**: las fotos están en `img/` como `nail-01.jpg … nail-28.jpg`. Para agregar/quitar, ajustá `TOTAL_FOTOS` arriba de `script.js`.

## 🚀 Publicar
Subí la carpeta a Vercel, Netlify o GitHub Pages. Al ser estático, no requiere build.
