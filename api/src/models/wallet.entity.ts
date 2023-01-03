import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { WalletTag } from './wallet-tag.entity';

@Entity({name: "wallets"})
export class Wallet {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => WalletTag, walletTag => walletTag.walletIds)
    @JoinColumn({name: "wallet_tag_id"})
    walletTagId: string;

    @Column({type: 'varchar', length: 50, nullable: false})
    name: string;

    @Column({type: 'text', nullable: false})
    description: string;

    @Column({type: 'datetime', default: () => 'NOW()', name: 'create_at'})
    createAt: Date;

    @Column({type: 'datetime', nullable: true, name: 'modify_at'})
    modifyAt: Date;
}