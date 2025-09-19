import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class command {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}