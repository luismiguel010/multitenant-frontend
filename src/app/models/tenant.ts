export class Tenant {
    id: string;
    nombre: string;
    apellido: string;
    correo: string;
    nombreDispositivoIOT: string
    color: string

    constructor(id: string, nombre: string, apellido: string, correo: string, nombreDispositivoIOT: string, color: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.nombreDispositivoIOT = nombreDispositivoIOT;
        this.color = color;
    }
}