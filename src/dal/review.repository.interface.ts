export interface IReviewRepository {
  readCsv(path: string): Promise<any[]>;
  saveReview(review: any): Promise<void>;
}