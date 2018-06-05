import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'page-cliente-perfil',
  templateUrl: 'cliente-perfil.html',
})
export class ClientePerfilPage {

  itemsRef: AngularFireList<any>;
  items: Observable<any[]>;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              db: AngularFireDatabase) {

    this.itemsRef = db.list('usuarios');
    //this.items = db.list('/usuarios').valueChanges();
    // Use snapshotChanges().map() to store the key
    this.items = this.itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClientePerfilPage');
  }

}
