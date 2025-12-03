import styles from "./PrivacyPolicyPage.module.css";

export default function PrivacyPolicyPage() {
  return (
    <div className={styles.container}>
      <div>
        <h1>Política de Privacidad</h1>
        <span className={styles.lastUpdate}>Última actualización: 03 de Diciembre del 2025</span>
      </div>
      <div className={styles.section}>
        <p>
          En Mandragora nos comprometemos a proteger la privacidad y la seguridad de los datos personales de nuestros
          usuarios. Esta Política de Privacidad explica cómo recopilamos, usamos, almacenamos y protegemos la
          información que recibimos a través de nuestro sitio web https://mandragora.vercel.app/ y de los servicios que
          ofrecemos.
        </p>
        <p>
          Al acceder o utilizar nuestros servicios, aceptas las prácticas descritas en esta Política de Privacidad. Si
          no estás de acuerdo con alguno de sus términos, por favor deja de usar el sitio.
        </p>
      </div>

      <div className={styles.section}>
        <h2>1. Información que recopilamos</h2>
        <p>Recopilamos los siguientes tipos de información:</p>
      </div>

      <div className={styles.section}>
        <h3>1.1. Información proporcionada directamente por el usuario</h3>
        <ul>
          <li className={styles.listItem}>Nombre, correo electrónico, número de teléfono u otros datos de contacto.</li>
          <li className={styles.listItem}>Información ingresada en formularios, encuestas o registros.</li>
          <li className={styles.listItem}>Datos relacionados con la creación de cuentas (si aplica).</li>
          <li className={styles.listItem}>
            Contenido enviado voluntariamente, como comentarios, testimonios o archivos.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>1.2. Información recopilada automáticamente</h3>
        <p>Cuando navegas por nuestro sitio, podemos recopilar:</p>
        <ul>
          <li className={styles.listItem}>Dirección IP.</li>
          <li className={styles.listItem}>Tipo de dispositivo y navegador.</li>
          <li className={styles.listItem}>Páginas visitadas y tiempo de navegación.</li>
          <li className={styles.listItem}>Datos de uso y métricas del sitio.</li>
          <li className={styles.listItem}>Cookies y tecnologías similares.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h3>1.3. Información proveniente de terceros</h3>
        <p>Podemos recibir información de:</p>
        <ul>
          <li className={styles.listItem}>Herramientas analíticas (Google Analytics, etc.).</li>
          <li className={styles.listItem}>Proveedores de autenticación o redes sociales (si se usan).</li>
          <li className={styles.listItem}>Plataformas de terceros integradas en nuestro servicio.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>2. Cómo utilizamos la información</h2>
        <p>Usamos la información recopilada para los siguientes fines:</p>

        <ul>
          <li className={styles.listItem}>Proveer, operar y mejorar nuestros servicios.</li>
          <li className={styles.listItem}>Crear y gestionar cuentas de usuario.</li>
          <li className={styles.listItem}>Ofrecer soporte técnico y atención al cliente.</li>
          <li className={styles.listItem}>Enviar notificaciones, actualizaciones o información relevante.</li>
          <li className={styles.listItem}>Analizar el desempeño del sitio y prevenir abusos.</li>
          <li className={styles.listItem}>Cumplir con obligaciones legales y de seguridad.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>3. Base legal para el tratamiento de datos</h2>
        <p>Tratamos tus datos personales sobre la base de:</p>

        <ul>
          <li className={styles.listItem}>Tu consentimiento expreso.</li>
          <li className={styles.listItem}>La necesidad de ejecutar un contrato o prestación de un servicio.</li>
          <li className={styles.listItem}>Intereses legítimos como mejorar la experiencia del usuario.</li>
          <li className={styles.listItem}>Cumplimiento de obligaciones legales aplicables.</li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>4. Cómo compartimos la información</h2>
        <p>No vendemos ni alquilamos tu información personal. Sin embargo, podemos compartirla con:</p>

        <ul>
          <li className={styles.listItem}>
            Proveedores de servicios que nos ayudan a operar el sitio (hosting, análisis, email, etc.).
          </li>
          <li className={styles.listItem}>Autoridades gubernamentales cuando la ley lo exija.</li>
          <li className={styles.listItem}>Terceros en caso de fusiones, adquisiciones o reestructuraciones.</li>
          <li className={styles.listItem}>Otras partes cuando lo autorices explícitamente.</li>
        </ul>
        <p>
          Todos los terceros que procesan datos en nuestro nombre están obligados a respetar esta Política y las leyes
          aplicables.
        </p>
      </div>

      <div className={styles.section}>
        <h2>5. Cookies y tecnologías similares</h2>
        <p>Utilizamos cookies para:</p>

        <ul>
          <li className={styles.listItem}>Recordar preferencias del usuario.</li>
          <li className={styles.listItem}>Analíticas y métricas de rendimiento.</li>
          <li className={styles.listItem}>Seguridad y prevención de fraudes.</li>
          <li className={styles.listItem}>
            Puedes configurar tu navegador para rechazar cookies, aunque algunas funciones del sitio podrían no
            funcionar correctamente.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>6. Retención de datos</h2>
        <p>Conservamos los datos personales durante el tiempo necesario para:</p>

        <ul>
          <li className={styles.listItem}>Cumplir los fines descritos en esta política.</li>
          <li className={styles.listItem}>Cumplir requisitos legales y regulatorios.</li>
          <li className={styles.listItem}>Resolver disputas y hacer cumplir acuerdos.</li>
          <li className={styles.listItem}>
            Cuando ya no sea necesario conservar tu información, la eliminaremos de forma segura.
          </li>
        </ul>
      </div>

      <div className={styles.section}>
        <h2>7. Seguridad de la información</h2>
        <p>
          Implementamos medidas técnicas y organizativas para proteger tus datos contra accesos no autorizados,
          pérdidas, alteraciones o divulgaciones.
        </p>
        <p>
          Sin embargo, ningún sistema es completamente seguro y no podemos garantizar la protección absoluta de los
          datos.
        </p>
      </div>

      <div className={styles.section}>
        <h2>8. Derechos del usuario</h2>
        <p>Dependiendo de tu jurisdicción, puedes tener derecho a:</p>

        <ul>
          <li className={styles.listItem}>Acceder a tus datos personales.</li>
          <li className={styles.listItem}>Solicitar correcciones o actualizaciones.</li>
          <li className={styles.listItem}>Pedir la eliminación de tus datos (“derecho al olvido”).</li>
          <li className={styles.listItem}>Retirar tu consentimiento en cualquier momento.</li>
          <li className={styles.listItem}>Solicitar una copia de tus datos en formato portable.</li>
          <li className={styles.listItem}>Oponerte al procesamiento en ciertos casos.</li>
        </ul>
        <p>Puedes ejercer estos derechos escribiendo a zoranbow@gmail.com.</p>
      </div>

      <div className={styles.section}>
        <h2>9. Privacidad de menores</h2>

        <p>Nuestros servicios no están dirigidos a menores de 5 años.</p>
        <p>
          No recopilamos intencionalmente datos de menores. Si crees que un menor nos ha proporcionado información,
          contáctanos para eliminarla.
        </p>
      </div>

      <div className={styles.section}>
        <h2>10. Enlaces a sitios de terceros</h2>
        <p>
          Nuestro sitio puede contener enlaces a sitios externos. No somos responsables de las prácticas de privacidad
          ni del contenido de dichos sitios. Te recomendamos leer sus políticas de privacidad.
        </p>
      </div>

      <div className={styles.section}>
        <h2>11. Cambios a esta Política de Privacidad</h2>
        <p>Nos reservamos el derecho de actualizar esta Política de Privacidad en cualquier momento.</p>
        <p>La nueva versión se publicará con una nueva fecha de actualización.</p>
        <p>El uso continuo del sitio después de los cambios implica aceptación de la política actualizada.</p>
      </div>

      <div className={styles.section}>
        <h2>12. Contacto</h2>
        <p>
          Si tienes dudas, solicitudes o quieres ejercer tus derechos relacionados con la privacidad, puedes
          contactarnos:
        </p>
        <p>
          <label className={styles.label}>Correo: </label>zoranbow@gmail.com
        </p>
        <p>
          <label className={styles.label}>Sitio web: </label>https://mandragora.vercel.app
        </p>
      </div>
    </div>
  );
}
