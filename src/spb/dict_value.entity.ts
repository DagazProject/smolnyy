import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { dict } from './dict.entity';
import { audio } from './audio.entity';

@Entity()
export class dict_value {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  dict_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "dict_id" })
  dict: dict;

  @Index()
  @Column({ nullable: true })
  audio_id: number;
  @ManyToOne(type => audio)
  @JoinColumn({ name: "audio_id" })
  audio: audio;

  @Column({ type: "varchar", length: 100 })
  value: string;  
}