import {OfficesEnum} from './offices.enum';

export interface Employee {
  _id: string;
  firstName: string;
  lastName: string;
  office: OfficesEnum;
  dateOfBirth: string;
  phoneNumber: string;
  positiveTagIds?: string[]
  negativeTagIds?: number[]
}

export type EmployeePayload = Omit<Employee, '_id'>;
