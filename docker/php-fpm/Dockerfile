FROM php:8.1.0-fpm-alpine

#RUN ls -al /usr/local/lib/php/extensions/
RUN docker-php-ext-install bcmath
# Install packages
RUN apk add --no-cache curl git build-base zlib-dev oniguruma-dev autoconf bash
RUN apk add --update linux-headers

# Xdebug
RUN pecl install xdebug \
    && docker-php-ext-enable xdebug

RUN apk update && apk add nodejs npm
RUN npm install -g yarn

COPY ./docker/php-fpm/xdebug.ini /usr/local/etc/php/conf.d/xdebug.ini

#MySQL
RUN docker-php-ext-install mysqli pdo pdo_mysql

RUN apk --no-cache add libsodium-dev \
    && docker-php-ext-install sodium

# Configure non-root user.
ARG PUID=1000
ARG PGID=1000
RUN apk --no-cache add shadow && \
    groupmod -o -g ${PGID} www-data && \
    usermod -o -u ${PUID} -g www-data www-data

# Source code
RUN chown www-data:www-data /var/www
COPY --chown=www-data:www-data ./ /var/www
WORKDIR /var/www

USER www-data

# Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install --no-interaction

CMD php-fpm

EXPOSE 9000