import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class scenario_type {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ nullable: false, type: "varchar", length: 1 })
  abbr: string;  
}
