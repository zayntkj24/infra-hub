# Installasi Grafana

> Install Grafana di Ubuntu Server 24.04

## Overview

Grafana adalah perangkat lunak sumber terbuka (open-source) untuk visualisasi data dan pemantauan sistem. Alat ini mengubah data mentah dari berbagai sumber menjadi dasbor grafik interaktif secara real-time, sehingga memudahkan tim memantau kinerja infrastruktur, server, dan aplikasi.
 
## Step 1 — Install the prerequisite packages

```bash
sudo apt-get install -y apt-transport-https wget gnupg
```

## Step 2 — Import the GPG key:

```bash
sudo mkdir -p /etc/apt/keyrings
sudo wget -O /etc/apt/keyrings/grafana.asc https://apt.grafana.com/gpg-full.key
sudo chmod 644 /etc/apt/keyrings/grafana.asc
```

## Step 3 — Menambahkan repositori

```bash
echo "deb [signed-by=/etc/apt/keyrings/grafana.asc] https://apt.grafana.com stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
```

## Step 4 — Update dan upgrade packages

```bash
sudo apt-get update
```

## Step 5 — install Grafana OSS

```bash
sudo apt-get install grafana
```

