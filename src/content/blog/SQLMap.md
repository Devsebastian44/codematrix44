---
title: "Inyección con Sqlmap"
description: "Sqlmap es una herramienta de prueba de penetración de código abierto utilizada para detectar y explotar vulnerabilidades de inyección de SQL en aplicaciones web."
date: 2024-12-08
category: "Explotación"
image: "https://www.vaadata.com/blog/wp-content/uploads/2024/05/exploiting-sqli-with-sqlmap.png"
---


## ¿Qué es y para qué sirve Sqlmap?

Sqlmap es una herramienta de prueba de penetración de código abierto utilizada para detectar y explotar vulnerabilidades de inyección de SQL en aplicaciones web. Fue desarrollada en Python y se utiliza para automatizar el proceso de detección y explotación de vulnerabilidades en bases de datos relacionales.

La inyección de SQL es una técnica común utilizada por los hackers para obtener acceso no autorizado a una base de datos o para extraer información sensible de un sistema. SQLMap ayuda a identificar y explotar estas vulnerabilidades al analizar la estructura de una aplicación web y realizar una serie de pruebas automatizadas para detectar cualquier punto de inyección de SQL.

Algunas de las características de SQLMap incluyen la capacidad de enumerar bases de datos, tablas y columnas, extraer datos de la base de datos, obtener el sistema de gestión de bases de datos (SGBD) subyacente, ejecutar comandos en el sistema operativo subyacente, entre otras. También puede realizar ataques de fuerza bruta en credenciales de bases de datos y ejecutar scripts personalizados durante el proceso de prueba.

## Instalación

```bash
sudo apt-get install sqlmap
```

---

## Uso

### Enumerar todas las opciones y parámetros disponibles de SQLMap:

```bash
sqlmap --help
```

### Detectar automáticamente la inyección de SQL en una URL específica:

```bash
sqlmap -u URL
```

### Especificar un parámetro vulnerable en una URL:

```bash
sqlmap -u URL --param=PARAMETER
```

### Probar diferentes tipos de inyección de SQL (booleano, tiempo, basado en errores, etc.):

```bash
sqlmap -u URL --technique=TECHNIQUE
```

### Obtener información sobre la base de datos:

```bash
sqlmap -u URL --dbs
```

### Enumerar todas las tablas de una base de datos:

```bash
sqlmap -u URL -D DATABASE --tables
```

### Enumerar columnas de una tabla:

```bash
sqlmap -u URL -D DATABASE -T TABLE --columns
```

### Extraer datos de una columna específica:

```bash
sqlmap -u URL -D DATABASE -T TABLE -C COLUMN --dump
```

### Usar un archivo de carga útil personalizado:

```bash
sqlmap -u URL --payload-file=FILE
```