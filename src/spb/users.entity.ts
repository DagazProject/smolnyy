import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", length: 200 })
    name: string;

    @Index()
    @Column({ type: "varchar", length: 200, unique: true })
    login: string;

    @Column({ type: "varchar", length: 200 })
    pass: string;

    @Column({default: () => "now()"})
    created: Date;

    @Column({ nullable: true })
    deleted: Date;

    @Column({default: () => "now()"})
    last_actived: Date;
}