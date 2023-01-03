import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Wallet } from './wallet.entity';

@Entity({name: "wallet_tags"})
export class WalletTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: 'varchar', length: 20, nullable: false})
    name: string;

    @OneToMany(() => Wallet, wallet => wallet.id)
    walletIds: Wallet[];
}