import * as path from 'path';
import { CsvReader } from './csv-reader';
import { DataProcessor } from './data-processor';
import { IOutputStrategy } from './interfaces/output-strategy.interface';
import { ConsoleStrategy } from './strategies/console.strategy';
import { KafkaStrategy } from './strategies/kafka.strategy';
import { RedisStrategy } from './strategies/redis.strategy';

function createStrategy(name: string): IOutputStrategy {
  switch (name) {
    case 'kafka': {
      const broker = process.env.KAFKA_BROKER ?? 'localhost:9092';
      console.log(`[Lab4] Using Kafka strategy (broker=${broker})`);
      return new KafkaStrategy(broker);
    }
    case 'redis': {
      const host = process.env.REDIS_HOST ?? 'localhost';
      const port = parseInt(process.env.REDIS_PORT ?? '6379', 10);
      console.log(`[Lab4] Using Redis strategy (${host}:${port})`);
      return new RedisStrategy(host, port);
    }
    case 'console':
    default:
      console.log('[Lab4] Using Console strategy');
      return new ConsoleStrategy();
  }
}

export async function runLab4(): Promise<void> {
  const strategyName = (process.env.OUTPUT_STRATEGY ?? 'console').toLowerCase();
  const strategy = createStrategy(strategyName);

  // Змінено назву файлу під предметну область
  const filePath = path.join(process.cwd(), 'data', 'tripadvisor-restaurants.csv');
  const reader = new CsvReader();

  try {
    console.log(`[Lab4] Reading ${filePath}`);
    const data = await reader.read(filePath);
    console.log(`[Lab4] Loaded ${data.length} restaurant records`);

    const processor = new DataProcessor(strategy);
    await processor.process(data);
    console.log('[Lab4] Done');
  } catch (err) {
    console.error('[Lab4] Failed:', (err as Error).message);
  }
}