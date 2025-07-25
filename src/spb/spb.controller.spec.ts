import { Test, TestingModule } from '@nestjs/testing';
import { SpbController } from './spb.controller';

describe('SpbController', () => {
  let controller: SpbController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SpbController],
    }).compile();

    controller = module.get<SpbController>(SpbController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
