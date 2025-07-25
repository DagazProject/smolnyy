import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { scenario_type } from './scenario_type.entity';

@Entity()
export class scenario {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => scenario_type)
  @JoinColumn({ name: "type_id" })
  type: scenario_type;

  @Column({ type: "varchar", length: 100 })
  name: string;  

  @Column({ type: "boolean", default: false })
  is_default: boolean;
}
