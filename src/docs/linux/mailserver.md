# Mail Server — Linux

> Konfigurasi Mail Server (Postfix, Dovecot, Roundcube) di Ubuntu Server 24.04

## Overview

Mail server adalah sistem komputer atau perangkat lunak yang bertugas untuk menerima, mengolah, menyimpan, dan mengirimkan pesan email melalui jaringan internet. Sistem ini bekerja seperti kantor pos digital yang mengatur alur keluar masuknya surat elektronik dari satu pengirim ke penerima lain.

### Peringatan!!!

Saat mengakses website WordPress, sangat disarankan untuk **menggunakan domain**. Menggunakan alamat IP secara langsung dapat menyebabkan masalah seperti *broken links* atau *redirect errors*.

#### Solusi Konfigurasi DNS

Jika Anda belum mengonfigurasi domain, Anda dapat melakukan konfigurasi DNS Server lokal menggunakan salah satu dari layanan berikut:

* **PowerDNS** — Cocok untuk manajemen DNS berbasis database.
* **Bind9** — Layanan DNS tradisional berbasis file konfigurasi standar.

#### Panduan Instalasi

Ikuti langkah-langkah konfigurasi lengkap pada tautan dokumentasi berikut:
👉 [Dokumentasi Instalasi PowerDNS nandaDev](https://nandadev.vercel.app/docs/installasi-powerdns)

## Step 1 — Instalasi Postfix dan Dovecot

```bash
sudo apt update
sudo apt install postfix dovecot-imapd dovecot-pop3d
```
### Konfigurasi Postfix
Setelah installasi selesai akan muncul message

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/1mail.png)

Lalu masukaan nama domain yang akan digunakan.

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/2mail.png)

#### Konfigurasi file /etc/postfix/main.cf

perintah untuk konfigurasi

```bash
sudo nano /etc/postfix/main.cf
```

lalu tambahkan konfigurasi text dibawah ini

```bash
# text ini dibarisan paling bawah

home_mailbox = Maildir/
```
dan save filenya

#### Membuat mail directory di directory /etc/skel

perintah :

```bash
sudo maildirmake.dovecot /etc/skel/Maildir
```

#### Rekonfigurasi ulang postfix

```bash
sudo dpkg-reconfigure postfix
```
 
Ikuti langkah sebagai berikut

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/1mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/2mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/3mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/4mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/5mail.png)

Tambah IP 0.0.0.0/0 dipaling belakang

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/6mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/7mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/8mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/9mail.png)

#### Restart Postfix

```bash
sudo systemctl restart postfix
```

### Konfigurasi Dovecot

#### Konfigurasi file /etc/dovecot/dovecot.conf

```bash
sudo nano /etc/dovecot/dovecot.conf
```

Uncomment dan edit baris berikut

```bash
# edit conf.d/master.conf.
#listen = *, ::
```

menjadi

```bash
# edit conf.d/master.conf.
listen = *
```

#### Konfigurasi file /etc/dovecot/dovecot.conf

```bash
sudo nano /etc/dovecot/conf.d/10-auth.conf
```

Uncomment dan ganti text dari yes ke no

```bash
# See also ssl=required setting.
disable_plaintext_auth = no
```

#### Konfigurasi file /etc/dovecot/conf.d/10-mail.conf

```bash
sudo nano /etc/dovecot/conf.d/10-mail.conf
```

Uncomment baris berikut

```bash
mail_location = maildir:~/Maildir
```

Lalu berikan comment pada baris berikut

```bash
# mail_location = mbox:~/mail:INBOX=/var/mail/%u
```

#### Restart dovecot service.

```bash
sudo systemctl restart dovecot
```

## Step 2 —  Menambahkan User Email

Menambah user email adalah tindakan membuat atau memasukkan akun surat elektronik baru ke dalam sebuah perangkat, aplikasi, atau sistem layanan berbasis domain/perusahaan agar bisa digunakan. Istilah ini umumnya merujuk pada dua hal utama: mendaftarkan akun baru untuk orang lain (karyawan/anggota) di dalam suatu organisasi, atau menyatukan akun email tambahan ke dalam satu aplikasi di HP atau komputer.

### Tambah user nanda

```bash
sudo adduser nanda
```

