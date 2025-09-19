import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { step_type } from './step_type.entity';
import { scenario } from './scenario.entity';
import { audio } from './audio.entity';
import { param_type } from './param_type.entity';
import { dict } from './dict.entity';

@Entity()
export class scenario_step {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  scenario_id: number;
  @ManyToOne(type => scenario)
  @JoinColumn({ name: "scenario_id" })
  scenario: scenario;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => step_type)
  @JoinColumn({ name: "type_id" })
  type: step_type;

  @Index()
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "parent_id" })
  parent: scenario_step;

  @Index()
  @Column({ nullable: true })
  nextstep_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "nextstep_id" })
  nextstep: scenario_step;

  @Index()
  @Column({ nullable: true })
  audio_id: number;
  @ManyToOne(type => audio)
  @JoinColumn({ name: "audio_id" })
  audio: audio;

  @Index()
  @Column({ nullable: true })
  paramtype_id: number;
  @ManyToOne(type => param_type)
  @JoinColumn({ name: "paramtype_id" })
  paramtype: param_type;

  @Index()
  @Column({ nullable: true })
  dict_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "dict_id" })
  dict: dict;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "integer", nullable: true })
  value: number;

  @Column({ type: "integer", nullable: false })
  order_num: number;
}