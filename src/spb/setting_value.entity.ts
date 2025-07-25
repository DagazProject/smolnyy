import { Entity, Column, PrimaryGeneratedColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { setting_type } from './setting_type.entity';
import { scenario } from './scenario.entity';
import { scenario_step } from './scenario_step.entity';
import { event_rule } from './event_rule.entity';

@Entity()
export class setting_value {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => setting_type)
  @JoinColumn({ name: "type_id" })
  type: setting_type;

  @Index()
  @Column({ nullable: true })
  scenario_id: number;
  @ManyToOne(type => scenario)
  @JoinColumn({ name: "scenario_id" })
  scenario: scenario;

  @Index()
  @Column({ nullable: true })
  step_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "step_id" })
  step: scenario_step;

  @Index()
  @Column({ nullable: true })
  rule_id: number;
  @ManyToOne(type => event_rule)
  @JoinColumn({ name: "rule_id" })
  rule: event_rule;

  @Index()
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(type => setting_value)
  @JoinColumn({ name: "parent_id" })
  parent: setting_value;

  @Column({ type: "text" })
  value: string;  
}