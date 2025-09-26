import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { param_type } from './param_type.entity';
import { session } from './session.entity';
import { scenario_step } from './scenario_step.entity';

@Entity()
export class session_param {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  session_id: number;
  @ManyToOne(type => session)
  @JoinColumn({ name: "session_id" })
  session: session;

  @Index()
  @Column({ nullable: true })
  step_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "step_id" })
  step: scenario_step;
  
  @Index()
  @Column({ nullable: false })
  paramtype_id: number;
  @ManyToOne(type => param_type)
  @JoinColumn({ name: "paramtype_id" })
  paramtype: param_type;

  @Column({ type: "text" })
  value: string;  
}
