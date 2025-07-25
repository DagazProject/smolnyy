import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class dict_type {
  @PrimaryColumn()
  id: number;

  @Column({ type: "varchar", length: 100 })
  name: string;  
}
