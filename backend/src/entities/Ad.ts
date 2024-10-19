import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./Category";
import { Tag } from "./Tag";
import { IsPositive, MinLength } from "class-validator";

@Entity()
export class Ad extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    @MinLength(2)
    title!: string

    @Column()
    description!: string

    @Column()
    @IsPositive()
    price!: number

    @Column({
        nullable: true
    })
    picture!: string

    @Column()
    location!: string

    @CreateDateColumn()
    created_at!: Date

    @ManyToOne(() => Category, category => category.ads)
    @JoinTable()
    category!: Category

    @ManyToMany(() => Tag)
    @JoinTable()
    tags!: Tag[]
}