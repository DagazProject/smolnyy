import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { dict_type } from './dict_type.entity';

@Entity()
export class dict {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => dict_type)
  @JoinColumn({ name: "type_id" })
  type: dict_type;

  @Index()
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "parent_id" })
  parent: dict;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  

  @Column({ type: "integer", nullable: false, default: 1 })
  priority: number;
}