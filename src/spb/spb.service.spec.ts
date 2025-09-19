import { Test, TestingModule } from '@nestjs/testing';
import { SpbService } from './spb.service';

describe('SpbService', () => {
  let service: SpbService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpbService],
    }).compile();

    service = module.get<SpbService>(SpbService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
