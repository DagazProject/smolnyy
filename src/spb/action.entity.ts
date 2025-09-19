import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { event_rule } from './event_rule.entity';
import { action_type } from './action_type.entity';
import { dict } from './dict.entity';

@Entity()
export class action {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  rule_id: number;
  @ManyToOne(type => event_rule)
  @JoinColumn({ name: "rule_id" })
  rule: event_rule;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => action_type)
  @JoinColumn({ name: "type_id" })
  type: action_type;

  @Index()
  @Column({ nullable: true })
  dict_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "dict_id" })
  dict: dict;

  @Column({ type: "varchar", length: 300 })
  code_method: string;  

  @Column({ type: "integer" })
  order_num: number;
}