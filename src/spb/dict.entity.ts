import { Entity, Column, PrimaryColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { dict_type } from './dict_type.entity';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

@Entity()
export class dict {
  @ApiProperty()
  @PrimaryColumn()
  id: number;

  @Index()
  @Column({ nullable: false })
  type_id: number;
  @ManyToOne(type => dict_type)
  @JoinColumn({ name: "type_id" })
  type: dict_type;

  @ApiProperty()
  @Index()
  @Column({ nullable: true })
  parent_id: number;
  @ManyToOne(type => dict)
  @JoinColumn({ name: "parent_id" })
  parent: dict;

  @ApiProperty()
  @Column({ type: "varchar", length: 100 })
  name: string;  

  @ApiPropertyOptional()
  @Column({ type: "text", nullable: true })
  description: string;  

  @ApiProperty()
  @Column({ type: "integer", nullable: false, default: 1 })
  priority: number;
}