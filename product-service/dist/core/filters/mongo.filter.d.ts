import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
import { MongoError } from 'mongodb';
export declare class MongoExceptionsFilter implements ExceptionFilter {
    catch(exception: MongoError, host: ArgumentsHost): void;
}