```bash
info: Adding user `nanda' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group `nanda' (1001) ...
info: Adding new user `nanda' (1001) with group `nanda (1001)' ...
warn: The home directory `/home/nanda' already exists.  Not touching this directory.
New password: 123
Retype new password: 123
passwd: password updated successfully
Changing the user information for nanda
Enter the new value, or press ENTER for the default
        Full Name []: 
        Room Number []: 
        Work Phone []: 
        Home Phone []: 
        Other []: 
Is the information correct? [Y/n] y
info: Adding new user `nanda' to supplemental / extra groups `users' ...
info: Adding user `nanda' to group `users' ...
```

### Tambah user akbar

```bash
sudo adduser akbar
```

```bash
info: Adding user `akbar' ...
info: Selecting UID/GID from range 1000 to 59999 ...
info: Adding new group `akbar' (1002) ...
info: Adding new user `akbar' (1002) with group `akbar (1002)' ...
warn: The home directory `/home/akbar' already exists.  Not touching this directory.
New password: 
Retype new password: 
passwd: password updated successfully
Changing the user information for akbar
Enter the new value, or press ENTER for the default
        Full Name []: 
        Room Number []: 
        Work Phone []: 
        Home Phone []: 
        Other []: 
Is the information correct? [Y/n] y
info: Adding new user `akbar' to supplemental / extra groups `users' ...
info: Adding user `akbar' to group `users' ...
```

### Restart kembali service postfix dan dovecot

```bash
sudo systemctl restart postfix dovecot
```

## Konfigurasi Roundcube dan database

### Install Mariadb dan Roundcube

```bash
sudo apt install mariadb-server roundcube
```
Ikutt langkah-langkah sebagai berikut

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/10mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/11mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/12mail.png)

### Konfigurasi file /etc/roundcube/config.inc.php

```bash
sudo nano /etc/roundcube/config.inc.php
```

Isi imap_host dengan nama domain mail server

```bash
// IMAP host chosen to perform the log-in.
// See defaults.inc.php for the option description.
$config['imap_host'] = ["mail.nandalinux.com:143"];
```

Isi smtp_host dengan nama domain mail server dan mengganti port 587 ke port 25

```bash
// SMTP server host (for sending mails).
// See defaults.inc.php for the option description.
$config['smtp_host'] = 'mail.nandalinux.com:25';
```

Kosongkan value smtp_user dan smtp_pass

```bash
// SMTP username (if required) if you use %u as the username Roundcube
// will use the current username for login
$config['smtp_user'] = '';

// SMTP password (if required) if you use %p as the password Roundcube
// will use the current user's password for login
$config['smtp_pass'] = '';
```

### Konfigurasi ulang roundcube-core

```bash
sudo dpkg-reconfigure roundcube-core
```

Ikuti langkah-langkah dibawah ini

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/13mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/14mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/15mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/16mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/17mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/18mail.png)

### Konfigurasi apache untuk membuat konfigurasi tambahan untuk roundcube

```bash
sudo nano /etc/apache2/apache2.conf
```

Tambahkan text dibarisan paling bawah

```bash
Include /etc/roundcube/apache.conf
```

### Tambah konfigurasi website roundcube di apache

```bash
sudo nano /etc/apache2/sites-available/nandalinux.conf
```

```bash
<VirtualHost *:80>
    ServerName mail.nandalinux.com
    DocumentRoot /usr/share/roundcube
</VirtualHost>
```

###  Enable konfigurasi website nandalinux.conf

```bash
sudo a2dissite 000-default.conf
sudo a2ensite nandalinux.conf
```

### Restart Service apache2

```bash
sudo systemctl restart apache2
```

## Step 3 — Testing

### Buka Browser dan searching domaain http://mail.nandalinux.com

#### Login user nanda

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/19mail.png)


![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/20mail.png)

Klik tombol compose

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/21mail.png)

Isi pesan email sesuka hati kalian

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/22mail.png)

Lalu logout dari user nanda

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/23mail.png)

#### Login user akbar

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/24mail.png)

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/25mail.png)

Lalu klik pesan yang terkirim dari user nanda

![Mail Server Setup](https://raw.githubusercontent.com/zayntkj24/infra-hub/main/public/26mail.png)

## Evaluasi & Catatan Ringkas

Konfigurasi Mail Server (Postfix, Dovecot, Roundcube) pada Ubuntu Server 24.04 telah dikonfigurasi dan diuji dengan sukses. Seluruh alur layanan surat elektronik berbasis webmail bekerja secara optimal tanpa kendala.

## 📝 Evaluasi & Catatan Ringkas
Konfigurasi Mail Server menggunakan **Postfix**, **Dovecot**, dan **Roundcube** pada Ubuntu Server 24.04 telah diselesaikan dan diuji dengan sukses. Seluruh alur layanan surat elektronik berbasis webmail bekerja secara optimal tanpa kendala.

## 🧪 Poin Penting Hasil Pengujian

* **Transfer Protokol (SMTP/IMAP)**
  * Pengiriman pesan (**SMTP**) via port `25`.
  * Pengambilan pesan (**IMAP**) via port `143`.
  * Komunikasi antar pengguna (`nanda` dan `akbar`) berjalan secara *real-time*.

* **Integrasi Webmail**
  * Roundcube berhasil dipetakan pada VirtualHost Apache (`mail.nandalinux.com`).
  * Akses antarmuka web sangat responsif.

* **Struktur Penyimpanan**
  * Format penyimpanan menggunakan `Maildir/` di direktori `~` (home).
  * Menjamin setiap pesan tersimpan terisolasi di masing-masing direktori pengguna dengan aman.

---

## 📌 Kesimpulan
Server email berbasis domain **nandalinux.com** telah siap digunakan untuk operasional komunikasi internal jaringan.
