import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SpbModule } from './spb/spb.module';
import { event_source } from './spb/event_source.entity';
import { event_type } from './spb/event_type.entity';
import { event } from './spb/event.entity';
import { scenario } from './spb/scenario.entity';
import { step_type } from './spb/step_type.entity';
import { scenario_step } from './spb/scenario_step.entity';
import { session_type } from './spb/session_type.entity';
import { session } from './spb/session.entity';
import { event_rule } from './spb/event_rule.entity';
import { session_log } from './spb/session_log.entity';
import { param_type } from './spb/param_type.entity';
import { session_param } from './spb/session_param.entity';
import { setting_type } from './spb/setting_type.entity';
import { setting_value } from './spb/setting_value.entity';
import { dict_type } from './spb/dict_type.entity';
import { action_type } from './spb/action_type.entity';
import { provider } from './spb/provider.entity';
import { dict } from './spb/dict.entity';
import { audio } from './spb/audio.entity';
import { dict_value } from './spb/dict_value.entity';
import { speaker } from './spb/speacker.entity';
import { speaker_audio } from './spb/speaker_audio.entity';
import { dict_synonym } from './spb/dict_synonym.entity';
import { action } from './spb/action.entity';
import { scenario_type } from './spb/scenario_type.entity';
import { command } from './spb/command.entity';
import { dialog_logs } from './spb/dialog_logs.entity';
import { users } from './spb/users.entity';
import { tokens } from './spb/tokens.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './spb/constants';
import { param_kind } from './spb/param_kind.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
      type: 'postgres',
      host: '127.0.0.1',
      port: 5432,
      username: 'user',
      password: 'pass',
      database: 'db',
      entities: [event_source, event_type, event, scenario, step_type, scenario_step, session_type, session, event_rule, session_log, param_type, session_param, setting_type, setting_value, dict_type, action_type, provider, dict, audio, dict_value, speaker, speaker_audio, dict_synonym, action, scenario_type, command, dialog_logs, users, tokens, param_kind],
      synchronize: false,
     }), 
     TypeOrmModule.forFeature([dict_type]),
     SpbModule,
     JwtModule.register({
        secret: jwtConstants.secret,
        signOptions: { expiresIn: '36000s' },
     })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

