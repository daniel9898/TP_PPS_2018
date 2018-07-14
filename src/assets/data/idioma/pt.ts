//IDIOMA PORTUGUÉS
export const Idioma_pt = {
    pt:{
      //DATA GENERAL
      code: "pt",
      name: "Português",
      moneda_simbolo: "R$",
      unidad_medida: "Km",
      //PAGINAS COMUNES*******************************************************//
      pag_menu:{
        titulo: "Cardápio",
        label: "Usuário:",
        opcion:{
          1:  "Home",
          2:  "Perfil",
          3:  "Peça uma viagem",
          4:  "Minhas reservas",
          5:  "Minha história",
          6:  "Estatísticas",
          7:  "Pesquisas pendentes",
          8:  "Ganhos",
          9:  "Lista de usuários",
          10: "Lista de veículos",
          11: "Viagem / Reservas"
        }
      },
      pag_login:{
          titulo: "KB REMISERIA",
          placeholder:{
            user: "Usuário",
            pass: "Senha"
          },
          error:{
            required: "Campo obrigatório ↑",
            email:    "Formato incorreto ↑",
          },
          button:{
            login:      "Entrar",
            registro_1: "Não tem uma conta?",
            registro_2: "Inscreva-se gratuitamente!"
          },
          mensaje:{
            msj_1:"Nome de usuário e / ou senha incorretos",
            msj_2:"Conta inexistente",
            msj_3:"Conta desativada",
            msj_4:"Bem vindo"
          }
      },
      pag_registro:{
          placeholder:{
            user:  "Mail",
            pass1: "Senha",
            pass2: "repetir a senha"
          },
          error:{
            required: "Campo obrigatório",
            email:    "Formato incorreto",
            pass_1:   "A senha deve ter pelo menos 6 caracteres",
            pass_2:   "A chave não é idêntica à entrada"
          },
          button:  "Cadastre-se",
          mensaje:{
            msj_1: "Conta não disponível",
            msj_2: "Correio inválido"
          }
      },
      pag_perfil:{
          label:{
            correo:     "Mail",
            nombre:     "Nome",
            edad:       "Idade",
            direccion:  "Endereço",
            perfil:     "Perfil",
            viajando:   "Viajando",
            activo:     "Ativo",
            verificado: "Verificado"
          },
          error:{
            required: "Campo obrigatório",
            email:    "Formato incorreto",
            nombre_1: "Mínimo: 5 caracteres",
            nombre_2: "Máximo: 30 caracteres",
            edad_1:   "Idade mínima: 14",
            edad_2:   "Idade máxima: 100"
          },
          mensaje:{
            msj_1:    "Senha alterada",
            msj_2:    "Senha inválida",
            msj_3:    "Usuário excluído",
            msj_4:    "Mail não disponível",
            msj_5:    "Correio inválido",
            msj_6:    "Mudanças feitas com sucesso",
            msj_7:    "Usuário criado"
          }
      },
      pag_clave:{
          placeholder:{
            pass1:  "Senha",
            pass2:  "Nova senha",
            pass3:  "Repetir a senha"
          },
          error:{
            required: "Campo obrigatório",
            pass_1:   "Mínimo 6 caracteres",
            pass_2:   "Chave não idêntica"
          },
          button: "Aceitar"
      },
      pag_mapa:{
          label: "Endereço"
      },
      pag_qr:{
        msj:         "Centralize o código no retângulo",
        inaccesible: "Acesso não disponível",
        desconocido: "Código desconhecido",
        navegador:   "ALERTA: este é um teste do navegador"
      },
      pag_lista_general:{
        placeholder: "achar"
      },
      //PAGINAS CLIENTE*******************************************************//
      pag_viaje_cliente:{
        label:{
          origen:        "Origem",
          destino:       "Destino",
          distancia:     "Distância",
          precio:        "Preço",
          hora:          "Hora",
          button_ok:     "Pronto",
          button_cancel: "Cancelar"
        },
        msj_final:{
          titulo:    "FIM DA ROTA",
          subtitulo: "Obrigado por nos escolher!",
          texto_1:   "Você está feliz com o serviço prestado?",
          texto_2:   "Digite a pesquisa e dê sua opinião"
        },
        chofer:{
          titulo:  "DADOS DO MOTORISTA",
          nombre:  "Nome:",
          patente: "Patente:"
        },
        estados:{
          titulo:            "ESTADO",
          pendiente:         "Procurando por um motorista",
          tomado:            "Motorista designado - aguarda a chegada",
          en_curso:          "Viagem iniciada",
          cumplido:          "Viagem concluída",
          cancelado_cliente: "Viagem cancelada",
          cancelado_sistema: "Viagem cancelada pelo sistema"
        }
      },
      pag_reserva_cliente:{
        label:{
          origen:    "Endereço origen",
          fecha:     "Data",
          hora:      "Hora",
          destino:   "Endereço destino",
        },
        mensaje: "Reserva gerada",
        button:{
          b_1: "Salvar",
          b_2: "Pronto",
          b_3: "Cancelar"
        }
      },
      pag_reservas_cliente:{
        titulo: "Reservas",
        mensaje: "Reservar excluído"
      },
      pag_encuesta_cliente:{
        perfil: "Cliente",
        titulo: "Pesquisa de satisfação",
        mensaje: "Obrigado por participar!",
        preguntas:{
          //SELECT
          p_1: {
              p:"Como você classificaria o serviço?",
              op:{
                1:"Excelente",
                2:"Eficiente",
                3:"Regular",
                4:"Pobre",
                5:"Nefasto"
              }
          },
          //RANGE
          p_2: {
              p:"Como foi a atenção do motorista?",
              op:{
                1:"Muito má",
                2:"Ruim",
                3:"Regular",
                4:"Bom",
                5:"Muito bem"
              }
          },
          //RADIO
          p_3: {
              p:"O veículo estava em condição?",
              op:{
                1:"Sim",
                2:"Não",
                3:"Não sei"
              }
          },
          //CHECKBOX
          p_4: {
            p:"A rota marcada foi respeitada?",
          },
          //INPUT
          p_5: {
            p:"Comentários"
          }
        }
      },
      pag_encuestas_cliente:{
        titulo: "VIAGEM",
        subtitulo: "-sem pesquisa-"
      },
      pag_historial_cliente:{
        viajes:    "Viagem",
        reservas:  "Reservas",
        encuestas: "Pesquisas"
      },
      pag_estadistica_cliente:{
        subtitulo_1: "Individual",
        subtitulo_2: "Geral",
        tema:        "Qualidade de serviço",
        valores:{
          1:"Excelente",
          2:"Bom",
          3:"Regular",
          4:"Pobre",
          5:"Nefasto"
        }
      },
      //PAGINAS CHOFER********************************************************//
      pag_inicio_chofer:{
        mensaje:{
          msj_1: "Ter uma viagem atribuída",
          msj_2: "Atenção: veículo não disponível ou código incorreto",
          msj_3: "Atenção: ",
          msj_4: "Veículo atribuído corretamente"
        }
      },
      pag_lista_viajes_chofer:{
        titulo:  "Viagens pendentes",
        label:{
          fecha: "Data:",
          hora:  "Hora",
          desde: "Daqui:",
          hasta: "Até:"
        },
        mensaje:{
          msj_1: "Ter uma viagem atribuída",
          msj_2: "Atenção: "
        }
      },
      pag_viaje_chofer:{
        titulo: "Informações de viagem",
        label:{
          direccion: "Endereço de pesquisa",
          destino:   "Destino",
          hora:      "Hora",
          precio:    "Preço"
        },
        button:{
          b_1: "Cancelar",
          b_2: "Em progresso",
          b_3: "Concluído"
        },
        mensaje:{
          msj_1: "Viajar em estado: em progresso",
          msj_2: "Viagem desassociada",
          msj_3: "Atenção: "
        },
      },
      pag_modal_viaje_chofer:{
        titulo:"Detalhe da viagem",
        button:"Fechar",
        label:{
          monto:     "Quantia a pagar:",
          distancia: "Distância percorrida:"
        }
      },
      pag_encuesta_chofer:{
        titulo: "Controle de Unidade Atribuído",
        patente: "Patente",
        mensaje: "Pesquisa registrada",
        preguntas:{
          //SELECT
          p_1: {
              p:"Como você classificaria o estado geral?",
              op:{
                1:"Excelente",
                2:"Bueno",
                3:"Regular",
                4:"Pobre",
                5:"Nefasto"
              }
          },
          //RANGE
          p_2: {
              p:"Estado de limpeza?",
              op:{
                1:"Muy malo",
                2:"Malo",
                3:"Regular",
                4:"Bom",
                5:"Muito bem"
              }
          },
          //RADIO
          p_3: {
              p:"Tem arranhões / choques?",
              op:{
                1:"Sim",
                2:"Não",
                3:"Não sei"
              }
          },
          //CHECKBOX
          p_4: {
            p:"Começa sem problemas?"
          },
          //INPUT
          p_5: {
            p:"Comentários"
          }
        }
      },
      pag_estadistica_chofer:{
        titulo: "Reputação",
        viajes: "Viagens feitas: ",
        valores:{
          1:"Excelente",
          2:"Bom",
          3:"Regular",
          4:"Pobre",
          5:"Nefasto"
        }
      },
      //PAGINAS SUPERVISOR****************************************************//
      pag_inicio_supervisor:{
        temas:{
          choferes: "Drivers disponíveis",
          viajes:   "Viajar de acordo com estados"
        },
        valores_viaje:{
          1:"pendente",
          2:"cancelado",
          3:"no curso",
          4:"cumprido"
        },
        valores_chofer:{
          1:"Disponível",
          2:"Não disponível"
        },
        mensaje:{
          msj_1:  "Não há drivers disponíveis para este veículo",
          msj_2:  "Código inválido"
        }
      },
      pag_lista_viajes_supervisor:{
        titulo: "Viagens pendentes",
        label:  "Destino: "
      },
      pag_lista_reservas_supervisor:{
        titulo: "Lista de reservas",
        label:  "Destino: "
      },
      pag_lista_usuarios_supervisor:{
        mensaje:{
          msj_1: "Usuário excluído",
          msj_2: "Erro ao executar a ação:"
        }
      },
      pag_lista_vehiculos_supervisor:{
        mensaje: "Veículo removido"
      },
      pag_registro_usuario:{
        cliente: "Cliente",
        chofer:  "Driver"
      },
      pag_registro_chofer_supervisor:{
        label:{
          nombre:    "Nome",
          apellido:  "Apelido",
          edad:      "Idade",
          direccion: "Endereço",
          correo:    "Correio eletrônico",
          password:  "Senha"
        },
        mensaje:{
          msj_1:"Registro bem sucedido",
          msj_2:"Erro: "
        },
        button: "Salvar"
      },
      pag_registro_vehiculo_supervisor:{
        button:{
          b_1: "Salvar",
          b_2: "Editar"
        },
        mensaje: "Veículo adicionado",
        label:{
          marca:   "Marca",
          modelo:  "Modelo",
          ano:     "Ano",
          patente: "Patente",
          activo:  "Ativo"
        },
        placeholder:{
          1: "ABC123",
          2: "AB123CD"
        },
        error:{
          marca:     "Mínimo 3 caracteres",
          patente_1: "Não adicione espaços",
          patente_2: "Formato correto [ ABC123 ]",
          patente_3: "Formato correto [ AB123CD ]"
        }
      },
      pag_photoTaker_supervisor:{
        button:{
          b_1: "Salvar",
          b_2: "Suba"
        },
        mensaje:{
          msj_1: "Foto enviada",
          msj_2: "Foto excluída"
        }
      },
      pag_choferes_disponibles_supervisor:{
        titulo: "Motoristas disponível"
      },
      pag_asignar_viaje_supervisor:{
        titulo: "Atribuir viagens",
        label:{
          chofer:  "Motorista: ",
          datos:   "Informações de viagem",
          origen:  "Origem: ",
          destino: "Destino: ",
          fecha:   "Data:",
          hora:    "Hora:"
        },
        button:{
          b_1: "Atribuir",
          b_2: "Cancelar atribuição"
        }
      }

    }
}
