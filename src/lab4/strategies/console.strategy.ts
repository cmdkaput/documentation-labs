import { IOutputStrategy } from '../interfaces/output-strategy.interface';

export class ConsoleStrategy implements IOutputStrategy {
  async output(data: Record<string, string>[]): Promise<void> {
    for (const row of data) {
      const name = row['Restaurant Name'] ?? 'Unknown';
      const city = row['City'] ?? 'Unknown';
      const rating = row['Rating'] ?? 'N/A';
      const reviewsCount = row['Reviews Count'] ?? '0';
      
      console.log(
        `[TripAdvisor] Restaurant: "${name}" (${city}) | Rating: ${rating} | Reviews: ${reviewsCount}`,
      );
    }
  }
}