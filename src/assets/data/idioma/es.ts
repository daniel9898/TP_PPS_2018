//IDIOMA ESPAÑOL
export const Idioma = {
    es:{
      //DATA GENERAL
      code: "es",
      name: "Español",
      moneda_simbolo: "$",
      unidad_medida: "KM",
      //PAGINAS COMUNES*******************************************************//
      pag_login:{
          titulo: "KB REMISERIA",
          placeholder:{
            user: 'Usuario',
            pass: 'Contraseña'
          },
          error:{
            required: 'Campo requerido ↑',
            email:    'Formato incorrecto ↑',
          },
          button:{
            login:      'Ingresar',
            registro_1: '¿No tienes una cuenta?',
            registro_2: '¡Regístrate gratis!'
          },
          mensaje:{
            msj_1:'Usuario y/o contraseña incorrecta',
            msj_2:'Cuenta inexistente',
            msj_3:'Cuenta desactivada',
            msj_4:'Bienvenido'
          }
      },
      pag_registro:{
          placeholder:{
            user:  'Correo',
            pass1: 'Contraseña',
            pass2: 'Repetir contraseña'
          },
          error:{
            required: 'Campo requerido',
            email:    'Formato incorrecto',
            pass_1:   'La clave debe ser minimo de 6 caracteres',
            pass_2:   'La clave no es idéntica a la ingresada'
          },
          button:  'Registrarse',
          mensaje:{
            msj_1: 'Cuenta no disponible',
            msj_2: 'Correo inválido'
          }
      },
      pag_perfil:{
          label:{
            correo:     'Correo',
            nombre:     'Nombre',
            edad:       'Edad',
            direccion:  'Dirección',
            perfil:     'Perfil',
            viajando:   'Viajando',
            activo:     'Activo',
            verificado: 'Verificado'
          },
          error:{
            required: 'Campo requerido',
            email:    'Formato incorrecto',
            nombre_1: 'Mínimo: 5 caracteres',
            nombre_2: 'Máximo: 30 caracteres',
            edad_1:   'Edad mínima: 14',
            edad_2:   'Edad máxima: 100'
          },
          mensaje:{
            msj_1:    'Clave cambiada',
            msj_2:    'Clave inválida',
            msj_3:    'Usuario eliminado',
            msj_4:    'Correo no disponible',
            msj_5:    'Correo inválido',
            msj_6:    'Cambios realizados con éxito'
          }
      },
      pag_clave:{
          placeholder:{
            pass1:  'Contraseña',
            pass2:  'Nueva contraseña',
            pass3:  'Repetir contraseña'
          },
          error:{
            required: 'Campo requerido',
            pass_1:   'Mínimo 6 caracteres',
            pass_2:   'Clave no idéntica'
          },
          button: 'Aceptar'
      },
      pag_mapa:{
          label: 'Dirección'
      },
      pag_qr:{
        msj:         "Centre el código sobre el rectángulo",
        inaccesible: "Acceso no disponible",
        desconocido: "Código desconocido",
        navegador:   "ALERTA: esto es una prueba desde el navegador"
      },
      pag_lista_general:{
        placeholder: 'buscar'
      },
      //PAGINAS CLIENTE*******************************************************//
      pag_viaje_cliente:{
        label:{
          origen:        "Origen",
          destino:       "Destino",
          distancia:     "Distancia",
          precio:        "Precio",
          hora:          "Hora",
          button_ok:     "Listo",
          button_cancel: "Cancelar"
        },
        msj_final:{
          titulo:    "FIN DEL RECORRIDO",
          subtitulo: "¡Gracias por elegirnos!",
          texto_1:   "¿Estás conforme?",
          texto_2:   "Ingresa en la encuesta y danos tu opinión"
        },
        chofer:{
          titulo:  "DATOS DEL CHOFER",
          nombre:  "Nombre:",
          patente: "Patente:"
        },
        estados:{
          titulo:            "ESTADO",
          pendiente:         "Buscando chofer",
          tomado:            "Chofer asignado - aguarde llegada",
          en_curso:          "Viaje iniciado",
          cumplido:          "Viaje finalizado",
          cancelado_cliente: "Viaje cancelado",
          cancelado_sistema: "Viaje cancelado por sistema"
        }
      },
      pag_reserva_cliente:{
        label:{
          origen:    "Dirección origen",
          fecha:     "Fecha",
          hora:      "Hora",
          destino:   "Dirección destino",
          button:    "Guardar"
        },
        mensaje: "Reserva generada"
      },
      pag_reservas_cliente:{
        titulo: "Reservas",
        mensaje: "Reserva eliminada"
      },
      pag_encuesta_cliente:{
        perfil: 'Cliente',
        titulo: 'Encuesta de satisfacción',
        mensaje: "¡Gracias por participar!",
        preguntas:{
          //SELECT
          p_1: {
              p:"¿Cómo calificarías el servicio?",
              op:{
                1:"Excelente",
                2:"Eficiente",
                3:"Regular",
                4:"Deficiente",
                5:"Nefasto"
              }
          },
          //RANGE
          p_2: {
              p:"¿Qué tal ha sido la atención del chofer?",
              op:{
                1:"Muy mala",
                2:"Mala",
                3:"Regular",
                4:"Bien",
                5:"Muy bien"
              }
          },
          //RADIO
          p_3: {
              p:"¿El vehículo estaba en condiciones?",
              op:{
                1:"Sí",
                2:"No",
                3:"No lo sé"
              }
          },
          //CHECKBOX
          p_4: {
            p:"¿Se ha respetado la ruta marcada?",
          },
          //INPUT
          p_5: {
            p:"Comentarios"
          }
        }
      },
      pag_encuestas_cliente:{
        titulo: 'VIAJES',
        subtitulo: '-sin encuesta-'
      },
      pag_historial_cliente:{
        viajes:    'Viajes',
        reservas:  'Reservas',
        encuestas: 'Encuestas'
      },
      pag_estadistica_cliente:{
        subtitulo_1: 'Individual',
        subtitulo_2: 'General',
        tema:        'Calidad del servicio',
        valores:{
          1:"Excelente",
          2:"Bueno",
          3:"Regular",
          4:"Deficiente",
          5:"Nefasto"
        }
      },
      //PAGINAS CHOFER********************************************************//
      pag_inicio_chofer:{
        mensaje:{
          msj_1: 'Tiene un viaje asignado',
          msj_2: 'Atención: vehículo no disponible o código incorrecto',
          msj_3: 'Atención: ',
          msj_4: 'Vehículo asignado correctamente'
        }
      },
      pag_lista_viajes_chofer:{
        titulo:  'Viajes pendientes',
        label:{
          fecha: 'Fecha:',
          hora:  'Hora',
          desde: 'Desde:',
          hasta: 'Hasta:'
        },
        mensaje:{
          msj_1: 'Tiene un viaje asignado',
          msj_2: 'Atención: '
        }
      },
      pag_viaje_chofer:{
        titulo: 'Datos del viaje',
        label:{
          direccion: 'Dirección de búsqueda',
          destino:   'Destino',
          hora:      'Hora',
          precio:    'Precio'
        },
        button:{
          b_1: 'Cancelar',
          b_2: 'En curso',
          b_3: 'Cumplido'
        },
        mensaje:{
          msj_1: 'Viaje en estado: en curso',
          msj_2: 'Viaje desasignado',
          msj_3: 'Atención: '
        },
      },
      pag_modal_viaje_chofer:{
        titulo:'Detalle del viaje',
        button:'Cerrar',
        label:{
          monto:     'Monto a abonar:',
          distancia: 'Distancia recorrida:'
        }
      },
      pag_encuesta_chofer:{
        titulo: 'Control de Unidad Asignada',
        patente: 'Patente',
        mensaje: "Encuesta registrada",
        preguntas:{
          //SELECT
          p_1: {
              p:"¿Cómo calificarías el estado general?",
              op:{
                1:"Excelente",
                2:"Bueno",
                3:"Regular",
                4:"Deficiente",
                5:"Nefasto"
              }
          },
          //RANGE
          p_2: {
              p:"¿Estado de Limpieza?",
              op:{
                1:"Muy malo",
                2:"Malo",
                3:"Regular",
                4:"Bien",
                5:"Muy bien"
              }
          },
          //RADIO
          p_3: {
              p:"¿Posee raspones/choques?",
              op:{
                1:"Sí",
                2:"No",
                3:"No lo sé"
              }
          },
          //CHECKBOX
          p_4: {
            p:"¿Arrancó sin problemas?"
          },
          //INPUT
          p_5: {
            p:"Comentarios"
          }
        }
      },
      pag_estadistica_chofer:{
        titulo: 'Reputación',
        viajes: 'Viajes realizados: ',
        valores:{
          1:"Excelente",
          2:"Bueno",
          3:"Regular",
          4:"Deficiente",
          5:"Nefasto"
        }
      },
      //PAGINAS SUPERVISOR****************************************************//
      pag_inicio_supervisor:{
        temas:{
          choferes: 'Choferes disponibles',
          viajes:   'Viajes según estados'
        },
        valores_viaje:{
          1:'pendiente',
          2:'cancelado',
          3:'en curso',
          4:'cumplido'
        },
        valores_chofer:{
          1:'Disponibles',
          2:'No disponibles'
        },
        mensajes:{
          msj_1:  'No hay choferes disponibles para ese vehículo',
          msj_2:  'No es un código válido',
          msj_qr: 'Centre el código sobre el rectángulo'
        }
      },
      pag_lista_viajes_supervisor:{
        titulo: 'Viajes pendientes',
        label:  'Destino: '
      },
      pag_lista_reservas_supervisor:{
        titulo: 'Lista de reservas',
        label:  'Destino: '
      },
      pag_lista_usuarios_supervisor:{
        placeholder: 'buscar',
        mensaje:{
          msj_1: 'Usuario eliminado',
          msj_2: 'Error al realizar acción: '
        }
      },
      pag_lista_vehiculos_supervisor:{
        placeholder: 'buscar'
      },
      pag_registro_usuario:{
        cliente: 'Cliente',
        chofer:  'Chofer'
      },
      pag_registro_cliente_supervisor:{
        label:{
          correo:     'Correo',
          nombre:     'Nombre',
          edad:       'Edad',
          direccion:  'Dirección',
          perfil:     'Perfil',
          viajando:   'Viajando',
          activo:     'Activo',
          verificado: 'Verificado'
        },
        mensaje:{
          msj_1: 'Usuario creado',
          msj_2: 'Correo no disponible',
          msj_3: 'Correo inválido'
        }
      },
      pag_registro_chofer_supervisor:{
        titulo: 'Alta de choferes',
        label:{
          nombre:    'Nombre',
          apellido:  'Apellido',
          edad:      'Edad',
          direccion: 'Dirección',
          correo:    'Correo electrónico',
          password:  'Contraseña'
        },
        mensaje:{
          msj_1:'Registro exitoso',
          msj_2:'Atención: '
        },
        button: 'Guardar'
      },
      pag_registro_vehiculo_supervisor:{
        button: 'Editar',
        label:{
          marca:   'Marca',
          modelo:  'Modelo',
          año:     'Año',
          patente: 'Patente',
          activo:  'Activo'
        },
        placeholder:{
          1: 'ABC123',
          2: 'AB123CD'
        },
        error:{
          marca:     'Mínimo 3 caracteres',
          patente_1: 'Sin espacios',
          patente_2: 'Formato incorrecto [ABC123]',
          patente_3: 'Formato incorrecto [AB123CD]'
        }
      },
      pag_photoTaker_supervisor:{
        button:{
          b_1: 'Guardar',
          b_2: 'Subir a '
        },
        mensaje:{
          msj_1: 'Foto subida',
          msj_2: 'Foto eliminada'
        }
      },
      pag_choferes_disponibles_supervisor:{
        titulo: 'Choferes disponibles'
      },
      pag_asignar_viaje_supervisor:{
        titulo: 'Asignar viaje',
        label:{
          chofer:  'Chofer: ',
          datos:   'Datos del viaje',
          origen:  'Origen: ',
          destino: 'Destino: '
        },
        button:{
          b_1: 'Asignar',
          b_2: 'Desasignar'
        }
      }

    }
}
