import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({name: "tags"})
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    name: string;

    @Column({type: 'datetime', default: () => 'NOW()', name: 'create_at'})
    createAt: Date;

    @Column({type: "boolean", default: false})
    systemTag: boolean;
}