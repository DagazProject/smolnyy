import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dict_type } from './spb/dict_type.entity';
import { dict } from './spb/dict.entity';
import { JwtService } from '@nestjs/jwt';
import { tokens } from './spb/tokens.entity';

const EXP_SECONDS: number = 36000;

@Injectable()
export class AppService {


  constructor(
    @InjectRepository(dict_type)
    private repository: Repository<dict_type>,
    private jwtService: JwtService
  ) {}  

  async checkToken(id: number, val: string): Promise<void> {
      const x = await this.repository.query(
        `select count(*) as cnt
         from   tokens
         where  user_id = $1 and value_str = $2
         and    now() < expired`, [id, val]);
      if (x[0].cnt == 0) {
         throw new UnauthorizedException("Token not found");
      }
  }

  async getToken(login: string, pass: string): Promise<{ access_token: string }> {
      const x = await this.repository.query(
        `select id, name
         from   users
         where  login = $1 and pass = $2`, [login, pass]);
      if (!x || x.length != 1) {
          throw new UnauthorizedException("Incorrect user or password");
      }
      const payload = { sub: x[0].id, username: x[0].name };
      const token = await this.jwtService.signAsync(payload);
      await this.repository.createQueryBuilder("tokens")
      .delete()
      .from(tokens)
      .where("tokens.user_id = :user_id", { user_id: x[0].id })
      .execute();
      let t: tokens = new tokens();
      t.user_id = x[0].id;
      t.value_str = token;
      t.created = new Date();
      t.expired = new Date(t.created.getTime() + EXP_SECONDS * 1000);
      await this.repository.createQueryBuilder("tokens")
      .insert()
      .into(tokens)
      .values(t)
      .execute();
      return {
        access_token: token,
      };
  }

  async getDictTypes(): Promise<dict_type[]> {
    const x = await this.repository.query(
                `select id, name, parent_id from dict_type`);
    const r: dict_type[] = x.map(x => {
      const v = new dict_type();
      v.id = x.id;
      v.name = x.name;
      v.parent_id = x.parent_id;
      return v;
    });
    return r;
  }

  async getDict(id: number): Promise<dict[]> {
    const x = await this.repository.query(
                `select a.id, a.type_id, a.parent_id, a.description, a.priority,
                       case
                         when not b.val is null then a.name || ';' || b.val
                         else a.name
                       end as name
                from   dict a
                left   join (
                   select dict_id, string_agg(value, ';') val
                   from dict_synonym
                   group by dict_id ) b on (b.dict_id = a.id)
                where a.type_id = $1
                order by a.priority desc`, [id]);
    const r: dict[] = x.map(x => {
      const v = new dict();
      v.id = x.id;
      v.name = x.name;
      v.parent_id = x.parent_id;
      v.type_id = x.type_id;
      v.description = x.description;
      v.priority = x.priority;
      return v;
    });
    return r;
  }

  async getScenario(id: number): Promise<string> {
    let line = '';
    const x = await this.repository.query(
                `select b.abbr || '[' || a.id || ']' || a.name ||
                        case
                          when a.is_default then '*'
                          else ''
                        end as line
                 from   scenario a
                 inner  join scenario_type b on (b.id = a.type_id)
                 where  a.id = $1`, [id]);
    x.forEach(x => {
      line = line + x.line + '\n';
    });
    const y = await this.repository.query(
                `with recursive a as (
                      select id, name, type_id, order_num, audio_id, paramtype_id, dict_id, value, nextstep_id,
                          '--' as prefix, ARRAY[order_num] as path
                      from   scenario_step
                      where  scenario_id = $1 and parent_id is null
                      union  all
                      select b.id, b.name, b.type_id, b.order_num, b.audio_id, b.paramtype_id, b.dict_id, b.value, b.nextstep_id,
                             a.prefix || '--' as prefix, a.path || b.order_num as path
                      from   a
                      inner  join scenario_step b on (b.parent_id = a.id)
                    ), dicts as (
                      select a.id, a.type_id, a.parent_id, a.description, a.priority,
                             case
                                when not b.val is null then a.name || ';' || b.val
                                else a.name
                             end as name
                      from   dict a
                      left   join (
                         select dict_id, string_agg(value, ';') val
                         from dict_synonym
                         group by dict_id ) b on (b.dict_id = a.id)
                    )
                    select a.prefix || b.abbr || '[' || a.id || ']' || a.name ||
                           case
                             when a.type_id = 1 then coalesce('/' || c.name || '/[' || c.id || ']', '!!!NO AUDIO!!!')
                             when a.type_id = 2 then coalesce('<' || d.description || '>[' || d.id || ']', '!!!NO PARAM!!!')
                             when a.type_id in (3, 5) then coalesce('[' || a.nextstep_id || ']', '!!!NO ID!!!')
                             when a.type_id = 4 then coalesce('[' || a.paramtype_id || ']' || coalesce('=[' || a.dict_id || ']/' || e.name || '/', ''), '!!!NO PARAM!!!')
                             else ''
                           end ||
                           case
                             when not a.type_id in (3, 5) and not a.nextstep_id is null then '^[' || a.nextstep_id || ']'
                             else ''
                           end
                           as line
                    from   a
                    inner  join step_type b on (b.id = a.type_id)
                    left   join audio c on (c.id = a.audio_id)
                    left   join param_type d on (d.id = a.paramtype_id)
                    left   join dicts e on (e.id = a.dict_id)
                    order  by a.path`, [id]);
    y.forEach(x => {
      line = line + x.line + '\n';
    });
    return line;
  }
}
