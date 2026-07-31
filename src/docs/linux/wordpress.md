# Install Wordpress

> Install Wordpresss di Ubuntu server 24.04.LTS

## Overview

WordPress adalah platform Content Management System (CMS) sumber terbuka (open-source) yang paling populer di dunia untuk membuat dan mengelola website. Platform ini mendukung lebih dari 40% dari seluruh situs web di internet tanpa memerlukan kemampuan koding tingkat lanjut.

### Peringatan!!!

Saat mengakses website WordPress, sangat disarankan untuk **menggunakan domain**. Menggunakan alamat IP secara langsung dapat menyebabkan masalah seperti *broken links* atau *redirect errors*.

#### Solusi Konfigurasi DNS

Jika Anda belum mengonfigurasi domain, Anda dapat melakukan konfigurasi DNS Server lokal menggunakan salah satu dari layanan berikut:

* **PowerDNS** — Cocok untuk manajemen DNS berbasis database.
* **Bind9** — Layanan DNS tradisional berbasis file konfigurasi standar.

#### Panduan Instalasi

Ikuti langkah-langkah konfigurasi lengkap pada tautan dokumentasi berikut:
👉 [Dokumentasi Instalasi PowerDNS nandaDev](https://nandadev.vercel.app/docs/installasi-powerdns)

## Step — 1 Install wget, apache2, zip, unzip dan library php

```bash
sudo apt install wget apache2 zip unzip libapache2-mod-php php php-mysql php-curl php-gd php-mbstring php-xml php-xmlrpc php-soap php-intl php-zip
```

## Step — 2 Install dam konfigurasi database wordpress

```bash
cd /var/www/html
sudo wget https://wordpress.org/latest.zip
sudo unzip latest.zip 
```

### Buat database wordpress

```bash
sudo mysql -u root
```

```bash
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 1146
Server version: 10.11.14-MariaDB-0ubuntu0.24.04.1 Ubuntu 24.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE USER 'wordpress'@'localhost' IDENTIFIED BY '123';
Query OK, 0 rows affected (0.015 sec)

MariaDB [(none)]> CREATE DATABASE wordpress;
Query OK, 1 row affected (0.003 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON wordpress.* TO 'wordpress'@'localhost';
Query OK, 0 rows affected (0.005 sec)

MariaDB [(none)]> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.005 sec)

MariaDB [(none)]> exit
Bye
```

## Step — 3 Konfigurasi file apache2 /etc/apache2/sites-available/nandalinux.conf

```bash
sudo nano /etc/apache2/sites-available/nandalinux.conf
```

```bash
# Wordpress PATH            
<VirtualHost *:80>
    ServerName wordpress.nandalinux.com
    DocumentRoot /var/www/html/wordpress
</VirtualHost>
```

### a2ensite dan reload apache2

```bash
sudo a2ensite nandalinux.conf
sudo systemctl reload apache2
```

## Step — 4 Masuk ke website wordpress

Ikuti langkah-langkah berikut

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/1wp.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/2wp.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/3wp.png)

### Salin code yang dikasih ke folder wordpress

```bash
cd /var/www/html/wordpress
sudo nano wp-config.php
```

```bash
<?php
/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the website, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wordpress' );

/** Database username */
define( 'DB_USER', 'wordpress' );

/** Database password */
define( 'DB_PASSWORD', '123' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         '?4(v8{A6CrdcH}G#,hMd|U?9a5.dW7l6K-^(R`UV!%W%I6z(QV|`REvZBOGH>.2}' );
define( 'SECURE_AUTH_KEY',  'D.NJx.usf95FXQ(~chRHV7u(#;.vA/6T|1FA,%GT8T=H+JLV-BuW4xexMEaUw]Yu' );
define( 'LOGGED_IN_KEY',    '. bC}kDOkIhd Uf{$#ms<02ol(6#]%(*2j-mM=fSQ)d~qxXQrS(!J3-=oV]Mvqz.' );
define( 'NONCE_KEY',        '>TJT1`HU~5u9f7pX3QS5r8IvaET~.hel[g4a7%fQbQc9:r}[K3Beo|Gdhip}/`FW' );
define( 'AUTH_SALT',        '~^ <fP9mU5!G<Bgx.De>ju52zku!o>;i`fh_0{5gm#X)3e)dT7;IM/m.#?hEp!]r' );
define( 'SECURE_AUTH_SALT', 'yXe$T0sY!{0a;Y&d1oRbsAM}A}kLr-(-47M6);SrIk>y5cnAI<k%L+(C89&+|/71' );
define( 'LOGGED_IN_SALT',   'wxm{4nYQw&!|T?0LTS1>qJV#hn`1u$l!KHU~,LO>:4JMSklcXW~9n&$q<Ie|zo8v' );
define( 'NONCE_SALT',       'jD+4z1jOy4Mr|[X+#;@GK&Sc}{t:=7F#-Ry|Qd/0*tj /s~68Nb5!~:]~@Hh;3lt' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 *
 * At the installation time, database tables are created with the specified prefix.
 * Changing this value after WordPress is installed will make your site think
 * it has not been installed.
 *
 * @link https://developer.wordpress.org/advanced-administration/wordpress/wp-config/#table-prefix
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://developer.wordpress.org/advanced-administration/debug/debug-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
        define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
```

Setelah itu klik tombol **Run Installation**

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/4wp.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/5wp.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/6wp.png)

## Kesimuplan

Pada konfigurasi ini, WordPress berhasil diinstal dan dijalankan pada Ubuntu Server 24.04 LTS menggunakan web server Apache2, PHP, dan database MariaDB. Proses instalasi mencakup pemasangan kebutuhan utama WordPress, pembuatan database serta user database khusus, konfigurasi Virtual Host Apache2, hingga penyelesaian instalasi melalui halaman web WordPress.

Penggunaan domain pada instalasi WordPress juga sangat disarankan agar website dapat berjalan dengan baik dan menghindari masalah seperti redirect error atau link yang tidak valid. Dengan konfigurasi DNS yang benar, WordPress dapat diakses menggunakan nama domain sehingga lebih mudah dikelola dan siap digunakan untuk kebutuhan website maupun pengembangan lebih lanjut.

## Penutup

Instalasi WordPress pada Ubuntu Server 24.04 LTS merupakan salah satu implementasi dasar dalam membangun layanan web berbasis Linux. Dengan memahami konfigurasi Apache2, PHP, database MariaDB, serta pengaturan Virtual Host, administrator server dapat melakukan deployment website secara mandiri.

Konfigurasi ini dapat dikembangkan lebih lanjut dengan menambahkan fitur keamanan seperti SSL/TLS menggunakan HTTPS, backup database otomatis, firewall, monitoring server, serta optimasi performa agar website lebih aman, cepat, dan stabil.
