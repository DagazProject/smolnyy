import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';

@Entity()
export class dict_type {
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(type => dict_type)
  @JoinColumn({ name: "parent_id" })
  parent: dict_type;

  @Column({ type: "varchar", length: 100 })
  name: string;  
}
