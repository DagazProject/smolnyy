import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { event_type } from './event_type.entity';
import { session } from './session.entity';

@Entity()
export class event {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => event_type)
  @JoinColumn({ name: "type_id" })
  type: event_type;

  @Index()
  @Column({ nullable: false })
  session_id: number;
  @ManyToOne(type => session)
  @JoinColumn({ name: "session_id" })
  session: session;

  @Column({ type: "json" })
  data: string;  

  @Column({default: () => "now()"})
  created: Date;
}
