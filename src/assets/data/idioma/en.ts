//IDIOMA INGLÉS
export const Idioma_en = {
    en:{
      //DATA GENERAL
      code: "en",
      name: "English",
      moneda_simbolo: "U$S",
      unidad_medida: "Mi",
      //PAGINAS COMUNES*******************************************************//
      pag_menu:{
        titulo: "Menu",
        label: "User:",
        opcion:{
          1:  "Start",
          2:  "Profile",
          3:  "Request travel",
          4:  "My reservations",
          5:  "My history",
          6:  "Statistics",
          7:  "Pending surveys",
          8:  "Earnings",
          9:  "Users list",
          10: "Vehicles list",
          11: "Travels/Reservations"
        }
      },
      pag_login:{
          titulo: "KB REMISERIA",
          placeholder:{
            user: 'User',
            pass: 'Password'
          },
          error:{
            required: 'Field required ↑',
            email:    'Incorrect format ↑',
          },
          button:{
            login:      'Sign in',
            registro_1: "You don't have an account?",
            registro_2: 'Sign up free!'
          },
          mensaje:{
            msj_1:'Incorrect username and / or password',
            msj_2:'Non-existent account',
            msj_3:'Account disabled',
            msj_4:'Welcome'
          }
      },
      pag_registro:{
          placeholder:{
            user:  'Email',
            pass1: 'Password',
            pass2: 'Repeat password'
          },
          error:{
            required: 'Field required',
            email:    'Incorrect format',
            pass_1:   'The password must be a minimum of 6 characters',
            pass_2:   'The key is not identical to the one entered'
          },
          button:  'Sign up',
          mensaje:{
            msj_1: 'Account not available',
            msj_2: 'Invalid email'
          }
      },
      pag_perfil:{
          label:{
            correo:     'Email',
            nombre:     'Name',
            edad:       'Age',
            direccion:  'Address',
            perfil:     'Profile',
            viajando:   'Traveling',
            activo:     'Active',
            verificado: 'Verified'
          },
          error:{
            required: 'Field required',
            email:    'Incorrect format',
            nombre_1: 'Minimum: 5 characters',
            nombre_2: 'Maximum: 30 characters',
            edad_1:   'Minimum age: 14',
            edad_2:   'Maximum age: 100'
          },
          mensaje:{
            msj_1:    'Changed password',
            msj_2:    'Invalid password',
            msj_3:    'User deleted',
            msj_4:    'Mail not available',
            msj_5:    'Invalid email',
            msj_6:    'Changes made successfully',
            msj_7:    'User created'
          }
      },
      pag_clave:{
          placeholder:{
            pass1:  'Password',
            pass2:  'New contraseña',
            pass3:  'Repeat contraseña'
          },
          error:{
            required: 'Field required',
            pass_1:   'Min 6 characters',
            pass_2:   'Non-identical key'
          },
          button: 'Accept'
      },
      pag_mapa:{
          label: 'Address'
      },
      pag_qr:{
        msj:         "Center the code on the rectangle",
        inaccesible: "Access not available",
        desconocido: "Unknown code",
        navegador:   "ALERT: this is a test from the browser"
      },
      pag_lista_general:{
        placeholder: 'search'
      },
      //PAGINAS CLIENTE*******************************************************//
      pag_viaje_cliente:{
        label:{
          origen:        "Origin",
          destino:       "Destination",
          distancia:     "Distance",
          precio:        "Price",
          hora:          "Hour",
          button_ok:     "Ready",
          button_cancel: "Cancel"
        },
        msj_final:{
          titulo:    "END OF THE ROUTE",
          subtitulo: "Thank you for choosing us!",
          texto_1:   "Are you conformable?",
          texto_2:   "Enter the survey and give us your opinion"
        },
        chofer:{
          titulo:  "DRIVER'S DATA",
          nombre:  "Name:",
          patente: "Patent:"
        },
        estados:{
          titulo:            "STATE",
          pendiente:         "Looking for a driver",
          tomado:            "Assigned driver - await arrival",
          en_curso:          "Trip started",
          cumplido:          "Trip completed",
          cancelado_cliente: "Trip canceled",
          cancelado_sistema: "Trip canceled by system"
        }
      },
      pag_reserva_cliente:{
        label:{
          origen:    "Origin address",
          fecha:     "Date",
          hora:      "Hour",
          destino:   "Destination address",
        },
        mensaje:   "Reservation generated",
        button:{
          b_1: "Save",
          b_2: "Ready",
          b_3: "Cancel"
        }
      },
      pag_reservas_cliente:{
        titulo: "Reservations",
        mensaje: "Reservation deleted"
      },
      pag_encuesta_cliente:{
        perfil: 'Client',
        titulo: 'Satisfaction survey',
        mensaje: "Thank you for participating!",
        preguntas:{
          //SELECT
          p_1: {
              p:"How would you rate the service?",
              op:{
                1:"Excellent",
                2:"Efficient",
                3:"Regular",
                4:"Deficient",
                5:"Disastrous"
              }
          },
          //RANGE
          p_2: {
              p:"How was the driver's attention?",
              op:{
                1:"Very bad",
                2:"Bad",
                3:"Regular",
                4:"Good",
                5:"Very good"
              }
          },
          //RADIO
          p_3: {
              p:"The vehicle was in condition?",
              op:{
                1:"Yes",
                2:"No",
                3:"I don't know"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Has the marked route been respected?",
          },
          //INPUT
          p_5: {
            p:"Comments"
          }
        }
      },
      pag_encuestas_cliente:{
        titulo: 'TRAVELS',
        subtitulo: '-without survey-'
      },
      pag_historial_cliente:{
        viajes:    'Travels',
        reservas:  'Reservations',
        encuestas: 'Surveys'
      },
      pag_estadistica_cliente:{
        subtitulo_1: 'Individual',
        subtitulo_2: 'General',
        tema:        'Quality of service',
        valores:{
          1:"Excellent",
          2:"Good",
          3:"Regular",
          4:"Deficient",
          5:"Disastrous"
        }
      },
      //PAGINAS CHOFER********************************************************//
      pag_inicio_chofer:{
        mensaje:{
          msj_1: 'You have an assigned trip',
          msj_2: 'Attention: vehicle not available or incorrect code',
          msj_3: 'Attention: ',
          msj_4: 'Vehicle correctly assigned'
        }
      },
      pag_lista_viajes_chofer:{
        titulo:  'Pending trips',
        label:{
          fecha: 'Date:',
          hora:  'Hour',
          desde: 'From:',
          hasta: 'To:'
        },
        mensaje:{
          msj_1: 'You have an assigned trip',
          msj_2: 'Attention: '
        }
      },
      pag_viaje_chofer:{
        titulo: "Travel's data",
        label:{
          direccion: "Search address",
          destino:   "Destination",
          hora:      "Hour",
          precio:    "Price"
        },
        button:{
          b_1: "Cancel",
          b_2: "In progress",
          b_3: "Accomplished"
        },
        mensaje:{
          msj_1: "Travel in status: in progress",
          msj_2: "The trip was unassigned",
          msj_3: "Attention: "
        },
      },
      pag_modal_viaje_chofer:{
        titulo:"Travel's details",
        button:"Close",
        label:{
          monto:     "Amount to be paid:",
          distancia: "Distance traveled:"
        }
      },
      pag_encuesta_chofer:{
        titulo: 'Assigned Unit Control',
        patente: 'Patent',
        mensaje: "Survey was registered",
        preguntas:{
          //SELECT
          p_1: {
              p:"How would you rate the general state?",
              op:{
                1:"Excellent",
                2:"Efficient",
                3:"Regular",
                4:"Deficient",
                5:"Disastrous"
              }
          },
          //RANGE
          p_2: {
              p:"Cleaning status?",
              op:{
                1:"Very bad",
                2:"Bad",
                3:"Regular",
                4:"Good",
                5:"Very good"
              }
          },
          //RADIO
          p_3: {
              p:"Does it have scratches / damage?",
              op:{
                1:"Yes",
                2:"No",
                3:"I don't know"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Did it start without problems?"
          },
          //INPUT
          p_5: {
            p:"Comments"
          }
        }
      },
      pag_estadistica_chofer:{
        titulo: 'Reputation',
        viajes: 'Trips made:',
        valores:{
          1:"Excellent",
          2:"Good",
          3:"Regular",
          4:"Deficient",
          5:"Disastrous"
        }
      },
      //PAGINAS SUPERVISOR****************************************************//
      pag_inicio_supervisor:{
        temas:{
          choferes: 'Available drivers',
          viajes:   'Travels according to states'
        },
        valores_viaje:{
          1:'pending',
          2:'cancelled',
          3:'in progress',
          4:'accomplished'
        },
        valores_chofer:{
          1:'Availables',
          2:'Not availables'
        },
        mensaje:{
          msj_1:  'No drivers available for that vehicle',
          msj_2:  'Invalid code'
        }
      },
      pag_lista_viajes_supervisor:{
        titulo: 'Pending trips',
        label:  'Destination: '
      },
      pag_lista_reservas_supervisor:{
        titulo: "Reservation's list",
        label:  'Destination: '
      },
      pag_lista_usuarios_supervisor:{
        mensaje:{
          msj_1: 'User deleted',
          msj_2: 'Error when performing action:'
        }
      },
      pag_lista_vehiculos_supervisor:{
        mensaje: 'Vehicle removed'
      },
      pag_registro_usuario:{
        cliente: 'Client',
        chofer:  'Driver'
      },
      pag_registro_chofer_supervisor:{
        label:{
          nombre:    'Name',
          apellido:  'Lastname',
          edad:      'Age',
          direccion: 'Address',
          correo:    'Email',
          password:  'Password'
        },
        mensaje:{
          msj_1:'Successfully registered',
          msj_2:'Error: '
        },
        button: 'Save'
      },
      pag_registro_vehiculo_supervisor:{
        button:{
          b_1: "Save",
          b_2: "Edit"
        },
        mensaje: 'Vehicle added',
        label:{
          marca:   'Brand',
          modelo:  'Model',
          ano:     'Year',
          patente: 'Patent',
          activo:  'Active'
        },
        placeholder:{
          1: 'ABC123',
          2: 'AB123CD'
        },
        error:{
          marca:     'Minimum 3 characters',
          patente_1: 'Do not add spaces',
          patente_2: 'Correct format [ ABC123 ]',
          patente_3: 'Correct format [ AB123CD ]'
        }
      },
      pag_photoTaker_supervisor:{
        button:{
          b_1: 'Save',
          b_2: 'Upload'
        },
        mensaje:{
          msj_1: 'Photo uploaded',
          msj_2: 'Photo deleted'
        }
      },
      pag_choferes_disponibles_supervisor:{
        titulo: 'Available drivers'
      },
      pag_asignar_viaje_supervisor:{
        titulo: 'Assign trip',
        label:{
          chofer:  'Driver: ',
          datos:   "Travel's data",
          origen:  'Origin: ',
          destino: 'Destination: ',
          fecha:   'Date:',
          hora:    'Hour:'
        },
        button:{
          b_1: 'Assign',
          b_2: 'Unassign'
        }
      }

    }
}
