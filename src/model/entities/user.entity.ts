import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 11 })
    mobile: string;

    @Column()
    password: string;

    @Column({ type: 'enum', enum: ['admin', 'user'], default: 'user' })
    role: string;

    @Column({ type: "tinyint", default: 1 })
    status: number;

    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;

    @UpdateDateColumn({ type: "timestamp", default: null })
    updated_at: Date;
}