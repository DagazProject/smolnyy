import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { users } from "./users.entity";

@Entity()
export class tokens {
    @PrimaryGeneratedColumn()
    id: number;

    @Index()
    @Column({ nullable: false })
    user_id: number;
    @ManyToOne(type => users)
    @JoinColumn({ name: "user_id" })
    user: users;

    @Index()
    @Column({ type: "text" })
    value_str: string;

    @Column({default: () => "now()"})
    created: Date;

    @Column({default: () => "now()", nullable: false })
    expired: Date;
}