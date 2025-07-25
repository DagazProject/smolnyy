import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { provider } from './provider.entity';

@Entity()
export class speaker {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  provider_id: number;
  @ManyToOne(type => provider)
  @JoinColumn({ name: "provider_id" })
  provider: provider;

  @Column({ type: "varchar", length: 100 })
  name: string;  
}