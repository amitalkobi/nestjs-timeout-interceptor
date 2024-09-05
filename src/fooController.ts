import {Controller, Get, StreamableFile, UseInterceptors} from '@nestjs/common';
import { DataService } from './dataService';
import { Readable } from 'stream'
import {TimeoutInterceptor} from "./timeout.interceptor";

const TIMEOUT_MS = 10

@Controller("foo")
@UseInterceptors(new TimeoutInterceptor(TIMEOUT_MS))
export class FooController {
  constructor(private readonly dataService: DataService) {}

  /*
  TimeoutInterceptor works here.
  Returns response with status code 408.
   */
  @Get()
  async getData() {
    const result = [];
    for await (const value of this.dataService.getData()) {
      result.push(value);
    }
    return result;
  }

  /*
  TimeoutInterceptor **DOES NOT** work here.
  File is downloaded normally.
   */
  @Get('file')
  getFile() {
    return new StreamableFile(Readable.from(this.dataService.getData()))
  }
}
