import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { dict_type } from './dict_type.entity';
import { param_kind } from './param_kind.entity';

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

  @Index()
  @Column({ nullable: false })
  kind_id: number;
  @ManyToOne(type => param_kind)
  @JoinColumn({ name: "kind_id" })
  kind: param_kind;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}