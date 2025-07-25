import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpbService } from './spb.service';
import { SpbController } from './spb.controller';
import { event_source } from './event_source.entity';

@Module({
  imports: [TypeOrmModule.forFeature([event_source])],
  providers: [SpbService],
  controllers: [SpbController]
})
export class SpbModule {}
