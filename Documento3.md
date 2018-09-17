### Documentación general de la aplicación y su proceso.

**Miembros del equipo**

	QA1: 	Disponibilidad  		Estudiante: Jorge Andres Hoyos Gomez
	QA2: 	Rendimiento			Estudiante: Santiago Ramón Alvarez Gomez
	QA3: 	Seguridad			Estudiante: Luis Fernando Yepes Alvarez
	
**Diseño de arquitectura de la Aplicación y Sistema**

Vista de desarrollo

Definición de Tecnología de Desarrollo

**URLs de repositorio (github)**
* Proyecto 2 con QA Rendimiento https://github.com/yepesalvarez/Proyecto2-Telematica
* Proyecto 2 con QA Seguridad https://github.com/yepesalvarez/Proyecto1-Telematica

**Definición de Tecnología v3 – Infraestructura TI: Servidores, Software Base, Redes, etc.**

**URL de ejecución pública y segura:**
* Proyecto 2 con QAs Disponibilidad y Rendimiento http://proyecto2.ga/
* Proyecto 2 con QA Seguridad https://www.proyecto2st0263eafit.tk/

**Implementación y Pruebas por Atributo de Calidad**

**Rendimiento:**

* Herramientas utilizadas: Jmeter

* Cambios en la implementación de la aplicación
* Esquemas de pruebas para comprobar el Atributo de Calidad.

Primera prueba, antes de implementar las funcionalidades  de rendimiento: 
Segunda prueba, después de implementar las funcionalidades  de rendimiento:

Ambas pruebas fueron realizadas con 1000 usuarios con un periodo de funcionamiento de 5 segundos.

Como podemos notar, si hubo un un cambio desde la primera prueba, pasamos de tener un  margen de error del 16.9% a uno de 0.1%,de esta manera podemos poner en el SLA que tenemos una disponibilidad del 99.9%

Se pasó de un tiempo de respuesta de 8.5 segundos a un tiempo de respuesta 0.9 segundos.

**Seguridad:**

* Se probó luego de implementar el certificado SSL mediante let's encrypt que la aplicación en el dominio privado mediante el protocolo HTTPS respodiera como 'Seguro' y el certificado fuese comprobable: https://goo.gl/a8G7Qh Resultado: todo correcto!

* Se probó luego de instalar, activar el firewall y desplegar la aplicación que este se econtrará funcionando correctamente: https://goo.gl/9x3sbY 
Resultado: todo correcto!

* Luego de la implentación de Auth0 se comprobó que las políticas de contraseña configuradas si respondieran dentro de la aplicación:
* https://goo.gl/sdKjuo (Contraseña con complejidad alta)
* https://goo.gl/A8L4Nn (Contraseña no igual a las últinas 5 anteriores, contraseña sin palabras del diccionario de passw comunes)
* https://goo.gl/TGDzPP (Contraseña no igual a las anteriores)
* https://goo.gl/KDH8RL (prueba en aplicación en producción)
Resultado: todo correcto!

* Se realizó un anáisis de seguridad de la aplicación web mediante Owasp ZAP : 
* https://goo.gl/kZwE5q
Se encontraron 5 vulnerabilidades, una ya detectada durante el análisis realizado en el documento #1 correspondiente a XSS (Cross-site scripting), esto, porque no se alcanzó a implementar el plugin correspondiente para proteger el front end. Adicionalmente algunas vulnerabilidades en el manejo de cookies para el sitio por http. Imágenes evidencia:
* https://goo.gl/rx5iUh
* https://goo.gl/f9xQSH
* https://goo.gl/uyZVCK
* https://goo.gl/pud8iK
* https://goo.gl/G5fZe8
* https://goo.gl/7Xw2wx
El análisis también arroja las soluciones posibles que se pueden implementar para proteger aún más el sitio, sin embargo a lo sumo solo hubo una amenaza nivel medio lo cual muestra que el sitio es bastante seguro.

**Marco-referencia-v3: Versión final de las bases conceptuales, patrones, mejores prácticas, etc de los atributos de calidad seleccionados.**

Se conservan los análisis realizados en los documentos #1 y #2

