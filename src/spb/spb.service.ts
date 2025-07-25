import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { event_source } from './event_source.entity';

@Injectable()
export class SpbService {
  constructor(
    @InjectRepository(event_source)
    private spbRepository: Repository<event_source>,
  ) {}    
}
