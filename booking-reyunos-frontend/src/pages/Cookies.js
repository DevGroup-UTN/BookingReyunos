import React from "react";
import '../styles/Cookies.css';

export function FotoLogo(){
    return (
        <div className="styleFotoLogo">
            <img
                src="/images/logo-utn-nav.png" 
                alt="Logo"
            />

        </div>
    );
}

const TableComponent = ({ data }) =>{
    return(
        <table border="1" style={{width: "100%", textAlign: "center"}}>
            <thead>
                <tr>
                    <th>
                        <strong>Tipo de Cookie</strong>
                    </th>
                    <th>
                        <strong>Finalidad</strong>
                    </th>
                    <th>
                        <strong>Caducidad</strong>
                    </th>
                </tr>
            </thead>
            <tbody>
                {data.map((item, index) =>(
                    <tr key={index}>
                        <td>
                            {item.Tipo}
                        </td>
                        <td>
                            {item.Finalidad}
                        </td>
                        <td>
                            {item.Caducidad}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


function Cookies(){
    const tableData = [
        {Tipo:"Necesarias para el Funcionamiento: PHPSESSID, _ga, _gid", Finalidad:"Estas cookies permiten la navegación a través de la web y la utilización de las diferentes opciones o servicios que se prestan. También se utilizan para mejorar su experiencia de navegación y para optimizar el funcionamiento de nuestra página. Almacenan configuraciones de servicios para que el usuario no tenga que reconfigurarlos cada vez que nos visita.",Caducidad:"De 1 sesión a 1 día"},
        {Tipo:"Analitcas: _1P_JAR, APISID, CONSENT, HSID, NID, OGP, OGPC, SAPISID, SID, SIDCC, SSID, _ga, tag, *_tag, *_Reference, Email, *_UserID ",Finalidad:"Estas cookies se utilizan para recoger información sobre el uso de nuestro sitio web por parte de los visitantes. Utilizamos la información para elaborar informes y para mejorar el sitio. Estas cookies se asocian únicamente a un usuario anónimo y a su ordenador/dispositivo sin proporcionar referencias que permitan conocer datos personales. Recogen el número de visitantes al sitio, el tiempo que duran las visitas, el navegador, el tipo de terminal, el lugar de procedencia de los visitantes y las páginas visitadas.",Caducidad:"De 6 meses a 1 año"},
        {Tipo:"De Personalizacion: PHPSESSID, CurrencyTk, LngTk",Finalidad:"Son aquéllas que permiten al usuario acceder al servicio con algunas características de carácter general predefinidas en función de una serie de criterios en el terminal del usuario como por ejemplo serian el idioma, la moneda, el tipo de navegador a través del cual accede al servicio, la configuración regional desde donde accede al servicio, etc.",Caducidad:"30 Dias"}
    ];
    return(
        <div className="styleCookies">
            <FotoLogo className="imgCookies"/>
            <h1 className="TitulooCookies">Politicas de Privacidad y Cookies</h1>
            <p>
                <strong>
                    POLITICAS DE PRIVACIDAD Y RESGUARDO DE DATOS
                    <br></br>
                    <br></br>
                    Informacion de registro: 
             </strong>
             Al registrase contratar servicios de  hotelería con CTDR UTN Reyunos;, la  misma le solicita 
             llenar un formato de registro en el cual se especifican su  nombre, dirección y número de calle, 
             país, número de teléfono, dirección de  correo electrónico y otra información. Utilizamos esta información
             de registro  para asistirnos en llevar a cabo las transacciones que Ud. haya iniciado, hacer  reservaciones,
             contactarlo para servicio al cliente, mejorar nuestras ofertas y  servicios, y recolectar estadísticas sobre
             nuestros afiliados. Usaremos estas  estadísticas para clasificar nuestros afiliados, por ejemplo, por país
             de  residencia, y para enviarles nuevos servicios y promociones. Podemos utilizar  su dirección de correo 
             electrónico para contactarlo en relación con dichos  nuevos servicios y promociones o para enviarle cartas 
             circulares promocionales  o mensajes electrónicos, salvo que Ud. no lo desee (ver más adelante: política  
             de renuncia opt. out).
            </p>
            <br></br>
            <p>
                <strong>
                    Encuestas:
                </strong>
                CTDR UTN Reyunos podrá llevar a cabo o presentar periódicamente encuestas en línea. La información 
                obtenida por medio de dichas encuestas se usa para mejorar las ofertas de productos y servicios de 
                CTDR UTN Reyunos.
                
            </p>
            <br></br>
            <p>
                <strong>
                    Uso de la página:
                </strong>
                CTDR UTN Reyunos mantiene un seguimiento de las direcciones IP de los hosts con fines de administración 
                y seguridad del sistema. También monitoreamos el tráfico de la página rastreando las vistas de la página 
                que nos permite planear crecimiento (por ejemplo, agregando nuevos servidores).
                
            </p>
            <br></br>
            <p>
                <strong>
                    Divulgación a terceros:
                </strong>
                Si Ud. reserva o compra productos o servicios en esta página, CTDR UTN Reyunos suministra la información 
                personal relevante al proveedor del servicio contratado involucrado para completar las transacciones. 
                CTDR UTN Reyunos también suministra información personal a sus proveedores externos de servicios 
                (tales como los programadores de CTDR UTN Reyunos) que asisten a CTDR UTN Reyunos en el suministro, 
                mantenimiento y comercialización de esta página, pero esos terceros están sujetos a contratos de 
                confidencialidad que prohíben la utilización o divulgación no autorizadas de la información a la cual 
                tienen acceso. CTDR UTN Reyunos no vende a terceros 'listados de usuarios' o nombres de miembros 
                individuales, y no tiene intención de hacerlo en el futuro. CTDR UTN Reyunos divulgará información 
                personal a funcionarios de gobierno o entidades legales cuando creamos de buena fe que la ley así lo 
                requiere, y divulgaremos información personal, si creemos que es necesario hacerlo para protección contra 
                interferencia de los derechos o propiedades de CTDR UTN Reyunos o de sus usuarios. CTDR UTN Reyunos 
                también podrá compartir información personal con sus afiliados.
            </p>
            <br></br>
            <p>
                <strong>
                    Política de renuncia (opt out):
                </strong>
                Si Ud. reserva o compra productos o servicios en esta página, CTDR UTN Reyunos suministra la 
                información personal relevante al proveedor del servicio contratado involucrado para completar 
                las transacciones. CTDR UTN Reyunos también suministra información personal a sus proveedores 
                externos de servicios (tales como los programadores de CTDR UTN Reyunos) que asisten a CTDR UTN 
                Reyunos en el suministro, mantenimiento y comercialización de esta página, pero esos terceros están 
                sujetos a contratos de confidencialidad que prohíben la utilización o divulgación no autorizadas de 
                la información a la cual tienen acceso. CTDR UTN Reyunos no vende a terceros 'listados de usuarios' 
                o nombres de miembros individuales, y no tiene intención de hacerlo en el futuro. CTDR UTN Reyunos 
                divulgará información personal a funcionarios de gobierno o entidades legales cuando creamos de buena 
                fe que la ley así lo requiere, y divulgaremos información personal, si creemos que es necesario hacerlo 
                para protección contra interferencia de los derechos o propiedades de CTDR UTN Reyunos o de sus usuarios. 
                CTDR UTN Reyunos también podrá compartir información personal con sus afiliados.
            </p>
            <br></br>
            <p>
                <strong>
                    Almacenamiento y transferencia de información:
                </strong>
                Por cuestiones de seguridad, CTDR UTN Reyunos no guarda información sobre las tarjetas de crédito 
                de sus usuarios. Por esta razón, cada vez que el usuario realice una transacción deberá ingresar los 
                datos de su tarjeta de crédito nuevamente. Toda otra información personal es recolectada y almacenada 
                en servidores ubicados físicamente en los Estados Unidos. CTDR UTN Reyunos puede reubicar estos 
                servidores en cualquier otro país, en el futuro, y puede almacenar información personal en los Estados 
                Unidos o en otros países, con fines de respaldo o back up.
            </p>
            <br></br>
            <p>
                <strong>
                    Vínculos externos:
                </strong>
                Esta página tiene vínculos (links) con otras páginas. CTDR UTN Reyunos no es 
                responsable por la confidencialidad o contenido de tales páginas web.
            </p>
            <br></br>
            <p>
                <strong>
                    Acceso público a la información:
                </strong>
                Al colocar información en un área pública de esta página (por ejemplo: avisos, grupos de chat, 
                álbumes de fotografías electrónicos) esta información estará disponible a otros miembros y usuarios 
                de la página. CTDR UTN Reyunos no puede controlar la utilización que hagan los miembros y usuarios de 
                la información publicada en la página. Por favor, recuerde que cualquier información que se divulgue 
                en estas áreas puede convertirse en información pública y se debe ejercer cuidado cuando se decida 
                divulgar tal información.
            </p>
            <br></br>
            <p>
                <strong>
                    Seguridad:
                </strong>
                Esta página contiene medidas de seguridad para protección contra pérdida, uso indebido, o alteración 
                de la información, bajo control de CTDR UTN Reyunos. Estas medidas de seguridad incluyen el uso de 
                codificación SSL (Secure Socket Layer) que es un sistema que permite a su browser codificar 
                automáticamente los datos antes de enviarlos a CTDR UTN Reyunos. A pesar de nuestras medidas de 
                seguridad, le rogamos tener en cuenta que la 'seguridad perfecta' no existe en Internet.
            </p>
            <br></br>
            <p>
                <strong>
                    Para contactarnos:
                </strong>
                Si tiene preguntas sobre esta 'Declaración de Confidencialidad', las prácticas de CTDR UTN Reyunos, 
                o sus negociaciones con la página de CTDR UTN Reyunos, nos puede contactar en la sección de 
                'Contáctenos'.
            </p>
            <br></br>
            <p>
                <strong>
                    Modificaciones:
                </strong>
                Cualquier modificación a la manera como CTDR UTN Reyunos utiliza la Información Personal será 
                reflejada en versiones futuras de esta 'Declaración de Confidencialidad', y serán publicadas en esta 
                página. CTDR UTN Reyunos encarece a los usuarios el revisar periódicamente esta 'Declaración de 
                Confidencialidad'.
            </p>
            <br></br>
            <p>
                <strong>
                    Aplicabilidad:
                </strong>
                Al navegar y/o usar esta página usted acepta expresamente cualquier utilización y divulgación de la 
                información que Ud. entrega a la página ('información personal') de acuerdo con las condiciones de uso 
                de CTDR UTN Reyunos y de esta Declaración de Confidencialidad. Esta Declaración de Confidencialidad está 
                incorporada y sujeta a las condiciones de uso de CTDR UTN Reyunos. Esta página es para fines 
                relacionados con alquiler de hoteles y está prohibida cualquier otra utilización.
            </p>
            <br></br>
            <p>
                <strong>
                    ¿Qué es una cookie?
                </strong>
            </p>
            <br></br>
            <p>
            Una cookie es un pequeño fichero de texto que se almacena en su dispositivo cuando visita una página Web. 
            Su utilidad es que la Web sea capaz de recordar su visita cuando vuelva a navegar por esa página. 
            Las cookies suelen almacenar información de carácter técnico, preferencias personales, personalización 
            de contenidos, estadísticas de uso, enlaces a redes sociales, acceso a cuentas de usuario, etc. 
            El objetivo de la cookie es adaptar el contenido de la Web a su perfil y necesidades, sin cookies 
            los servicios ofrecidos por cualquier página se verían mermados notablemente. Las cookies sólo podrán ser 
            leídas por el servicio o aplicación que las ha emitido y en ningún caso son archivos ejecutables, ni pueden 
            propagarse, ni contener un virus.
            </p>
            <br></br>
            <p>
                <strong>
                    ¿Qué tipología de cookies hay?
                </strong>
            </p>
            <br></br>
            <p>Según la entidad que las gestione:</p>
            <br></br>
            <ul>
                <li>
                    Cookies propias: Son aquellas cookies que se envían al equipo terminal del usuario desde un 
                    equipo o dominio gestionado por el grupo y desde el que se presta el servicio solicitado por el 
                    usuario.
                </li>
                <br></br>
                <li >
                    Cookies de terceros: Son aquellas cookies que se envían al equipo terminal del usuario desde un 
                    equipo o dominio gestionado o no por el grupo, siendo un tercero la que trata los datos obtenidos a 
                    través de las cookies.
                </li>
            </ul>
            <br></br>
            <p>
                En función de su duración las cookies pueden ser:
            </p>
            <br></br>
            <ul>
                <li>
                    De sesión. Son un tipo de cookies diseñadas para recabar y almacenar datos mientras el usuario 
                    accede a una página Web. Estas cookies no quedan almacenadas en el ordenador del usuario cuando caduca 
                    la sesión o este cierra el navegador.
                </li>
                <br></br>
                <li>
                    Persistentes. Son un tipo de cookies en el que los datos siguen almacenados en el ordenador 
                    del usuario y pueden ser accedidos y tratados cuando el usuario abandona la página Web y cuando 
                    se vuelva a conectar a ella. Estas cookies pueden ser borradas en cualquier momento por el Usuario.
                </li>
            </ul>
            <br></br>
            <p>
                En función de la finalidad para la que se traten los datos obtenidos a través de las cookies:
            </p>
            <br></br>
            <ul >
                <li>
                    Cookies técnicas (necesarias). Estas cookies son necesarias para que la página Web y sus funciones 
                    básicas puedan operar correctamente. Sin estas cookies no es posible poner a disposición 
                    determinados servicios, como la navegación segura, identificación del usuario, realizar la 
                    inscripción o participación en un evento.
                </li>
                <br></br>
                <li>
                    Cookies analíticas (estadística). Estas cookies recopilan información sobre el uso que se hace de 
                    la página Web, qué páginas se visitan más, con qué frecuencia, si dan mensajes de error. De ese modo 
                    podemos medir la actividad de nuestro sitio Web, por ejemplo para identificar las secciones más 
                    populares de nuestra Web. Estas cookies no recogen información que identifique al usuario, solo se 
                    emplea para mejorar el funcionamiento de una página Web.
                </li>
                <br></br>
                <li>
                    Cookies de personalización (preferencias). Estas cookies hacen posible que la página Web recuerde 
                    las preferencias, como el nombre de usuario, el idioma, ubicación geográfica, por tanto su finalidad 
                    es ofrecer funciones mejoradas y personales. Por ejemplo, nuestra página Web podría ofrecer 
                    información solo disponible en una ubicación geográfica, utilizando para ello una cookie que guardar 
                    la provincia en la que se encuentra el usuario Web. Tenga en cuenta que si deshabilita estas 
                    cookies, no podrá utilizar todas las funciones interactivas de nuestra página Web.
                </li>
                <br></br>
                <li>
                    Cookies de publicidad (marketing). Son aquéllas que permiten la gestión de los espacios publicitarios 
                    que hay en una página Web. Estas cookies se utilizan para mostrar los anuncios más relevantes de 
                    acuerdo a los intereses del usuario. También se usan para limitar el número de veces que el usuario 
                    ve un anuncio, así como para ayudar a medir la efectividad de una campaña publicitaria.
                </li>
                <br></br>
                <li>
                    Cookies de publicidad comportamental (marketing). Estas cookies almacenan información del 
                    comportamiento de los usuarios obtenida a través de la observación de sus hábitos de navegación, 
                    lo que permite la creación de perfiles basados en hábitos del usuario para mostrar publicidad en 
                    función del mismo.
                </li>
            </ul>
            <br></br>
            <p>
                <strong>
                    ¿Qué tipo de cookies utiliza CTDR UTN Reyunos?
                </strong>
            </p>
            <br></br>
            <p>
                <strong>Necesarias: </strong> Estas cookies son necesarias para que la página Web funcione, 
                por lo que no se pueden desactivar. Por lo general, solo se configuran en respuesta a sus acciones 
                realizadas al solicitar servicios, como establecer sus preferencias de privacidad, iniciar sesión o 
                completar formularios, esto último no ocurre en CTDR UTN Reyunos porque no tenemos registro de usuarios, 
                por lo tanto tampoco hay inicio de sesión de usuario, ni usamos formularios de recogida de datos.
            </p>
            <br></br>
            <p>
                <strong>Preferencias:</strong>Las cookies de preferencias permiten a la página Web recordar información 
                que cambia la forma en que la página se comporta o el aspecto que tiene, como su idioma preferido o la 
                región en la que usted se encuentra.
            </p>
            <br></br>
            <p>
                <strong>Estadística:</strong> Las cookies estadísticas ayudan a los propietarios de páginas Web a 
                comprender cómo interactúan los visitantes con las páginas Web reuniendo y proporcionando información 
                de forma anónima.
            </p>
            <br></br>
            <p>
                <strong>
                    ¿Qué cookies utiliza CTDR UTN Reyunos?
                </strong>
            </p>
            <br></br>
            <TableComponent data={tableData}/>
            <br></br>
            <p>
                <strong>
                    ¿Cómo administrar las cookies?
                </strong>
            </p>
            <br></br>
            <p>
                el usuario tiene la opción de permitir, bloquear o eliminar las cookies instaladas en su equipo mediante 
                la configuración de las opciones del navegador instalado en su terminal. Para obtener más información, 
                consulte las instrucciones y manuales de su navegador para ampliar esta información:
            </p>
            <br></br>
            <p>
                Google Chrome:<a href="https://support.google.com/chrome/answer/95647?hl=es">https://support.google.com/chrome/answer/95647?hl=es</a>
            </p>
            <br></br>
            <p>
                Mozilla Firefox: 
                <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we&redirectlocale=es">
                    https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias?redirectslug=habilitar-y-deshabilitar-cookies-que-los-sitios-we&redirectlocale=es
                </a>
            </p>
            <br></br>
            <p>
                Internet Explorer: 
                <a href=" https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d">
                    https://support.microsoft.com/es-es/topic/eliminar-y-administrar-cookies-168dab11-0753-043d-7c16-ede5947fc64d
                </a>
            </p>
            <br></br>
            <p>
                Safari:
                <a href=" https://support.apple.com/es-es/guide/safari/sfri11471/mac">
                    https://support.apple.com/es-es/guide/safari/sfri11471/mac
                </a>
            </p>
            <br></br>
            <p>
                Safari / IOS (iPhone y iPad):
                <a href=" https://support.apple.com/es-es/HT201265">
                    https://support.apple.com/es-es/HT201265
                </a>
            </p>
            <br></br>
            <p>
                Chrome / Android:
                <a href=" https://support.google.com/chrome/answer/114662?hl=es&visit_id=637400243735165235-3593560368&rd=1">
                    https://support.google.com/chrome/answer/114662?hl=es&visit_id=637400243735165235-3593560368&rd=1
                </a>
            </p>
            <br></br>
            <p>
                No obstante, la inhabilitación de las cookies podría modificar el funcionamiento del sitio web.
                 En caso de bloquear el uso de cookies en su navegador es posible que algunos servicios o 
                 funcionalidades del sitio web no estén disponibles.
            </p>
            <br></br>
            <p>
                <strong>
                    Actualización de la política de cookies
                </strong>
            </p>
            <br></br>
            <p>
                En el caso de que las características o fines de uso de las cookies de esta página web sean modificadas, 
                se le informará acerca de esos cambios con el fin de recabar nuevamente su consentimiento en aquellos 
                casos en que fuese necesario.
            </p>
           
            
        </div>
    );
}

export default Cookies;