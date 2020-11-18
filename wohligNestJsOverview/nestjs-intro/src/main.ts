// import Nest JS Core
import { NestFactory } from '@nestjs/core';
// instantiates app.Module.ts
import { AppModule } from './app.module';

/* 
  description: bootstrap() function that creates a appliction instance. 
*/
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enables cross platform
  await app.listen(3000);
  // console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
