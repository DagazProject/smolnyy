import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { dict_type } from './dict_type.entity';

@Entity()
export class param_type {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  dicttype_id: number;
  @ManyToOne(type => dict_type)
  @JoinColumn({ name: "dicttype_id" })
  dicttype: dict_type;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}