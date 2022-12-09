import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm"
import { Page } from "./Page.entities"

@Entity()
export class SubPage {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    subPageName: string

    @Column()
    subPageContent: string

    @ManyToOne(() => Page, (page) => page.subPages) 
    page: Page

    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;

}