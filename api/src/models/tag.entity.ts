import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'datetime', default: () => 'NOW()', name: 'create_at'})
    createAt: Date;
}