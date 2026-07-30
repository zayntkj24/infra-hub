# Installasi Nagios

> Konfigurasi **Nagios Core** sebagai sistem monitoring server dan jaringan di Ubuntu Server 24.04 LTS.

## Overview

Nagios Core adalah software open-source untuk memantau (monitoring) host, service, dan perangkat jaringan secara real-time. Nagios dapat mengecek status server (up/down), penggunaan resource (CPU, RAM, disk), status service (HTTP, SSH, MySQL, dll), serta mengirim notifikasi apabila terjadi gangguan.

## Prerequisites

- Ubuntu Server 24.04 LTS
- Akses root atau sudo
- Minimal 1 GB RAM untuk instalasi dasar

## Step 1 — Install dependency

```bash
sudo apt update
sudo apt install -y autoconf gcc libc6 make wget unzip apache2 php libapache2-mod-php libgd-dev
```

## Step 2 — Membuat user dan group nagios

```bash
sudo useradd nagios
sudo groupadd nagcmd
sudo usermod -a -G nagcmd nagios
sudo usermod -a -G nagcmd www-data
```

## Step 3 — Download dan extract Nagios Core

```bash
cd /tmp
wget https://assets.nagios.com/downloads/nagioscore/releases/nagios-4.5.7.tar.gz
tar -xzf nagios-4.5.7.tar.gz
cd nagios-4.5.7
```

## Step 4 — Compile dan install Nagios Core

```bash
./configure --with-nagios-group=nagios --with-command-group=nagcmd
make all
sudo make install
sudo make install-daemoninit
sudo make install-commandmode
sudo make install-config
sudo make install-webconf
```

Perintah di atas akan menginstall Nagios ke `/usr/local/nagios`, membuat service systemd, serta menyiapkan konfigurasi dasar dan konfigurasi Apache.

## Step 5 — Install Nagios Plugins

```bash
cd /tmp
wget https://nagios-plugins.org/download/nagios-plugins-2.4.6.tar.gz
tar -xzf nagios-plugins-2.4.6.tar.gz
cd nagios-plugins-2.4.6
./configure --with-nagios-user=nagios --with-nagios-group=nagios
make
sudo make install
```

## Step 6 — Konfigurasi Apache dan aktifkan web interface

```bash
sudo a2enmod rewrite
sudo a2enmod cgi
sudo systemctl restart apache2
```

Buat akun login untuk web interface Nagios:

```bash
sudo htpasswd -c /usr/local/nagios/etc/htpasswd.users nagiosadmin
```

Masukkan password saat diminta, lalu catat karena akan dipakai untuk login.

## Step 7 — Jalankan service Nagios

```bash
sudo systemctl enable nagios
sudo systemctl start nagios
sudo systemctl status nagios
```

Verifikasi konfigurasi sebelum production:

```bash
sudo /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
```

## Step 8 — Akses web interface

Buka browser dan akses:

```
http://<ip-server>/nagios
```

Login menggunakan user `nagiosadmin` dan password yang sudah dibuat pada Step 6. Dashboard Nagios akan menampilkan status host dan service yang sedang dipantau.

## Step 9 — Menambahkan host baru untuk dimonitor

Buat file konfigurasi host baru:

```bash
sudo nano /usr/local/nagios/etc/servers/newhost.cfg
```

Isi dengan definisi host, contoh:

```cfg
define host {
    use                     linux-server
    host_name               web-server-01
    alias                   Web Server 01
    address                 192.168.1.10
}

define service {
    use                     generic-service
    host_name               web-server-01
    service_description     PING
    check_command            check_ping!100.0,20%!500.0,60%
}
```

Tambahkan direktori `servers` ke `nagios.cfg` jika belum ada:

```bash
cfg_dir=/usr/local/nagios/etc/servers
```

Lalu verifikasi konfigurasi dan restart service:

```bash
sudo /usr/local/nagios/bin/nagios -v /usr/local/nagios/etc/nagios.cfg
sudo systemctl restart nagios
```

## Troubleshooting

| Symptom | Kemungkinan Penyebab | Solusi |
|---|---|---|
| Web interface 403/404 | Modul Apache belum aktif | `sudo a2enmod cgi rewrite && sudo systemctl restart apache2` |
| Login gagal | File htpasswd belum dibuat/salah | Buat ulang dengan `htpasswd -c` |
| Service nagios gagal start | Syntax config error | Cek dengan `nagios -v /usr/local/nagios/etc/nagios.cfg` |
| Host tidak muncul di dashboard | File config host belum ter-include | Pastikan `cfg_dir` mengarah ke folder yang benar di `nagios.cfg` |

## Penutup

Dengan selesainya instalasi ini, Nagios Core telah berhasil berjalan sebagai sistem monitoring di Ubuntu Server 24.04 LTS, lengkap dengan web interface untuk memantau status host dan service secara real-time. Konfigurasi ini dapat dikembangkan lebih lanjut dengan menambahkan lebih banyak host, plugin check tambahan, serta notifikasi via email atau Telegram apabila terjadi gangguan pada infrastruktur yang dipantau.
