import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum SourceEnum {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
}

@Entity()
export class dialog_logs {
  @PrimaryGeneratedColumn({ type: 'bigint'})
  id: number;

  @Column({ type: 'uuid', nullable: false })
  session_id: string;

  @Column({ nullable: false, type: 'enum', enum: SourceEnum, enumName: 'source'})
  direction: SourceEnum;  

  @Column({ nullable: true, type: "varchar", length: 300 })
  voice_model: string;  

  @Column({ nullable: true, type: "varchar", length: 32 })
  number_a: string;  

  @Column({ nullable: true, type: "varchar", length: 32 })
  number_b: string;  

  @Column({ nullable: true, type: "text" })
  input_text: string;  

  @Column({ nullable: true, type: "text" })
  output_text: string;  

  @Column({ nullable: true, type: "integer" })
  processing_time_ms: number;

  @Column({ nullable: true, type: "text" })
  error_message: string;  

  @Column({ nullable: true, type: "varchar", length: 50 })
  error_code: string;  

  @Column({ nullable: true, type: "timestamptz", default: () => 'now()' })
  time_stamp: Date;
}