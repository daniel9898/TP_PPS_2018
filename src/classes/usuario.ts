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
        this.id_usuario = user_data.id_usuario;
        this.correo = user_data.correo;
        //this.nombre = user_data.nombre;
        //this.edad = user_data.edad;
        //this.direccion = user_data.direccion;
        this.perfil = user_data.perfil;
        this.foto = user_data.foto;
        this.viajando = false;
        this.activo = true;
    }

    // public static traer_todo_usuarios(){
    // }
    //
    // public static traer_un_usuario(correo:string){
    //
    // }
    //
    // public static agregar_usuario(){
    //
    // }
    //
    // public static modificar_usuario(){
    //
    // }
    //
    // public static borrar_usuario(){
    //
    // }

}
