import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'datetime', default: () => 'NOW()', name: 'create_at'})
    createAt: Date;

    @Column({type: 'datetime', nullable: true, name: 'modify_at'})
    modifyAt: Date;
}