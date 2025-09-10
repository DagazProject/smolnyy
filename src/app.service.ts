import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { dict_type } from './spb/dict_type.entity';
import { dict } from './spb/dict.entity';

@Injectable()
export class AppService {

  constructor(
    @InjectRepository(dict_type)
    private repository: Repository<dict_type>,
  ) {}  

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
}
