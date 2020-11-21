# Ferretería y Corralón "Los dos Hermanos"
## Manual de la aplicación v1.0.0 :computer:

## Instalación :wrench:

La instalación fue realizada enla carpeta `C:/Archivos de programa x86` es recomendable no eliminar nada de esa carpeta ya que podría alterar el funcionamiento. \
Aplicaciones utilizadas para el desarrollo: 
- MySQL Server
- .NET Framework
- Java JRE 1.8

 Se recomienda **NO DESINSTALAR** ninguna de las antes mencionadas.

 ### Instalación del lector de código de barras
 El dispositivo es de inicio automático, es decir, una vez conectado via USB ya se puede utilizar de la siguiente manera:
 - Poner el cursor sobre el campo a completar
 - Apuntar la pistola hacia el código de barras del producto, si no funciona, gírelo a un ángulo de 45°.

## Inicialización :heavy_check_mark:

Para iniciar la app debe ejecutar el acceso directo con nombre "Los dos Hermanos"

## Uso y funcionalidades

La demostracion de funcionalidades esta adjunta en esta misma carpeta en formato video.

## Búsquedas :eyes:

La entrada de búsqueda se encuentra en el margen superior derecho de la aplicación.
Este buscador encuentra resultados que sean similares a la descripción o iguales al codigo del producto

## Agregar/modificar productos :memo:

Al momento de agregar productos, se abrira una ventana con diferentes campos. Estos deben cumplir ciertos requerimientos.
- Descripción: Debe tener al menos 4 caracteres (Para facilitar las búsquedas)
- Código de barras: Deben ser ingresados con el lector de codigo, sino ingresar los 13 digitos manualmente, en caso de que el producto no tenga codigo de barras, puede dejarse el campo vacío.
- Precio : Debe ser un numero mayor a cero, puede ingresar los decimalos con punto o coma (* $13.30 o bien $13,30)
- Stock: Se ingresa por unidades,es decir, números mayores a cero.
- Categoría : Es obligatorio y debe elegirse una de las disponibles en el menu desplegable.

## Ventas :money_with_wings:

Las ventas se realizan desde la pestaña *Ventas*. Para vender es necesario:

- Buscar y seleccionar el producto a vender. (Podra verse en el recuadro a la derecha el producto seleccionado, su stock y su precio.)
- Ingresar la cantidad de unidades a vender.
- Agregar el producto mediante el boton *Agregar* o bien con la tecla *Enter*

## Administración de precios. :chart:

Para cambiar precios hay dos alternativas:
- Cambiar por producto:
    -    Con esta opción podremos cambiar el precio de ciertos productos seleccionados aunque tengan diferentes categorías.
    - Para esto es necesario buscarlos y seleccionarios en la entrada de búsqueda, luego especificar el porcentaje a modificar (un numero entre 1 y 99), y finalmente seleccionar si se quiere agregar o disminuir el precio.
- Cambiar por Categoría:
    - Con esta funcionalidad podremos cambiar el precio de los productos por categoría, por ejemplo, aumentar 10% todos los productos pertenecientes a *Ferretería*.
    - Para ello es necesario seleccionar la categoría a modificar, especificar el porcentaje a alterar y por último seleccionar si quiere aumentar o disminuir.

## Códigos de producto :key:

Los códigos de barra serán ingresados al cargar el producto,en caso de no tenerlo, dejar el campo vacío.

## Contacto.
Para cualquier consulta contactarse a \
:mailbox: *nicolas.alv3@gmail.com* \
:telephone_receiver: 11 68896776
**Nicolas Alvarez** \
*Técnico en programación informática.*
