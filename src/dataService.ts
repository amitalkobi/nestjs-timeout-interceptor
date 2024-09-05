import { Injectable } from '@nestjs/common';

async function wait(seconds: number) {
  console.log(`Waiting for ${seconds} sec starts`)
  await new Promise((resolve) => setTimeout(resolve, seconds * 1000))
  console.log('Waiting is over')
}

async function *getData() {
  for (let i = 0; i < 3; i++) {
    await wait(1)
    yield `i: ${i}\n`
  }
}

@Injectable()
export class DataService {

  /**
   * Returns some dummy data iterable.
   * It takes 3 seconds to go over all the iterable items.
   */
  getData(): AsyncGenerator<string> {
    return getData()
  }
}
