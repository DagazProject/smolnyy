import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class audio {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 500, nullable: false })
  name: string;  
}