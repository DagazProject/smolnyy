import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class setting_type {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}