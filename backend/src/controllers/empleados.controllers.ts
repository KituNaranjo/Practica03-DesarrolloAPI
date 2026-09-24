import type { Request, Response, NextFunction } from 'express';
import type { IEmployeeRepository } from '../repositories/employee.repository.interface.js';
import { EmployeeMongoRepository } from '../repositories/employee.mongo.repository.js';
import { sendSuccess } from '../utils/api-response.js';
import { AppError } from '../errors/app-error.js';

const employeeRepository: IEmployeeRepository = new EmployeeMongoRepository();

export const getEmpleados = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const empleados = await employeeRepository.findAll();
    sendSuccess(res, empleados);
  } catch (err) {
    next(err);
  }
};

export const getEmpleadoById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const empleado = await employeeRepository.findById(id);
    if (!empleado) {
      throw new AppError('Empleado no encontrado', 404);
    }
    sendSuccess(res, empleado);
  } catch (err) {
    next(err);
  }
};

export const addEmpleado = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const empleado = await employeeRepository.create(req.body);
    sendSuccess(res, empleado, 201, 'Empleado guardado');
  } catch (err) {
    next(err);
  }
};

export const updateEmpleado = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const empleado = await employeeRepository.update(id, req.body);
    if (!empleado) {
      throw new AppError('Empleado no encontrado', 404);
    }
    sendSuccess(res, empleado, 200, 'Empleado actualizado');
  } catch (err) {
    next(err);
  }
};

export const deleteEmpleado = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params as { id: string };
    const eliminado = await employeeRepository.delete(id);
    if (!eliminado) {
      throw new AppError('Empleado no encontrado', 404);
    }
    sendSuccess(res, null, 200, 'Empleado eliminado');
  } catch (err) {
    next(err);
  }
};