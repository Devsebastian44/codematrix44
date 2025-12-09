---
title: "Escaneo de directorios con dirsearch"
description: "Dirsearch es una herramienta de código abierto para la enumeración de directorios web mediante ataques de fuerza bruta."
category: "OSINT"
image: "https://www.kali.org/tools/dirsearch/images/dirsearch-logo.svg"
---


## ¿Qué es y para qué sirve dirsearch?

Dirsearch es una herramienta de código abierto para la enumeración de directorios web mediante ataques de fuerza bruta. Está escrita en Python y se utiliza principalmente para encontrar directorios y archivos ocultos en sitios web o aplicaciones web que no están enlazados directamente o que no son visibles desde la interfaz de usuario.

### Funcionalidades principales

- Enumeración de directorios y archivos mediante diccionarios de palabras (wordlists)
- Soporte para varios protocolos: HTTP, HTTPS, etc.
- Compatibilidad con diferentes métodos HTTP (GET, POST, HEAD, etc.)
- Soporte de conexiones a través de proxies
- Opciones de personalización de encabezados HTTP y cookies
- Capacidad de manejar errores de estado HTTP, redirecciones y respuestas
- Soporte de escaneo multihilo para mejorar la velocidad

## Instalación

```bash
sudo apt-get install dirsearch
```

## Uso

Para buscar directorios web usamos el siguiente comando:

```bash
dirsearch -u [url]
```

### Ejemplo

```bash
dirsearch -u https://www.google.com/ -e txt,php,html -x 404
```

**-u = URL Target / -e = Extensiones / -x = Estados excluidos**

![Ejemplo de uso](https://github.com/bl4ck44/Conocimiento/blob/master/Hacking%20%C3%89tico%20y%20Pentesting/An%C3%A1lisis%20de%20Vulnerabilidades/dirsearch/Img/Ejemplo.png?raw=true)