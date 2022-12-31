
export class Assessment {
  id?: string;
  user_id: string;
  table_id: string;
  comment: string;
  stars?: number;
  createdAt?: Date;
  updatedAt?: Date;

  constructor({ user_id, table_id, comment }: Assessment) {
    return Object.assign(this, {
      user_id,
      table_id,
      comment
    });
  }
}