import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx';
import { UsuarioServicioProvider } from '../usuario-servicio/usuario-servicio';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
/*
  Generated class for the ThemeSettingsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ThemeSettingsProvider {
    private usuario: any;
    private user: firebase.User;
    private theme: BehaviorSubject<String>;


    constructor(
        public afAuth: AngularFireAuth,
        public usuarioSrv: UsuarioServicioProvider) {
        this.theme = new BehaviorSubject('argentina-theme');
        this.afAuth.user.subscribe(user => {
            if (user) {
                this.user = user;
                this.usuarioSrv.traerUsuario(this.user.uid).then((value: any) => {
                    this.usuario = value;
                    if (value.tema) {
                        this.theme.next(value.tema);
                    }
                });
            }
        }, error => console.log(error));
    }

    setActiveTheme(val) {
        this.usuario.tema = val;
        this.usuarioSrv.modificar_usuario(this.usuario);
        this.theme.next(val);
    }

    getActiveTheme() {
        return this.theme.asObservable();
    }

}
