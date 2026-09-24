import { Router } from 'express';
import {
  getEmpleados,
  getEmpleadoById,
  addEmpleado,
  updateEmpleado,
  deleteEmpleado,
} from '../controllers/empleados.controllers.js';
import { validate } from '../middlewares/validate.middleware.js';
import { createEmployeeSchema, updateEmployeeSchema, idParamSchema } from '../dto/employee.dto.js';

const router = Router();

router.get('/empleados', getEmpleados);
router.get('/empleados/:id', validate(idParamSchema, 'params'), getEmpleadoById);
router.post('/empleados', validate(createEmployeeSchema, 'body'), addEmpleado);
router.put('/empleados/:id', validate(idParamSchema, 'params'), validate(updateEmployeeSchema, 'body'), updateEmpleado);
router.delete('/empleados/:id', validate(idParamSchema, 'params'), deleteEmpleado);

export default router;