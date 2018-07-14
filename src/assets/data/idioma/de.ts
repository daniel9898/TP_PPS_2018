//IDIOMA ALEMÁN
export const Idioma_de = {
    de:{
      //DATA GENERAL
      code: "de",
      name: "Deutsch",
      moneda_simbolo: "€",
      unidad_medida: "Km",
      //PAGINAS COMUNES*******************************************************//
      pag_menu:{
        titulo: "Menü",
        label: "Benutzer:",
        opcion:{
          1:  "Zuhause",
          2:  "Profil",
          3:  "Fragen Sie nach einer Reise",
          4:  "Meine Bedenken",
          5:  "Meine Geschichte",
          6:  "Statistiken",
          7:  "Umfragen stehen aus",
          8:  "Einnahmen",
          9:  "Benutzerliste",
          10: "Liste der Fahrzeuge",
          11: "Reisen / Reservierungen"
        }
      },
      pag_login:{
          titulo: "KB REMISERIA",
          placeholder:{
            user: 'Benutzer',
            pass: 'Passwort'
          },
          error:{
            required: 'Pflichtfeld ↑',
            email:    'Falsches Format ↑',
          },
          button:{
            login:      'Geben Sie ein',
            registro_1: 'Hast du kein Konto?',
            registro_2: 'Melde dich kostenlos an!'
          },
          mensaje:{
            msj_1:'Falscher Benutzername und / oder falsches Passwort',
            msj_2:'Nicht existierendes Konto',
            msj_3:'Konto deaktiviert',
            msj_4:'Willkommen'
          }
      },
      pag_registro:{
          placeholder:{
            user:  'E-Mail',
            pass1: 'Passwort',
            pass2: 'Passwort wiederholen'
          },
          error:{
            required: 'Pflichtfeld',
            email:    'Falsches Format',
            pass_1:   'Das Passwort muss mindestens 6 Zeichen lang sein',
            pass_2:   'Der Schlüssel ist nicht identisch'
          },
          button:  'Registrieren',
          mensaje:{
            msj_1: 'Konto nicht verfügbar',
            msj_2: 'Ungültige E-Mail'
          }
      },
      pag_perfil:{
          label:{
            correo:     'E-Mail',
            nombre:     'Name',
            edad:       'Alter',
            direccion:  'Adresse',
            perfil:     'Profil',
            viajando:   'Reisen',
            activo:     'Aktiv',
            verificado: 'Überprüft'
          },
          error:{
            required: 'Pflichtfeld',
            email:    'Falsches Format',
            nombre_1: 'Minimum: 5 Zeichen',
            nombre_2: 'Maximal: 30 Zeichen',
            edad_1:   'Mindestalter: 14',
            edad_2:   'Höchstalter: 100'
          },
          mensaje:{
            msj_1:    'Passwort geändert',
            msj_2:    'Ungültiges Passwort',
            msj_3:    'Gelöschter Benutzer',
            msj_4:    'Mail nicht verfügbar',
            msj_5:    'Ungültige E-Mail',
            msj_6:    'Änderungen wurden erfolgreich durchgeführt',
            msj_7:    'Erstellte Benutzer'
          }
      },
      pag_clave:{
          placeholder:{
            pass1:  'Passwort',
            pass2:  'Neues Passwort',
            pass3:  'Passwort wiederholen'
          },
          error:{
            required: 'Pflichtfeld',
            pass_1:   'Mindestens 6 Zeichen',
            pass_2:   'Nicht identischer Schlüssel'
          },
          button: 'Akzeptieren'
      },
      pag_mapa:{
          label: 'Adresse'
      },
      pag_qr:{
        msj:         "Zentrieren Sie den Code auf dem Rechteck",
        inaccesible: "Zugang nicht verfügbar",
        desconocido: "Unbekannter Code",
        navegador:   "ALERT: Dies ist ein Test vom Browser"
      },
      pag_lista_general:{
        placeholder: 'finden'
      },
      //PAGINAS CLIENTE*******************************************************//
      pag_viaje_cliente:{
        label:{
          origen:        "Herkunft",
          destino:       "Ziel",
          distancia:     "Entfernung",
          precio:        "Preis",
          hora:          "Stunde",
          button_ok:     "Bereit",
          button_cancel: "Abbrechen"
        },
        msj_final:{
          titulo:    "Ende der Route",
          subtitulo: "Danke, dass Sie uns gewählt haben!",
          texto_1:   "Bist du glücklich?",
          texto_2:   "Geben Sie die Umfrage ein und teilen Sie uns Ihre Meinung mit"
        },
        chofer:{
          titulo:  "Treiberinformationen",
          nombre:  "Name:",
          patente: "Patent:"
        },
        estados:{
          titulo:            "Staat",
          pendiente:         "Auf der Suche nach einem Fahrer",
          tomado:            "Zugeordneter Fahrer - Ankunft erwarten",
          en_curso:          "Die Reise begann",
          cumplido:          "Reise beendet",
          cancelado_cliente: "Reise abgesagt",
          cancelado_sistema: "Reise vom System abgebrochen"
        }
      },
      pag_reserva_cliente:{
        label:{
          origen:    "Ursprungsadresse",
          fecha:     "Datum",
          hora:      "Stunde",
          destino:   "Zieladresse",
        },
        mensaje: "Generierte Reservierung",
        button:{
          b_1: "Speichern",
          b_2: "Bereit",
          b_3: "Abbrechen"
        }
      },
      pag_reservas_cliente:{
        titulo: "Reservierungen",
        mensaje: "Reservierung gelöscht"
      },
      pag_encuesta_cliente:{
        perfil: 'Kunde',
        titulo: 'Zufriedenheitsumfrage',
        mensaje: "Danke für die Teilnahme!",
        preguntas:{
          //SELECT
          p_1: {
              p:"Wie würdest du den Service bewerten?",
              op:{
                1:"Ausgezeichnet",
                2:"Effizient",
                3:"Regulär",
                4:"Schlechte",
                5:"Schändlich"
              }
          },
          //RANGE
          p_2: {
              p:"Wie war die Aufmerksamkeit des Fahrers?",
              op:{
                1:"Sehr schlecht",
                2:"Schlecht",
                3:"Regulär",
                4:"Gut",
                5:"Sehr gut"
              }
          },
          //RADIO
          p_3: {
              p:"Das Fahrzeug war in einem Zustand?",
              op:{
                1:"Ja",
                2:"Nein",
                3:"Ich weiß es nicht"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Wurde die markierte Route eingehalten?",
          },
          //INPUT
          p_5: {
            p:"Kommentare"
          }
        }
      },
      pag_encuestas_cliente:{
        titulo: 'Reisen',
        subtitulo: '-ohne Umfrage-'
      },
      pag_historial_cliente:{
        viajes:    'Reisen',
        reservas:  'Reservierungen',
        encuestas: 'Umfragen'
      },
      pag_estadistica_cliente:{
        subtitulo_1: 'Individuell',
        subtitulo_2: 'Allgemein',
        tema:        'Qualität der Dienstleistung',
        valores:{
          1:"Ausgezeichnet",
          2:"Effizient",
          3:"Regulär",
          4:"Schlechte",
          5:"Schändlich"
        }
      },
      //PAGINAS CHOFER********************************************************//
      pag_inicio_chofer:{
        mensaje:{
          msj_1: 'Habe eine zugewiesene Reise',
          msj_2: 'Achtung: Fahrzeug nicht verfügbar oder falscher Code',
          msj_3: 'Achtung: ',
          msj_4: 'Fahrzeug richtig zugeordnet'
        }
      },
      pag_lista_viajes_chofer:{
        titulo:  'Ausstehende Reisen',
        label:{
          fecha: 'Datum:',
          hora:  'Stunde:',
          desde: 'Von:',
          hasta: 'Bis:'
        },
        mensaje:{
          msj_1: 'Habe eine zugewiesene Reise',
          msj_2: 'Achtung: '
        }
      },
      pag_viaje_chofer:{
        titulo: 'Reiseinformationen',
        label:{
          direccion: 'Adresse suchen',
          destino:   'Ziel',
          hora:      'Stunde',
          precio:    'Preis'
        },
        button:{
          b_1: 'Abbrechen',
          b_2: 'In Bearbeitung',
          b_3: 'Abgeschlossen'
        },
        mensaje:{
          msj_1: 'Reise im Status: in Bearbeitung',
          msj_2: 'Nicht zugewiesene Reise',
          msj_3: 'Achtung: '
        },
      },
      pag_modal_viaje_chofer:{
        titulo:'Reisedetail',
        button:'Schließen',
        label:{
          monto:     'Zu zahlender Betrag:',
          distancia: 'Zurückgelegte Strecke:'
        }
      },
      pag_encuesta_chofer:{
        titulo: 'Zugewiesene Einheitensteuerung',
        patente: 'Patent',
        mensaje: "Registrierte Umfrage",
        preguntas:{
          //SELECT
          p_1: {
              p:"Wie würdest du den allgemeinen Zustand bewerten?",
              op:{
                1:"Ausgezeichnet",
                2:"Effizient",
                3:"Regulär",
                4:"Schlechte",
                5:"Schändlich"
              }
          },
          //RANGE
          p_2: {
              p:"Reinigungsstatus?",
              op:{
                1:"Sehr schlecht",
                2:"Schlecht",
                3:"Regulär",
                4:"Gut",
                5:"Sehr gut"
              }
          },
          //RADIO
          p_3: {
              p:"Hat es Kratzer / Stöße?",
              op:{
                1:"Ja",
                2:"Nein",
                3:"Ich weiß es nicht"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Beginnt es ohne Probleme?"
          },
          //INPUT
          p_5: {
            p:"Kommentare"
          }
        }
      },
      pag_estadistica_chofer:{
        titulo: 'Schätzung',
        viajes: 'Ausflüge gemacht:',
        valores:{
          1:"Sehr schlecht",
          2:"Schlecht",
          3:"Regulär",
          4:"Gut",
          5:"Sehr gut"
        }
      },
      //PAGINAS SUPERVISOR****************************************************//
      pag_inicio_supervisor:{
        temas:{
          choferes: 'Verfügbare Treiber',
          viajes:   'Reisen nach Staaten'
        },
        valores_viaje:{
          1:'ausstehend',
          2:'abgesagt',
          3:'in Bearbeitung',
          4:'erfüllt'
        },
        valores_chofer:{
          1:'Verfügbar',
          2:'Nicht verfügbar'
        },
        mensaje:{
          msj_1:  'Für dieses Fahrzeug sind keine Fahrer verfügbar',
          msj_2:  'Ungültiger Code'
        }
      },
      pag_lista_viajes_supervisor:{
        titulo: 'Ausstehende Reisen',
        label:  'Ziel: '
      },
      pag_lista_reservas_supervisor:{
        titulo: 'Liste der Reservierungen',
        label:  'Ziel: '
      },
      pag_lista_usuarios_supervisor:{
        mensaje:{
          msj_1: 'Gelöschter Benutzer',
          msj_2: 'Fehler beim Ausführen der Aktion: '
        }
      },
      pag_lista_vehiculos_supervisor:{
        mensaje: 'Fahrzeug entfernt'
      },
      pag_registro_usuario:{
        cliente: 'Kunde',
        chofer:  'Fahrer'
      },
      pag_registro_chofer_supervisor:{
        label:{
          nombre:    'Name',
          apellido:  'Nachname',
          edad:      'Alter',
          direccion: 'Adresse',
          correo:    'E-Mail',
          password:  'Passwort'
        },
        mensaje:{
          msj_1:'Erfolgreiche Registrierung',
          msj_2:'Fehler: '
        },
        button: 'Speichern'
      },
      pag_registro_vehiculo_supervisor:{
        button:{
          b_1: "Speichern",
          b_2: "Bearbeiten"
        },
        mensaje: 'Fahrzeug hinzugefügt',
        label:{
          marca:   'Marke',
          modelo:  'Modell',
          ano:     'Jahr',
          patente: 'Patent',
          activo:  'Aktiv'
        },
        placeholder:{
          1: 'ABC123',
          2: 'AB123CD'
        },
        error:{
          marca:     'Mindestens 3 Zeichen',
          patente_1: 'Fügen Sie keine Leerzeichen hinzu',
          patente_2: 'Korrektes Format [ ABC123 ]',
          patente_3: 'Korrektes Format [ AB123CD ]'
        }
      },
      pag_photoTaker_supervisor:{
        button:{
          b_1: 'Speichern',
          b_2: 'Hochladen'
        },
        mensaje:{
          msj_1: 'Foto hochladen',
          msj_2: 'Foto gelöscht'
        }
      },
      pag_choferes_disponibles_supervisor:{
        titulo: 'Verfügbare Treiber'
      },
      pag_asignar_viaje_supervisor:{
        titulo: 'Reise zuordnen',
        label:{
          chofer:  'Fahrer: ',
          datos:   'Reiseinformationen',
          origen:  'Herkunft: ',
          destino: 'Ziel: ',
          fecha:   'Datum:',
          hora:    'Zeit:'
        },
        button:{
          b_1: 'Zuweisen',
          b_2: 'Zuweisung aufheben'
        }
      }

    }
}
