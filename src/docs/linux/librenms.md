# Installasi LibreNMS

> Konfigurasi **LibreNMS** Di Ubuntu Server 24.04 Lts

## Overview

LibreNMS adalah sistem pemantauan jaringan gratis berbasis web (open-source network monitoring system) yang menggunakan protokol SNMP untuk melacak performa perangkat seperti router, switch, server, dan firewall. Perangkat lunak ini mendukung fitur penemuan otomatis (auto-discovery) serta pembuatan grafik secara langsung (real-time graphs).

### Peringatan!!!

Saat mengakses website WordPress, sangat disarankan untuk **menggunakan domain**. Menggunakan alamat IP secara langsung dapat menyebabkan masalah seperti *broken links* atau *redirect errors*.

#### Solusi Konfigurasi DNS

Jika Anda belum mengonfigurasi domain, Anda dapat melakukan konfigurasi DNS Server lokal menggunakan salah satu dari layanan berikut:

* **PowerDNS** — Cocok untuk manajemen DNS berbasis database.
* **Bind9** — Layanan DNS tradisional berbasis file konfigurasi standar.

#### Panduan Instalasi

Ikuti langkah-langkah konfigurasi lengkap pada tautan dokumentasi berikut:
👉 [Dokumentasi Instalasi PowerDNS nandaDev](https://nandadev.vercel.app/docs/installasi-powerdns)

## Step 1 — Install Library Apache2 php dan database

```bash
sudo apt install acl curl fping git mariadb-client mariadb-server mtr-tiny nmap apache2 libapache2-mod-php php-cli php-curl php-fpm php-gd php-gmp php-json php-mbstring php-mysql php-snmp php-xml php-zip python3-command-runner python3-dotenv python3-pip python3-psutil python3-pymysql python3-redis python3-setuptools python3-systemd rrdtool snmp snmpd traceroute unzip whois libapache2-mod-fcgid
```

## Step 2 — Menambah user librenms

```bash
sudo useradd librenms -d /opt/librenms -M -r -s "$(which bash)"
```

## Step 3 — Masuk direktori /opt dan clone repository LibreNMS

```bash
cd /opt
git clone https://github.com/librenms/librenms.git
```

## Step 4 — Setting permissions

```bash
sudo chown -R librenms:librenms /opt/librenms
sudo chmod 771 /opt/librenms
sudo setfacl -d -m g::rwx /opt/librenms/rrd /opt/librenms/logs /opt/librenms/bootstrap/cache/ /opt/librenms/storage/
sudo setfacl -R -m g::rwx /opt/librenms/rrd /opt/librenms/logs /opt/librenms/bootstrap/cache/ /opt/librenms/storage/
```

## Step 5 — Install defedensi PHP

### Masuk ke user librenms

```bash
sudo su - librenms
```

### Run dan jalankan perintah berikut

```bash
./scripts/composer_wrapper.php install --no-dev
exit
```

## Step 6 — Mengatur zona waktu

### Konfigurasi file /etc/php/8.3/fpm/php.ini

```bash
sudo nano /etc/php/8.3/fpm/php.ini
```

```bash
[Date]
; Defines the default timezone used by the date functions
; https://php.net/date.timezone
;date.timezone = Asia/Jakarta
```

### Konfigurasi file /etc/php/8.3/cli/php.ini

```bash
sudo nano /etc/php/8.3/cli/php.ini
```

```bash
[Date]
; Defines the default timezone used by the date functions
; https://php.net/date.timezone
;date.timezone = Asia/Jakarta
```

### Terapkan sistem zona waktu

```bash
sudo timedatectl set-timezone Etc/UTC
```

## Step 7 — Konfigurasi file mariadb dan membuat database

```bash
sudo nano /etc/mysql/mariadb.conf.d/50-server.cnf
```

```bash
# this is only for the mysqld standalone daemon
[mysqld]

innodb_file_per_table=1
lower_case_table_names=0
```

### Restart servis MariaDB

```bash
sudo systemctl enable mariadb
sudo systemctl restart mariadb
```

### Masuk ke mysql untuk konfigurasi database

```bash
sudo mysql -u root
```

```bash
Welcome to the MariaDB monitor.  Commands end with ; or \g.
Your MariaDB connection id is 31
Server version: 10.11.14-MariaDB-0ubuntu0.24.04.1 Ubuntu 24.04

Copyright (c) 2000, 2018, Oracle, MariaDB Corporation Ab and others.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

MariaDB [(none)]> CREATE DATABASE librenms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
Query OK, 1 row affected (0.000 sec)

MariaDB [(none)]> CREATE USER 'librenms'@'localhost' IDENTIFIED BY 'nanda123';
Query OK, 0 rows affected (0.003 sec)

MariaDB [(none)]> GRANT ALL PRIVILEGES ON librenms.* TO 'librenms'@'localhost';
Query OK, 0 rows affected (0.002 sec)

MariaDB [(none)]> FLUSH PRIVILEGES;
Query OK, 0 rows affected (0.001 sec)

MariaDB [(none)]> exit
Bye
```

## Step 8 — Konfigurasi PHP-FPM

```bash
sudo cp /etc/php/8.3/fpm/pool.d/www.conf /etc/php/8.3/fpm/pool.d/librenms.conf
sudo nano /etc/php/8.3/fpm/pool.d/librenms.conf
```

```bash
; Start a new pool named 'www'.
; the variable $pool can be used in any directive and will be replaced by the
; pool name ('www' here)
[www]
```

ubah menjadi

```bash
; Start a new pool named 'www'.
; the variable $pool can be used in any directive and will be replaced by the
; pool name ('www' here)
[librenms]
```

ubah user dan group ke librenms

```bash
;                 If the group is not set, the user's group is used.
user = www-data
group = www-data
```

ubah menjadi

```bash
;                 If the group is not set, the user's group is used.
user = librenms
group = librenms
```

Ganti listen ke direktori isi konfigurasi web server apache2

```bash
; The address on which to accept FastCGI requests.
; Valid syntaxes are:
;   'ip.add.re.ss:port'    - to listen on a TCP socket to a specific IPv4 address on
;                            a specific port;
;   '[ip:6:addr:ess]:port' - to listen on a TCP socket to a specific IPv6 address on
;                            a specific port;
;   'port'                 - to listen on a TCP socket to all addresses
;                            (IPv6 and IPv4-mapped) on a specific port;
;   '/path/to/unix/socket' - to listen on a unix socket.
; Note: This value is mandatory.
listen = /run/php/php8.3-fpm.sock
```

ubah menjadi

```bash
; The address on which to accept FastCGI requests.
; Valid syntaxes are:
;   'ip.add.re.ss:port'    - to listen on a TCP socket to a specific IPv4 address on
;                            a specific port;
;   '[ip:6:addr:ess]:port' - to listen on a TCP socket to a specific IPv6 address on
;                            a specific port;
;   'port'                 - to listen on a TCP socket to all addresses
;                            (IPv6 and IPv4-mapped) on a specific port;
;   '/path/to/unix/socket' - to listen on a unix socket.
; Note: This value is mandatory.
listen = /run/php-fpm-librenms.sock
```

## Konfigurasi web server apache2

```bash
sudo nano /etc/apache2/sites-available/nandalinux.conf
```

```bash
# Librenms Path 
<VirtualHost *:80>
    ServerName nms.nandalinux.com

    DocumentRoot /opt/librenms/html

    <Directory "/opt/librenms/html">
        AllowOverride All
        Options FollowSymLinks MultiViews
        Require all granted
    </Directory>

    <Directory "/opt/librenms/html/.well-known">
        Require all granted
    </Directory>

        <FilesMatch \.php$>
            SetHandler "proxy:unix:/run/php-fpm-librenms.sock|fcgi://localhost/"
        </FilesMatch>

    ErrorLog ${APACHE_LOG_DIR}/librenms_error.log
    CustomLog ${APACHE_LOG_DIR}/librenms_access.log combined
</VirtualHost>
```

### Aktifkan site nandalinux.conf

```bash
sudo a2ensite nandalinux.conf
```

### Aktifkan modul yang dibutuhkan

```bash
sudo a2enmod rewrite
sudo a2enmod php8.3
```

### Restart service apache2

```bash
sudo systemctl restart apache2
```

## Step 9 — Konfigurasi LibreNMS di Broweser

### Masuk ke http://nms.nandalinux.com 

Ikuti langkah-langkah sebagai berikut

![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/1libre.png)

#### Konfigurasi terlebih dahulu file /opt/librenms/.env (pastikan login di user librenms)

```bash
sudo su - librenms
nano /opt/librenms/.env
```
```bash
DB_HOST=localhost
DB_DATABASE=librenms
DB_USERNAME=librenms
DB_PASSWORD=nanda123
```

```bash
cd /opt/librenms
php artisan migrate --force
```

### Lanjut konfigurasi LibreNMS di browseer

![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/2libre.png)

![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/3libre.png)

![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/4libre.png)


![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/5libre.png)

Selesai

## Masuk dan coba login user nandakbar


![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/6libre.png)

![LibreNMS Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/7libre.png)

## Penutup

Dengan selesainya konfigurasi ini, LibreNMS telah berhasil diimplementasikan sebagai sistem monitoring jaringan berbasis web pada Ubuntu Server 24.04 LTS. Sistem ini sudah terhubung dengan database MariaDB, berjalan menggunakan Apache2 dan PHP-FPM, serta siap digunakan untuk melakukan pemantauan perangkat jaringan menggunakan protokol SNMP.

Melalui LibreNMS, administrator jaringan dapat melakukan monitoring kondisi perangkat seperti router, switch, server, dan perangkat lainnya secara real-time melalui dashboard web. Fitur auto-discovery, grafik performa, notifikasi, serta pencatatan histori dapat membantu proses analisis dan pemeliharaan infrastruktur jaringan agar lebih mudah dan efisien.

Konfigurasi ini masih dapat dikembangkan lebih lanjut dengan menambahkan perangkat jaringan, konfigurasi SNMP pada perangkat, sistem notifikasi (email/Telegram), pengaturan alert, serta integrasi dengan layanan monitoring lainnya.

Dengan adanya LibreNMS, proses monitoring jaringan menjadi lebih terstruktur sehingga administrator dapat mengetahui kondisi jaringan secara cepat dan mengambil tindakan apabila terjadi gangguan.
