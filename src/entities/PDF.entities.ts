import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class PDF {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    pdfName: string

    @Column()
    pdfSize: string

    @Column()
    pdfPath: string

    @Column()
    pdfLink: string
    
    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}