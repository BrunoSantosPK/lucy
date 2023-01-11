import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from "typeorm";
import { Tag } from "./tag.entity";
import { Transaction } from "./transaction.entity";
import { Budget } from "./budget.entity";

@Entity({name: "budget_tags"})
export class BudgetTag {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Budget, budget => budget.budgetTagIds)
    @JoinColumn({name: "transaction_id"})
    budgetId: string;

    @ManyToOne(() => Tag, tag => tag.budgetTagIds)
    @JoinColumn({name: "tag_id"})
    tagId: string;

    @Column({type: "float", nullable: false, name: "min_value"})
    minValue: number;

    @Column({type: "float", name: "max_value"})
    maxValue: number;
}