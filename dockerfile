FROM php:8.2-apache

RUN apt-get update && apt-get install -y \
    zip unzip curl libzip-dev libpng-dev libonig-dev \
    && docker-php-ext-install pdo pdo_mysql zip gd

RUN a2enmod rewrite
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
WORKDIR /var/www/html
COPY .docker/vhost.conf /etc/apache2/sites-available/000-default.conf
COPY src/ /var/www/html/
RUN composer install
