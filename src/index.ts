import { binding } from '@ports/fastify/server';
import dotenv from 'dotenv';

dotenv.config();
async function makeApp() {
  binding();
}
