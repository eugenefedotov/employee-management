import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee, EmployeeDocument } from './schemas/employee.schema';
import { CreateEmployeeDto } from './dto/create-employee.dto';
import { UpdateEmployeeDto } from './dto/update-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectModel(Employee.name)
    private readonly employeeModel: Model<EmployeeDocument>,
  ) {}

  create(dto: CreateEmployeeDto) {
    const employee = new this.employeeModel(dto);
    return employee.save();
  }

  findAll() {
    return this.employeeModel.find().exec();
  }

  async findOne(id: string) {
    const employee = await this.employeeModel.findById(id).exec();

    if (!employee) {
      throw new NotFoundException(`Employee with id "${id}" not found`);
    }

    return employee;
  }

  async update(id: string, dto: UpdateEmployeeDto) {
    const employee = await this.employeeModel
      .findByIdAndUpdate(id, dto, { new: true })
      .exec();

    if (!employee) {
      throw new NotFoundException(`Employee with id "${id}" not found`);
    }

    return employee;
  }

  async remove(id: string) {
    const employee = await this.employeeModel.findByIdAndDelete(id).exec();

    if (!employee) {
      throw new NotFoundException(`Employee with id "${id}" not found`);
    }
  }
}
