# Colomdario 🇨🇴🦋

**Colomdario** es una aplicación web interactiva diseñada específicamente para Colombia. Su propósito principal es ofrecer un calendario moderno, rápido y estéticamente agradable (inspirado en el realismo mágico y las mariposas amarillas) donde los usuarios pueden consultar las fechas importantes del país.

El proyecto destaca por su cálculo automático de festivos nacionales. A través de un algoritmo matemático que determina la fecha de la Semana Santa y aplica la **Ley Emiliani**, Colomdario es capaz de generar dinámicamente los días festivos de cualquier año (como 2026), trasladando automáticamente los días correspondientes a los lunes.

## ✨ Características Principales

- **Calendario Dinámico:** Navegación mes a mes con festivos resaltados.
- **Lista de Festivos (Ley Emiliani):** Cálculo exacto y automático de los feriados en Colombia para cualquier año.
- **Modo Claro / Oscuro:** Interfaz adaptable a las preferencias del usuario con guardado automático.
- **Sistema de Notas (En desarrollo):** Integración con Supabase para permitir a usuarios autenticados agregar y gestionar sus propias notas en días específicos.
- **Diseño Responsivo:** Completamente adaptable a pantallas móviles y de escritorio, con una navegación fluida.

## 🛠️ Tecnologías Utilizadas

- **Frontend:** React + Vite
- **Estilos:** Tailwind CSS
- **Enrutamiento:** React Router DOM
- **Backend / Base de Datos:** Supabase (Autenticación y PostgreSQL)
- **Iconografía:** Material Symbols (Google Fonts)

## 🚀 Cómo empezar (Desarrollo Local)

Sigue estos pasos para correr el proyecto en tu máquina local:

1. Instala las dependencias del proyecto:
   ```bash
   npm install
   ```

2. Inicia el servidor de desarrollo local:
   ```bash
   npm run dev
   ```

3. Abre tu navegador en `http://localhost:5173` para ver la aplicación.

## 📝 Próximos Pasos

- Conectar la interfaz de Login y Registro directamente con el sistema de autenticación de Supabase.
- Guardar y cargar notas personalizadas por cada usuario desde la base de datos PostgreSQL de Supabase.
