export interface PositiveTag {
  _id: string;
  name: string;
  color: string;
}

export type PositiveTagPayload = Omit<PositiveTag, '_id'>;
