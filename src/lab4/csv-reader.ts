import * as fs from 'fs';
import { parse } from 'csv-parse';

export class CsvReader {
  async read(filePath: string): Promise<Record<string, string>[]> {
    return new Promise((resolve, reject) => {
      const records: Record<string, string>[] = [];
      const stream = fs.createReadStream(filePath);
      stream.on('error', reject);

      const parser = stream.pipe(
        parse({ columns: true, trim: true, skip_empty_lines: true }),
      );
      parser.on('data', (row: Record<string, string>) => records.push(row));
      parser.on('end', () => resolve(records));
      parser.on('error', reject);
    });
  }
}