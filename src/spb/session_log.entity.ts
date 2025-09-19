import { Entity, Column, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class session_log {
  @PrimaryGeneratedColumn()
  id: number;

  @Index()
  @Column({ type: "bigint", nullable: false })
  session_id: number;

  @Column({ type: "integer", nullable: false })
  rule_id: number;

  @Column({ type: "bigint", nullable: false })
  event_id: number;

  @Column({ type: "text" })
  actions: string;  

  @Column({default: () => "now()"})
  created: Date;
}
