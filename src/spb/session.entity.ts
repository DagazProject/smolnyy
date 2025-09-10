import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { session_type } from './session_type.entity';
import { scenario_step } from './scenario_step.entity';

@Entity()
@Unique(["call_id"])
export class session {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column({ nullable: false, type: "varchar", length: 36 })
  call_id: string;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => session_type)
  @JoinColumn({ name: "type_id" })
  type: session_type;

  @Index()
  @Column({ nullable: false })
  step_id: number;
  @ManyToOne(type => scenario_step)
  @JoinColumn({ name: "step_id" })
  step: scenario_step;

  @Column({default: () => "now()"})
  created: Date;

  @Column({ nullable: true })
  closed: Date;
}
