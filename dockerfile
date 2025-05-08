FROM php:8.2-apache

# Instala extensiones necesarias
RUN apt-get update && apt-get install -y \
    zip unzip curl libzip-dev libpng-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip gd

# Habilitar mod_rewrite para Laravel
RUN a2enmod rewrite

# Establece el directorio base
WORKDIR /var/www/html

# Copia configuración de virtual host si usás una
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf
