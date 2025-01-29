# Kiwik - Aplicación para Builders de Frutero Club

Kiwik es un tercer espacio digital creado especialmente para los builders de Frutero Club. Esta plataforma está diseñada para fomentar el crecimiento colectivo de nuestra comunidad, permitiendo:

- Compartir conocimientos y experiencias
- Desarrollar nuevas habilidades
- Explorar tendencias emergentes
- Descubrir oportunidades de colaboración

Nuestra visión es crear un ecosistema vibrante donde los builders puedan conectar, aprender y crecer juntos.

## Características

- **Next.js** con App Router para una estructura y enrutamiento óptimos.
- **Shadcn** para componentes de UI hermosos y reutilizables.
- **Bun** como runtime para builds más rápidas y mejor rendimiento.
- Pre-configurado para **Dynamic Wallet** (impulsado por [dynamic.xyz](https://dynamic.xyz)) para manejar la creación y conexión de wallets.

## Primeros Pasos

### Requisitos Previos

- [Node.js](https://nodejs.org/) (Asegúrate de tener Bun instalado como runtime)
- [Bun](https://bun.sh/docs/installation)
- [Git](https://git-scm.com/)

### Instalación

1. **Clona el repositorio:**

   ```bash
   git clone https://github.com/fruteroclub/kiwik.git
   cd kiwik
   ```

2. **Instala las dependencias usando Bun:**

   ```bash
   bun install
   ```

3. **Configura las variables de entorno:**

   Crea un archivo `.env` en la raíz de tu proyecto y añade las siguientes variables:

   ```plaintext
   NEXT_PUBLIC_DYNAMIC_API_KEY=tu_dynamic_api_key
   ```

   Reemplaza `tu_dynamic_api_key` con tu clave API de [dynamic.xyz](https://dynamic.xyz).

### Ejecutando el Proyecto

Para iniciar el servidor de desarrollo, ejecuta:

```bash
bun run dev
```

Esto lanzará la aplicación en `http://localhost:3000`.

### Build y Producción

Para builds de producción, utiliza:

```bash
bun run build
bun run start
```

## Estructura del Proyecto

```plaintext
.
├── public/          # Archivos estáticos
├── src/app/         # Páginas y rutas de Next.js
├── src/components/  # Componentes React personalizados
├── src/styles/      # Hojas de estilo globales
├── .env             # Variables de entorno
├── ...              # ¡Otros archivos de configuración, revisa el repo!
```

## Integración de Wallet

La plantilla inicial incluye integración con **Dynamic Wallet**, permitiendo una creación y conexión fluida de wallets para los usuarios:

- **Dynamic.xyz** proporciona una interfaz de usuario fácil de usar para la conexión de wallets.
- Configuración plug-and-play para conectar con cadenas compatibles con EVM.

## Contribuciones

¡Damos la bienvenida a las contribuciones! Siéntete libre de enviar issues o pull requests para ayudar a mejorar esta plantilla inicial para la comunidad del hackathon.

## Licencia

Este proyecto es de código abierto y está disponible bajo la [Licencia MIT](LICENSE).
