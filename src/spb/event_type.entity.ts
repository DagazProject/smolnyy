import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { event_source } from './event_source.entity';

@Entity()
export class event_type {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  source_id: number;
  @ManyToOne(type => event_source)
  @JoinColumn({ name: "source_id" })
  source: event_source;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "text", nullable: true })
  description: string;  
}
