# LinkHub

Crea páginas de enlaces (estilo Linktree) para tus clientes en minutos: sube su foto, agrega
botones con un clic, elige entre **24 plantillas** y todo se guarda automáticamente.
La página de cada cliente queda publicada con su propio enlace.

- **Panel de administrador**: crea y edita páginas, botones, plantillas, colores, degradados,
  tipografías y estilos de botón, con vista previa en vivo y autoguardado.
- **Página pública**: `https://tu-usuario.github.io/linkhub/#/p/nombre-del-cliente`
- **Stack**: React + Vite + Tailwind, Supabase (base de datos + fotos + login),
  GitHub Pages (alojamiento).

---

## 1. Configurar Supabase (una sola vez)

1. Crea un proyecto gratis en [supabase.com](https://supabase.com) (región más cercana, plan Free).
2. En el proyecto, abre **SQL Editor → New query**, pega **todo** el contenido de
   [`supabase/schema.sql`](supabase/schema.sql) y pulsa **Run**.
   Esto crea las tablas, la seguridad (RLS) y el espacio para las fotos.
3. Ve a **Project Settings → API** y copia:
   - **Project URL** (ej. `https://abcdefgh.supabase.co`)
   - **anon public key** (o la nueva `sb_publishable_…`)
4. Copia `.env.example` como `.env` y pega ahí esos dos valores:

   ```env
   VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
   VITE_SUPABASE_ANON_KEY=tu-clave-publica
   ```

   > ⚠️ La clave **secreta** (`sb_secret_…` / `service_role`) NUNCA va aquí ni en el código.
5. Crea tu usuario de administrador: **Authentication → Users → Add user**
   (tu email y una contraseña). Recomendado: en **Authentication → Sign In / Up**,
   desactiva “Allow new users to sign up”.
6. Reinicia el servidor de desarrollo.

## 2. Desarrollo local

```bash
npm install
npm run dev        # abre http://localhost:5173
```

Rutas:

| Ruta                | Qué es                                                  |
| ------------------- | ------------------------------------------------------- |
| `/#/`               | Portada                                                 |
| `/#/admin`          | Entrar al panel (tu usuario de Supabase)                |
| `/#/panel`          | Lista de páginas de tus clientes                        |
| `/#/nueva`          | Crear página (nombre, foto, enlace automático)          |
| `/#/editar/:id`     | Editor con vista previa en vivo y autoguardado          |
| `/#/p/:slug`        | Página pública del cliente                              |

## 3. Publicar en GitHub Pages

1. Instala [Git](https://git-scm.com) y [GitHub CLI](https://cli.github.com), e inicia sesión:

   ```bash
   gh auth login
   ```

2. Desde la carpeta del proyecto:

   ```bash
   git init
   git add .
   git commit -m "LinkHub: primera versión"
   gh repo create linkhub --public --source=. --push
   ```

3. Compila y publica (sustituye `TU-USUARIO`):

   ```powershell
   $env:BASE_PATH="/linkhub/"
   npm run build
   npx gh-pages -d dist -b gh-pages
   ```

4. En GitHub: **Settings → Pages → Source: Deploy from a branch → `gh-pages` / root → Save**.

   Tu panel quedará en `https://TU-USUARIO.github.io/linkhub/` y cada cliente en
   `https://TU-USUARIO.github.io/linkhub/#/p/su-enlace`.

> Si usas un repositorio llamado `TU-USUARIO.github.io`, no pongas `BASE_PATH` (usa `/`).

## 4. Estructura

```
src/
├── components/
│   ├── LandingPage.tsx        Portada
│   ├── DemoPage.tsx           Página de ejemplo (sin base de datos)
│   ├── PublicPage.tsx         Página pública del cliente /#/p/:slug
│   ├── public/LinkPageView.tsx  Render del tema (se usa también en el editor)
│   └── admin/
│       ├── AdminPage.tsx      Login + aviso de configuración
│       ├── DashboardPage.tsx  Lista de páginas
│       ├── NewPagePage.tsx    Crear página
│       ├── EditorPage.tsx     Editor (perfiles, botones, plantilla, diseño)
│       └── editor/            Secciones del editor
├── hooks/
│   ├── useAuth.ts             Sesión de Supabase
│   └── usePageEditor.ts       Autoguardado + operaciones de la página
└── lib/
    ├── templates.ts           24 plantillas
    ├── icons.tsx              50+ iconos y presets de botones
    ├── fonts.ts               Fuentes de Google bajo demanda
    ├── render.ts              Tema → estilos CSS
    └── supabase.ts            Cliente de Supabase
supabase/schema.sql            Tablas, RLS y almacenamiento
```
