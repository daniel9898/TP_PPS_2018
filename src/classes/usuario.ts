//CLASE

export class Usuario{

    key?:string;
    id_usuario:string;
    correo:string;
    nombre:string;
    edad:number;
    direccion:string;
    perfil:string;
    foto:string;
    viajando:boolean;
    activo:boolean;
    verificado:boolean;

    constructor(user_data:any){
        //REGISTRO
        this.key = user_data.key;
        this.id_usuario = user_data.id_usuario;
        this.correo = user_data.correo;
        this.perfil = user_data.perfil;
        this.viajando = user_data.viajando;
        this.activo = user_data.activo;
        this.verificado = user_data.verificado;
        //PERFIL
        this.nombre = user_data.nombre;
        this.edad = user_data.edad;
        this.direccion = user_data.direccion;
        this.foto = user_data.foto;
    }

}
