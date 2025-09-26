import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class param_kind {
    @PrimaryColumn()
    id: number;

    @Column({ type: "varchar", length: 200 })
    name: string;
}