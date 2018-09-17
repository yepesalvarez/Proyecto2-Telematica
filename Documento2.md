### Análisis y diseño para escalabilidad + Marco-referencia-v2

**Atributos de calidad seleccionados:**

``` 	
	QA1: 	Disponibilidad  		Estudiante: Jorge Andres Hoyos Gomez
	
	QA2: 	Rendimiento			Estudiante: Santiago Ramón Alvarez Gomez
	
	QA3: 	Seguridad			Estudiante: Luis Fernando Yepes Alvarez
``` 	

**Análisis: Mediante escenarios y/o propuesta en marco de referencia.**
[Escenario 1 Disponibilidad] : (https://goo.gl/i68Q1P)

**Diseño: En Aplicación y en Sistema.**

Vistas de arquitectura:
[Diseño inicial disponibilidad] : (https://goo.gl/dZmafu)

**Best Practices.**

**Seguridad:**

* Encriptar información sensible almacenada en base de datos como contraseñas
* Encriptar paquetes que viajan por la red mediante el uso de HTTPS con certificado ssl
* APIs de la aplicación protegidas por middleware de autorización 
* Uso de APIs externas e IaaS seguras y confiables
* Almacenar de manera segura y oculta los tokens de autorización de usuario
* Chequeo frecuente a vulnerabilidades presentes en el sistema

**Disponibilidad:**
	
Relacionado al software:
* Mantener la arquitectura lo suficientemente simple como para ser fácilmente extensible y mantenible. 
* Diseñar componentes de software modulares para que sean fácilmente escalables y así la aplicación altamente disponible.
* Adoptar pruebas de regresión y seguridad continuas para descubrir cualquier falla de seguridad o agujeros en el código tan pronto como sea posible. 

Relacionado al hardware: 
* Desarrollar una infraestructura de supervisión y alerta proactiva interna y externa.
* Emplear redundancia de hardware para manejar fallas imprevistas de hardware con transparencia políticas de cambio.

**Rendimiento:**

* Cambiar el tratamiento de datos, dejando de actualizar la posición cada segundo en db y guardandolos de manera local.
Para implementar de manera correcta el concepto de una ruta trazada por puntos, no me interesa tener puntos superpuestos.
* implementar lectores de lectores de codigo plano para encontrar fallas de rendimiento.
* implementar compresores de frontend (minimificado)

**Tácticas.**

**Seguridad:**

* Proteger endpoints con tokens que verifiquen la autorización de quien accede y que los servicios sean sin estado (stateless)
* Implementación de sistema de autenticación de proveedor externo que garantice y facilite operaciones de seguridad como denegación de servicios por ataque, seguridad y encriptación fuerte de contraseñas, entre otros. Ejemplo para el proyecto: implementación de Auth0
* Usar servicios de google y aws con redes privadas y protegidas
* Revisiones constantes con ZAP Owasp para chequeo de vulnerabilidades

**Disponibilidad:**

* Tener minimamente 3 instancias de la t2.micro, en la cual la aplicación estará desplegada, así asegurando que si se cae uno o dos, habrá otra instancia que soporte el funcionamiento continuo de la aplicación, sacrificando un poco de rendimiento.
* Desplegar un balanceador de cargas, el cual se encargará de redirigir el tráfico que le llega a la aplicación a las 3 instancias, buscando de esta manera que haya menos probabilidad de failover.
* Crear alertas de monitoreo preventivo, con el fin de tomar acciones en caso de que el sistema se encuentre cercano al fallo. 
 
**Rendimiento:**

* Guardar posición de manera local por medio de una lista de puntos, que cada x tiempo se sube a la DB.
* Usando un temporal que guarda la posición anterior, comparó  las posiciones y uso un diferencial de posición que es aproximadamente 2 metros para guardar las nuevas posiciones.

**Herramientas.**
* JMeter: Para el análisis de la velocidad de respuesta del servidor a los diferentes requests y capacidad máxima soportada para usuarios concurrentes.
* Owasp ZAP: Se implementará para el análisis de vulnerabilidades presentes en el sistema
* AWS: Todas las máquinas virtuales y el balanceador de cargas será implementado en cloud, usando la plataforma de AWS.

**Definición de Tecnología v2 – Infraestructura TI: Servidores, Software Base, Redes, etc.**

* La aplicación está desarrollada en nodeJs con el framework Express para el backend y con Pug(Jade 2) para el front end. Utiliza la API de Google Maps para el pintado del mapa y marcadores. La persistencia de datos se hace en base de datos no relacional Mongo. El web server que contiene la app es Nginx
* La aplicación corre sobre contenedor Docker el cual se encarga de instalar y hacer disponibles todos los componentes de configuración necesarios mencionados en el inciso anterior
* La aplicación será montada en varias instancias de la t2.micro de AWS
* Se utilizará para el despliegue una sección de red privada de Amazon de la localidad de Ohio VPC (Virtual private cloud) con diferentes subredes (subnets) donde en cada una se construirán instancias (EC2) que albergarán la aplicación. Estas instancias dirigidas por un balanceador de carga implementado desde los servicios de AWS que responde a un dominio personalizado www
* Se contará con un balanceador de cargas, que estará encargado de redirigir el tráfico entre las instancias de la t2.micro

**Marco-referencia-v2: Apropiación de las bases conceptuales, patrones, mejores prácticas, etc de los atributos de calidad seleccionados.**

* Mantenimiento correctivo: Esta es una forma reactiva de mantener el hardware en donde el equipo de operaciones de producción y mantenimiento identificará la causa raíz y la solución los problemas después de que ocurran.
* Mantenimiento preventivo: Una manera mas elegante de sostener la infraestructura, es a través de monitoreo los componentes de hardware y tomar acciones para evitar incidentes.
* Mantenimiento perfectivo: No siempre son necesarios, pero ayudan a que el usuario tenga una mejor experiencia con la aplicación, como por ejemplo incrementar el hardware, para que los tiempos de espera sean mas cortos.

Se conservan los demás puntos tratados en Documento #1
