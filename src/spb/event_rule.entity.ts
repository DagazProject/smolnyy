import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { scenario_step } from './scenario_step.entity';
import { event_type } from './event_type.entity';

@Entity()
export class event_rule {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  eventtype_id: number;
  @ManyToOne(type => event_type)
  @JoinColumn({ name: "eventtype_id" })
  eventtype: event_type;

  @Index()
  @Column({ nullable: false })
  currstep_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "currstep_id" })
  currstep: scenario_step;
  
  @Index()
  @Column({ nullable: false })
  nextstep_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "nextstep_id" })
  nextstep: scenario_step;
}
