import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { command } from './command.entity';

@Entity()
export class step_type {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  command_id: number;
  @ManyToOne(type => command)
  @JoinColumn({ name: "command_id" })
  command: command;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ nullable: false, type: "varchar", length: 1 })
  abbr: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}
