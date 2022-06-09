import { Include } from './types';

export class Helper {
  public static joinTables(query, joins?: Include[]): void {
    joins?.forEach((include) => {
      query.leftJoinAndSelect(include.property, include.alias);
    });
  }
}
