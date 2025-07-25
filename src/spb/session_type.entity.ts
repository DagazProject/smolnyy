import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { scenario } from './scenario.entity';

@Entity()
export class session_type {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  scenario_id: number;
  @ManyToOne(type => scenario)
  @JoinColumn({ name: "scenario_id" })
  scenario: scenario;

  @Column({ type: "varchar", length: 100 })
  name: string;  
}
