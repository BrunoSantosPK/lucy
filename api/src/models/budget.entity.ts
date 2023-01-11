import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToMany } from "typeorm";
import { BudgetTag } from "./budget-tag.entity";

@Entity({name: "budgets"})
export class Budget {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({type: "date", nullable: false, name: "start_date"})
    startDate: Date;

    @Column({type: "date", nullable: false, name: "end_date"})
    endDate: Date;

    @Column({type: "varchar", length: 50, nullable: false})
    name: string;

    @Column({type: "text", nullable: true})
    description: string;

    @Column({type: "datetime", default: () => "NOW()", name: "create_at"})
    createAt: Date;

    @Column({type: "datetime", nullable: true, name: "modify_at"})
    modifyAt: Date;

    @OneToMany(() => BudgetTag, budgetTag => budgetTag.id)
    budgetTagIds: BudgetTag[]
}