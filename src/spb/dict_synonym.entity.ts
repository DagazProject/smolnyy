import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { dict } from './dict.entity';

@Entity()
export class dict_synonym {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  dict_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "dict_id" })
  dict: dict;

  @Column({ type: "varchar", length: 100 })
  value: string;  
}