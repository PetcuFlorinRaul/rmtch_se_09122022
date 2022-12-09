import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm"

@Entity()
export class Image {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    imageName: string

    @Column()
    imageSize: string

    @Column()
    imagePath: string

    @Column()
    imageLink: string
    
    @CreateDateColumn()
    public created_at: Date;

    @UpdateDateColumn()
    public updated_at: Date;
}