import { Kafka, Producer, Partitioners } from 'kafkajs';
import { IOutputStrategy } from '../interfaces/output-strategy.interface';

export class KafkaStrategy implements IOutputStrategy {
  private readonly producer: Producer;
  private readonly topic = 'tripadvisor-restaurants';
  private readonly batchSize = 200;
  private connected = false;

  constructor(broker: string) {
    const kafka = new Kafka({
      clientId: 'lab4-tripadvisor-producer',
      brokers: [broker],
    });
    this.producer = kafka.producer({
      createPartitioner: Partitioners.DefaultPartitioner,
    });
  }

  private async ensureConnected(): Promise<void> {
    if (this.connected) return;
    await this.producer.connect();
    this.connected = true;
  }

  async output(data: Record<string, string>[]): Promise<void> {
    try {
      await this.ensureConnected();
      let sent = 0;
      for (let i = 0; i < data.length; i += this.batchSize) {
        const chunk = data.slice(i, i + this.batchSize);
        const messages = chunk.map((row) => ({ value: JSON.stringify(row) }));
        await this.producer.send({ topic: this.topic, messages });
        sent += messages.length;
      }
      console.log(`[KafkaStrategy] Sent ${sent} restaurant records to "${this.topic}"`);
    } catch (err) {
      console.error('[KafkaStrategy] Failed to send messages:', (err as Error).message);
    } finally {
      if (this.connected) {
        await this.producer.disconnect().catch(() => undefined);
        this.connected = false;
      }
    }
  }
}