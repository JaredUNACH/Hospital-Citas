import React from 'react';
import styles from '../styles/AccountDetails.module.css'; // Importa el módulo CSS

const AccountDetails = () => {
  return (
    <div className={styles.main}>
      <div className={styles.topbar}>
        <div className={styles.toggle}>
          <ion-icon name="menu-outline"></ion-icon>
        </div>

        <div className={styles.nombre}>
          <h2>Hola, Jhovanny</h2>
        </div>

        <div className={styles.campana}>
          <i className="fas fa-bell"></i> {/* Icono de campana */}
          <div className={styles.notificationDot}></div> {/* Punto de notificación */}
          <div id="notification-modal" className={styles.modal}> {/* Modal de notificación */}
            <i className={`fas fa-times ${styles.close}`}></i> {/* Botón de cierre con icono */}
            <p>Tienes una nueva notificación</p> {/* Notificación de prueba */}
            <p>Un cliente</p>
          </div>
        </div>

        <div className={styles.user}>
          <img src="img/customer01.jpg" alt="User" />
        </div>
        <p className={styles.nombreUsuario}>Jhovanni Torres</p> {/* Nombre del usuario */}
        <p className={styles.tituloUsuario}>Encargado</p> {/* Título del usuario */}
      </div>

      <div className={styles.title}>
        <h2><em>EDITAR DATOS</em></h2>
      </div>

      <div className={styles.segundoEncabezado}>
        <div className={styles.iconoLapiz}>
          <i className="fas fa-pencil-alt"></i> {/* Icono de lápiz */}
          <h3>Editar</h3>
        </div>
        <div className={styles.lineaHorizontal}>
          <div className={styles.lineaCarga}></div> {/* Línea de carga */}
        </div>
        <div className={styles.domicilio}>
          <i className="fa-solid fa-2"></i>
          <h3>Domicilio</h3>
        </div>
      </div>

      <div className={styles.details}>
        <div className={styles.recentOrders}>
          <div className={styles.subtitulo}>
            <h3><em>Datos del RFC</em></h3>
          </div>
          <div className={styles.cardBox}>
            <div className={styles.input}>
              <div className={styles.tnombre}> RFC</div>
              <input type="text" placeholder="Escriba el RFC" id="inputRFC" />
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}> Nombre</div>
              <input type="text" placeholder="Escriba el nombre" id="inputNombre" />
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}> CURP</div>
              <input type="text" placeholder="Escriba la CURP" id="inputCURP" />
            </div>
          </div>
          <div className={styles.subtitulo}>
            <h3><em>Datos Personales</em></h3>
          </div>
          <div className={styles.cardBox2}>
            <div className={styles.input}>
              <div className={styles.tnombre}> Sexo</div>
              <div style={{ display: 'flex', paddingTop: '5px' }}>
                <div style={{ paddingRight: '50px' }}>
                  <input type="checkbox" id="si" name="sexo" value="si" />
                  <label htmlFor="si" style={{ marginLeft: '10px' }}>H</label>
                </div>
                <div>
                  <input type="checkbox" id="no" name="sexo" value="no" />
                  <label htmlFor="no" style={{ marginLeft: '10px' }}>M</label>
                </div>
              </div>
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}>Estado Civil</div>
              <select id="input2">
                <option value="" disabled>Escriba el Estado Civil</option>
                <option value="soltero" selected>Soltero</option>
                <option value="casado">Casado</option>
                {/* Agregar más opciones */}
              </select>
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}>Email</div>
              <input type="text" placeholder="Escriba el Email" id="input1" />
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}>Telefono</div>
              <input type="text" placeholder="Escriba el Telefono" id="input2" />
            </div>
          </div>
          <div className={styles.cardBox}>
            <div className={styles.input}>
              <div className={styles.tnombre}>Celular</div>
              <input type="text" placeholder="Escriba el Celular" id="input2" />
            </div>
            <div className={styles.input}>
              <div className={styles.tnombre}>Tel.Recados</div>
              <input type="text" placeholder="Escriba el Tel.Recados" id="input1" />
            </div>
          </div>
          <div className={styles.botonBuscar}>
            <button type="button" className={styles.botonAtras}>Cancelar</button>
            <button type="button" onClick={() => alert('Datos guardados')}>Guardar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;