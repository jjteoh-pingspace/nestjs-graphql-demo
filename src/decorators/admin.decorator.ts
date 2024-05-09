import { Extensions } from '@nestjs/graphql';
import { Role } from '../enums/roles';

export const Admin = () => Extensions({ role: Role.ADMIN });
