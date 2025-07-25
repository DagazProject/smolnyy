import { Entity, Column, Index, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm';
import { param_type } from './param_type.entity';
import { session } from './session.entity';

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
  @Column({ nullable: false })
  paramtype_id: number;
  @ManyToOne(type => param_type)
  @JoinColumn({ name: "paramtype_id" })
  paramtype: param_type;

  @Column({ type: "text" })
  value: string;  
}
