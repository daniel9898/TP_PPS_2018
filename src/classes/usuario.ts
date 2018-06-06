//CLASE

export class Usuario{

    id_usuario:string;
    correo:string;
    nombre:string;
    edad:number;
    direccion:string;
    perfil:string;
    foto:string;
    viajando:boolean;
    activo:boolean;

    constructor(user_data:Usuario){
        //REGISTRO
        this.id_usuario = user_data.id_usuario;
        this.correo = user_data.correo;
        this.perfil = user_data.perfil;
        this.viajando = false;
        this.activo = true;
        //PERFIL
        this.nombre = user_data.nombre;
        this.edad = user_data.edad;
        this.direccion = user_data.direccion;
        this.foto = user_data.foto;
    }

}
