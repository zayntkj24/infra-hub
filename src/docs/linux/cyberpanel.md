# Installasi Cyberpanel

> Install Cyberpanel di Ubuntu Server 24.04

## Overview

CyberPanel adalah control panel web hosting gratis berbasis grafis (GUI) yang menggunakan web server OpenLiteSpeed. Panel ini dirancang untuk memudahkan pengelolaan VPS, instalasi WordPress otomatis, serta pengaturan keamanan server tanpa harus memakai perintah teks rumit.
 
## Step 1 — Update dan upgrade system

```bash
sudo apt update && sudo apt upgrade
```

## Step 3 — Tambah repository litespeed dan install library litespeeed

```bash
curl -fsSL https://repo.litespeed.sh | sudo bash
```

```bash
sudo apt update && sudo apt install -y lsphp83-mysql lsphp83-common lsphp83-opcache lsphp83-curl lsphp83-imagick lsphp83-intl && sudo /usr/local/lsws/bin/lswsctrl restart
```

## Step 3 — Install Cyberpanel

```bash
sudo sh <(curl https://cyberpanel.net/install.sh || wget -O - https://cyberpanel.net/install.sh)
```

Jika mengalami masalah gunakan perintah ini

```bash
sudo su - -c "sh <(curl https://cyberpanel.net/install.sh || wget -O - https://cyberpanel.net/install.sh)"
```


```bash
sudo su - -c "sh <(curl https://cyberpanel.net/install.sh || wget -O - https://cyberpanel.net/install.sh)"
```

```bash
                CyberPanel Installer v2.4.9

1. Install CyberPanel.

2. Exit.


  Please enter the number[1-2]: 1
```

```bash
                CyberPanel Installer v2.4.9

RAM check : 613/1919MB (31.94%)

Disk check : 8/24GB (37%) (Minimal 10GB free space)

1. Install CyberPanel with OpenLiteSpeed.

2. Install Cyberpanel with LiteSpeed Enterprise.

3. Exit.


  Please enter the number[1-3]: 1
```

```bash
Install Full service for CyberPanel? This will include PowerDNS, Postfix and Pure-FTPd.

Full installation [Y/n]: y

Full installation selected...

Do you want to setup Remote MySQL? (This will skip installation of local MySQL)

(Default = No) Remote MySQL [y/N]: n
```

```bash
Local MySQL selected...

Press Enter key to continue with latest version or Enter specific version such as: 1.9.4 , 2.0.1 , 2.0.2 ...etc

Branch name set to v2.4.9
```

```bash
Please choose to use default admin password 1234567, randomly generate one (recommended) or specify the admin password?
Choose [d]fault, [r]andom or [s]et password: [d/r/s] 
Admin password will be provided once installation is completed...
```

```bash
Do you wish to install Memcached process and its PHP extension?
Please select [Y/n]: y

Install Memcached process and its PHP extension set to Yes...
```

```bash
Do you wish to install Redis process and its PHP extension?
Please select [Y/n]: y

Install Redis process and its PHP extension set to Yes...
```

```bash
Would you like to set up a WatchDog (beta) for Web service and Database service ?
The watchdog script will be automatically started up after installation and server reboot
If you want to kill the watchdog , run watchdog kill
Please type Yes or no (with capital Y, default Yes): 
Y
```

