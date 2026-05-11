import { IOutputStrategy } from './interfaces/output-strategy.interface';

export class DataProcessor {
  constructor(private readonly strategy: IOutputStrategy) {}

  async process(data: Record<string, string>[]): Promise<void> {
    await this.strategy.output(data);
  }
}