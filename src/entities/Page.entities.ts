import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { SubPage } from "./Subpage.entities"

@Entity()
export class Page {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pageName: string

    @Column()
    pageContent: string

    @Column()
    subpagesEnabled: boolean;

    @OneToMany(() => SubPage, (subpage) => subpage.page,  {nullable: true}) 
    subPages: SubPage[]

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}