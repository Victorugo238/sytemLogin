import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity('Formulario')
export class Formulario {
    @PrimaryGeneratedColumn()
    id?: number
    @Column({type: 'text'})
    name?:string

    @Column({})
    email?:string

     @Column()
    password!:string
}