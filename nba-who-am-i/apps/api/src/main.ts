import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';

let cachedServer;

async function bootstrap() {
  if (!cachedServer) {
    const expressApp = express();
    const app = await NestFactory.create(
      AppModule,
      new ExpressAdapter(expressApp)
    );
    app.enableCors();
    app.setGlobalPrefix('api');
    await app.init();
    cachedServer = expressApp;
  }
  return cachedServer;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const port = process.env.PORT ?? 3001;
  bootstrap().then((app) => {
    app.listen(port, () => {
      console.log(`🏀 NBA Who Am I API running on port ${port}`);
    });
  });
}

// For Vercel serverless
export default async (req, res) => {
  const server = await bootstrap();
  return server(req, res);
};
