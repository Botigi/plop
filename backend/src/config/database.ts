import { DataSource } from 'typeorm';
import { Course } from '../entities/Course';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'course_user',
  password: 'course_password',
  database: 'course_app',
  synchronize: true,
  logging: true,
  entities: [Course],
  subscribers: [],
  migrations: [],
}); 