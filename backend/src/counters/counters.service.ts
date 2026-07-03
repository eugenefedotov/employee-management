import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Counter, CounterDocument } from './schemas/counter.schema';

@Injectable()
export class CountersService {
  constructor(
    @InjectModel(Counter.name) private counterModel: Model<CounterDocument>,
  ) {}

  /**
   * Атомарно возвращает следующее число для указанной последовательности.
   * $inc - это единая атомарная операция MongoDB, поэтому два запроса,
   * пришедшие одновременно, никогда не получат одно и то же число.
   */
  async getNextSequence(counterName: string): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { _id: counterName },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return counter.seq;
  }
}
