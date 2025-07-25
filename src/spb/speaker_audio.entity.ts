import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { audio } from './audio.entity';
import { speaker } from './speacker.entity';

@Entity()
export class speaker_audio {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  speaker_id: number;
  @ManyToOne(type => speaker)
  @JoinColumn({ name: "speaker_id" })
  speaker: speaker;

  @Index()
  @Column({ nullable: false })
  audio_id: number;
  @ManyToOne(type => audio)
  @JoinColumn({ name: "audio_id" })
  audio: audio;

  @Column({ type: "varchar", length: 300 })
  audio_url: string;  
}