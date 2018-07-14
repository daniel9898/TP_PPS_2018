//IDIOMA FRANCÉS
export const Idioma_fr = {
    fr:{
      //DATA GENERAL
      code: "fr",
      name: "Français",
      moneda_simbolo: "€",
      unidad_medida: "Km",
      //PAGINAS COMUNES*******************************************************//
      pag_menu:{
        titulo: "Menu",
        label: "Utilisateur:",
        opcion:{
          1:  "Accueil",
          2:  "Profil",
          3:  "Demander un voyage",
          4:  "Mes réservations",
          5:  "Mon histoire",
          6:  "Statistiques",
          7:  "Enquêtes en attente",
          8:  "Gains",
          9:  "Liste d'utilisateurs",
          10: "Liste des véhicules",
          11: "Voyage / Réservations"
        }
      },
      pag_login:{
          titulo: "KB REMISERIA",
          placeholder:{
            user: 'Utilisateur',
            pass: 'Password'
          },
          error:{
            required: 'Champ obligatoire ↑',
            email:    'Format incorrect ↑',
          },
          button:{
            login:      "Entrer",
            registro_1: "Vous n'avez pas de compte?",
            registro_2: "Inscrivez-vous gratuitement!"
          },
          mensaje:{
            msj_1:"Nom d'utilisateur et / ou mot de passe incorrect",
            msj_2:"Compte inexistant",
            msj_3:"Compte désactivé",
            msj_4:"Bienvenue"
          }
      },
      pag_registro:{
          placeholder:{
            user:  "Mail",
            pass1: "Password",
            pass2: "Répéter le mot de passe"
          },
          error:{
            required: "Champ obligatoire",
            email:    "Format incorrect",
            pass_1:   "Le mot de passe doit comporter au moins 6 caractères",
            pass_2:   "La clé n'est pas identique à celle entrée"
          },
          button:  "S'enregistrer",
          mensaje:{
            msj_1: "Compte non disponible",
            msj_2: "Mail invalide"
          }
      },
      pag_perfil:{
          label:{
            correo:     "Mail",
            nombre:     "nom",
            edad:       "Âge",
            direccion:  "adresse",
            perfil:     "Profil",
            viajando:   "Voyager",
            activo:     "Actif",
            verificado: "Vérifié"
          },
          error:{
            required: "Champ obligatoire",
            email:    "Format incorrect",
            nombre_1: "Minimum: 5 caractères",
            nombre_2: "Maximum: 30 caractères",
            edad_1:   "Age minimum: 14",
            edad_2:   "Âge maximum: 100"
          },
          mensaje:{
            msj_1:    "Mot de passe modifié",
            msj_2:    "Mot de passe invalide",
            msj_3:    "Utilisateur supprimé",
            msj_4:    "Mail non disponible",
            msj_5:    "Mail invalide",
            msj_6:    "Modifications apportées avec succès",
            msj_7:    "Utilisateur créé"
          }
      },
      pag_clave:{
          placeholder:{
            pass1:  "Password",
            pass2:  "nouveau mot de passe",
            pass3:  "Répéter le mot de passe"
          },
          error:{
            required: "Champ obligatoire",
            pass_1:   "Minimum 6 caractères",
            pass_2:   "Clé non identique"
          },
          button: "Accepter"
      },
      pag_mapa:{
          label: "adresse"
      },
      pag_qr:{
        msj:         "Centrez le code sur le rectangle",
        inaccesible: "Accès non disponible",
        desconocido: "Code inconnu",
        navegador:   "ALERTE: ceci est un test du navigateur"
      },
      pag_lista_general:{
        placeholder: "trouver"
      },
      //PAGINAS CLIENTE*******************************************************//
      pag_viaje_cliente:{
        label:{
          origen:        "Origine",
          destino:       "Destination",
          distancia:     "Distance",
          precio:        "Prix",
          hora:          "Heure",
          button_ok:     "Prêt",
          button_cancel: "Annuler"
        },
        msj_final:{
          titulo:    "FIN DE LA ROUTE",
          subtitulo: "Merci de nous avoir choisi!",
          texto_1:   "Es-tu heureux?",
          texto_2:   "Entrez l'enquête et donnez votre opinion"
        },
        chofer:{
          titulo:  "CHOFER'S DONNÉES",
          nombre:  "Nom:",
          patente: "Brevet:"
        },
        estados:{
          titulo:            "ÉTAT",
          pendiente:         "Vous cherchez un chauffeur",
          tomado:            "Pilote assigné - attendre l'arrivée",
          en_curso:          "Voyage commencé",
          cumplido:          "Voyage terminé",
          cancelado_cliente: "Voyage annulé",
          cancelado_sistema: "Voyage annulé par le système"
        }
      },
      pag_reserva_cliente:{
        label:{
          origen:    "Adresse d'origine",
          fecha:     "Date",
          hora:      "Heure",
          destino:   "Adresse de destination",
        },
        mensaje: "Réservation générée",
        button:{
          b_1: "Sauvegarder",
          b_2: "Prêt",
          b_3: "Annuler"
        }
      },
      pag_reservas_cliente:{
        titulo: "Réservations",
        mensaje: "Réserve supprimée"
      },
      pag_encuesta_cliente:{
        perfil: "Client",
        titulo: "Enquête de satisfaction",
        mensaje: "Merci de votre participation!",
        preguntas:{
          //SELECT
          p_1: {
              p:"Comment évalueriez-vous le service?",
              op:{
                1:"Excellent",
                2:"Efficace",
                3:"Régulier",
                4:"Pauvre",
                5:"Néfaste"
              }
          },
          //RANGE
          p_2: {
              p:"Comment a été l'attention du conducteur?",
              op:{
                1:"Très méchante",
                2:"Mauvais",
                3:"Régulier",
                4:"Bien",
                5:"Très bien"
              }
          },
          //RADIO
          p_3: {
              p:"Le véhicule était en état?",
              op:{
                1:"Oui",
                2:"Non",
                3:"Je ne sais pas"
              }
          },
          //CHECKBOX
          p_4: {
            p:"L'itinéraire balisé a-t-il été respecté?",
          },
          //INPUT
          p_5: {
            p:"Commentaires"
          }
        }
      },
      pag_encuestas_cliente:{
        titulo: "VOYAGE",
        subtitulo: "-pas d'enquête-"
      },
      pag_historial_cliente:{
        viajes:    "Voyages",
        reservas:  "Réservations",
        encuestas: "Enquêtes"
      },
      pag_estadistica_cliente:{
        subtitulo_1: "Individuel",
        subtitulo_2: "Général",
        tema:        "Qualité de service",
        valores:{
          1:"Excellent",
          2:"Efficace",
          3:"Régulier",
          4:"Pauvre",
          5:"Néfaste"
        }
      },
      //PAGINAS CHOFER********************************************************//
      pag_inicio_chofer:{
        mensaje:{
          msj_1: "Avoir un voyage assigné",
          msj_2: "Attention: véhicule non disponible ou code incorrect",
          msj_3: "Attention: ",
          msj_4: "Véhicule correctement affecté"
        }
      },
      pag_lista_viajes_chofer:{
        titulo:  "Voyages en attente",
        label:{
          fecha: "Date:",
          hora:  "Heure",
          desde: "De:",
          hasta: "Up:"
        },
        mensaje:{
          msj_1: "Avoir un voyage assigné",
          msj_2: "Attention: "
        }
      },
      pag_viaje_chofer:{
        titulo: "Information de voyage",
        label:{
          direccion: "Rechercher une adresse",
          destino:   "Destination",
          hora:      "Heure",
          precio:    "Prix"
        },
        button:{
          b_1: "Annuler",
          b_2: "En cours",
          b_3: "Terminé"
        },
        mensaje:{
          msj_1: "Voyage en statut: en cours",
          msj_2: "Voyage désaffecté",
          msj_3: "Attention: "
        },
      },
      pag_modal_viaje_chofer:{
        titulo:"Détail du voyage",
        button:"Fermer",
        label:{
          monto:     "Montant à payer:",
          distancia: "Distance parcourue:"
        }
      },
      pag_encuesta_chofer:{
        titulo: "Contrôle d'unité affecté",
        patente: "Brevet",
        mensaje: "Enquête enregistrée",
        preguntas:{
          //SELECT
          p_1: {
              p:"Comment évaluez-vous l'état général?",
              op:{
                1:"Excellent",
                2:"Efficace",
                3:"Régulier",
                4:"Pauvre",
                5:"Néfaste"
              }
          },
          //RANGE
          p_2: {
              p:"État de nettoyage?",
              op:{
                1:"Très méchante",
                2:"Mauvais",
                3:"Régulier",
                4:"Bien",
                5:"Très bien"
              }
          },
          //RADIO
          p_3: {
              p:"A-t-il des rayures / chocs?",
              op:{
                1:"Oui",
                2:"Non",
                3:"Je ne sais pas"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Est-ce que ça commence sans problèmes?"
          },
          //INPUT
          p_5: {
            p:"Commentaires"
          }
        }
      },
      pag_estadistica_chofer:{
        titulo: "Réputation",
        viajes: "Voyages effectués: ",
        valores:{
          1:"Excellent",
          2:"Efficace",
          3:"Régulier",
          4:"Pauvre",
          5:"Néfaste"
        }
      },
      //PAGINAS SUPERVISOR****************************************************//
      pag_inicio_supervisor:{
        temas:{
          choferes: "Pilotes disponibles",
          viajes:   "Voyage selon les états"
        },
        valores_viaje:{
          1:"en attente",
          2:"annulé",
          3:"en cours",
          4:"terminé"
        },
        valores_chofer:{
          1:"Disponible",
          2:"Pas disponible"
        },
        mensaje:{
          msj_1:  "Il n'y a pas de pilotes disponibles pour ce véhicule",
          msj_2:  "Code invalide"
        }
      },
      pag_lista_viajes_supervisor:{
        titulo: "Voyages en attente",
        label:  "Destination: "
      },
      pag_lista_reservas_supervisor:{
        titulo: "Liste des réservations",
        label:  "Destination: "
      },
      pag_lista_usuarios_supervisor:{
        mensaje:{
          msj_1: "Utilisateur supprimé",
          msj_2: "Erreur lors de l'exécution de l'action: "
        }
      },
      pag_lista_vehiculos_supervisor:{
        mensaje: "Véhicule enlevé"
      },
      pag_registro_usuario:{
        cliente: "Client",
        chofer:  "Pilote"
      },
      pag_registro_chofer_supervisor:{
        label:{
          nombre:    "Nom",
          apellido:  "Le nom",
          edad:      "Âge",
          direccion: "Adresse",
          correo:    "Courrier électronique",
          password:  "Password"
        },
        mensaje:{
          msj_1:"Enregistrement réussi",
          msj_2:"Erreur: "
        },
        button: "sauvegarder"
      },
      pag_registro_vehiculo_supervisor:{
        button:{
          b_1: "Sauvegarder",
          b_2: "Modifier"
        },
        mensaje: "Véhicule ajouté",
        label:{
          marca:   "Marque",
          modelo:  "Modèle",
          ano:     "Année",
          patente: "Brevet",
          activo:  "Actif"
        },
        placeholder:{
          1: "ABC123",
          2: "AB123CD"
        },
        error:{
          marca:     "Minimum 3 caractères",
          patente_1: "N'ajoutez pas d'espaces",
          patente_2: "Format correct [ ABC123 ]",
          patente_3: "Format correct [ AB123CD ]"
        }
      },
      pag_photoTaker_supervisor:{
        button:{
          b_1: "Sauvegarder",
          b_2: "Télécharger"
        },
        mensaje:{
          msj_1: "Photo téléchargée",
          msj_2: "Photo supprimée"
        }
      },
      pag_choferes_disponibles_supervisor:{
        titulo: "Pilotes disponibles"
      },
      pag_asignar_viaje_supervisor:{
        titulo: "Affecter un voyage",
        label:{
          chofer:  "Pilote: ",
          datos:   "Information de voyage",
          origen:  "Origine: ",
          destino: "Destination: ",
          fecha:   "Date:",
          hora:    "Heure:"
        },
        button:{
          b_1: "Attribuer",
          b_2: "Annuler l'attribution"
        }
      }

    }
}
