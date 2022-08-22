FRONTEND
instalación previa: instalar node js.

1. git clone https://github.com/burguesaroca/spa-ecommerce.git
2. cd spa-ecommerce
3. npm i
4. cp .env.example .env
5. configurar variables de entorno en el .env

VUE_APP_APLICATION = 1
VUE_APP_SERVIDOR = http://localhost:8080/ecommerce/public/api/

6. npm run serve -- --port 3000