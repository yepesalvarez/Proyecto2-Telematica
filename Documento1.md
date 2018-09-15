## Definición del equipo, proyecto y aplicación

**Miembros del equipo y asignación de QA a miembros del equipo**

``` 		QA1: 	Disponibilidad  		Estudiante: Jorge Andres Hoyos Gomez

		QA2: 	Rendimiento			Estudiante: Santiago Ramón Alvarez Gomez
		
		QA3: 	Seguridad			Estudiante: Luis Fernando Yepes Alvarez
```

**Selección de la aplicación basada en Proyecto 1:**
Se seleccionó la aplicación de Luis Fernando Yepes cuya estructura se analizó como la más simple y el alcance restante más fácil de culminar allí

**Descripción de la aplicación (requisitos funcionales)**
*La aplicación permite crear usuarios e ingresar al sistema con usuarios creados
*Muestra el mapa de google centrado en la ciudad de Medellín Colombia
*Permite iniciar una ruta a la cual se asocian por segundo los puntos de ubicación del usuario
*Permite finalizar la ruta guardandola en base de datos
*Permite ver rutas guardadas por el usuario activo en el sistema y visualizar los puntos en el mapa de la ruta consultada

**Detalles técnicos del diseño e implementación funcional para el proyecto 2. : **

- Aplicación distribuida con arquitectura cliente servidor
- Aplicación desarrollada con el patrón MVC (aplicación web)
- [Diseño del sistema por componentes] : (https://goo.gl/8XLwHn) 

**Aplicación completa desplegada en el Data Center Académico (tanto en servidores propios como en Kubernetes). **
Para proyecto 2 no se realizará despliegue en en DCA sino sobre AWS con acceso mediante un dominio www personalizado

* Definición de Tecnología v1 – Infraestructura TI: Servidores, Software Base, Redes, etc: 
- La aplicación está desarrollada en nodeJs con el framework Express para el backend y con Pug(Jade 2) para el front end. Utiliza la API de Google Maps para el pintado del mapa y marcadores. La persistencia de datos se hace en base de datos no relacional Mongo. El web server que contiene la app es Nginx
- La aplicación corre sobre contenedor Docker el cual se encarga de instalar y hacer disponibles todos los componentes de configuración necesarios mencionados en el inciso anterior
- La aplicación será montada en varias instancias de la t2.micro de AWS
- Se utilizará para el despliegue una sección de red privada de Amazon de la localidad de Ohio VPC (Virtual private cloud) con diferentes subredes (subnets) donde en cada una se construirán instancias (EC2) que albergarán la aplicación. Estas instancias dirigidas por un balanceador de carga implementado desde los servicios de AWS que responde a un dominio personalizado www

**Marco-referencia-v1: Van a realizar un 1er resumen y apropiación de las bases conceptuales, patrones, mejores prácticas, etc de los atributos de calidad seleccionados.**

Algunos de los patrones seleccionados para la solución del proyecto fueron: 
- Codebase: una base de código rastreada en el control de revisión, muchas implementaciones
- Dependencias: Declarar y aislar explícitamente dependencias
- Servicios de respaldo: trate los servicios de respaldo como recursos adjuntos
- Build, release, run: Estrictamente separadas etapas de compilación y ejecución
- Procesos: ejecuta la aplicación como uno o más procesos sin estado
- Registros: trata los registros como flujos de eventos

**Disponibilidad:**
- Failover: durante los escenarios de carga máxima, la capacidad del sistema para ser operativo en un evento de una falla de nodo o componente al cambiar transparentemente a otro componente de respaldo es a menudo denominado "failover".
- Failback: El failback generalmente ocurre después del failover, donde el nodo primario o el sitio primario se recuperará de la falla y estará en pleno funcionamiento.
- Redundancia: Habrá múltiples componentes redundantes en el sistema para facilitar el failover. Normalmente se seguirá una configuración N + 1 o N + M.

**Rendimiento:**

- Sincronía o asincronía con DB: por el momento la aplicación ya cuenta con un método asíncrono para enviar la información hacia la base de datos y actualiza la posición cada segundo,la idea es pasar de guardar la posición actual en base de datos a guardarlo de manera local, y posteriormente después de un x tiempo subir a la base de datos.
- Concepto de ruta: Actualmente se guarda cada segundo la ubicación, a diferencia de una aplicación como waze, en este caso me interesa tener una ruta en el mapa marcado por puntos, por lo tanto guardar el mismo punto (cuando estás quieto) es una operación sobre la DB que nos podemos ahorrar.

**Seguridad:**

- Disponibilidad: A momento en la aplicación se encuentra comprometida por no protección contra ataques de denegación de servicio. Se pretende solucionar con la implementación de Auth0 quien posee “Attack Prevention, Mitigation: Automated blocking features to mitigate advanced denial of service or authentication attacks”.
- Integridad: Para garantizar que un tercero no modifique la información que recibe y entrega la aplicación se implementará el protocolo HTTPS con certificación SSL que lo respalde como sitio seguro.
- Confidencialidad: A momento la única información que se guarda encriptada son las contraseñas de los usuarios mediante Bcrypt, Auth0 también realiza esta encriptación, adicional a esto al implementar HTTPS la información que viaja por la red también lo estará. 
Seguridad en contraseñas: La aplicación no cuenta con una política de contraseñas seguras, se implementará mediante Auth0 según las recomendaciones de Owasp
- Protección de endpoints APIs: Los servicios de la aplicación que responden a peticiones http diferentes al login/registro,  se encuentran respaldados por un middleware que valida mediante JWT que si sean solicitados por un usuario auntenticado en el sistema. 
CSRF (Cross Site Request Forgery): Al utilizar servicios Restful stateless con token en vez de cookies o sesiones en el navegador, se reduce la posibilidad de ataques donde se utilice la autenticación en el navegador para la ejecución de scripts o acciones maliciosas en el sistema. Queda limitado a que el token jwt sea obtenido por intrusos.
- XSS (Cross Site Scripting): El sistema no se encuentra protegido contra inyección de scripts en los templates usados para el Front End. Para la tecnología escogida Pug se usará un plugin llamado Pug XSS que protege la información renderizada desde el backend y revisa si el usuario puede ejecutar scripts y si si etiquetas usadas para la inyección maliciosa son cambiadas a encripciones como &lt;script&gt; en vez de script, de modo que no puedan ser ejecutadas, sólo las validadas son realizadas por el plugin de manera protegida.
- Inyección NoSQL:  Recibir del front end una expresión como { $ne: 1 } que significa no igual a uno podría provocar que el query retorne toda la información de alguna colección al hacer match con dicha expresión. Sin embargo la aplicación no contempla campos que permitan este tipo de expresiones y el paso de valores por url por post tampoco lo permiten. La información para las consultas nunca llega en un string sino dentro de un archivo Bson y finalmente se implementará mongo-sanitize sobre los valores recibidos en el request antes de la consulta para terminar de prevenirlo.
- Firewall: Para que usuarios no autorizados no ingresen al sistema base se implementará y mantendrá activo un firewall que proteja los puertos de las instancias
- Análisis de código estático: usando la herramienta ZAP sugerida y co mantenida por OWASP se realizará un análisis de vulnerabilidades restantes a tener en cuenta
