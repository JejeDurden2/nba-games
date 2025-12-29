import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express, { Express } from 'express';
import { VercelRequest, VercelResponse } from '@vercel/node';

let cachedServer: Express | null = null;

async function bootstrap(): Promise<Express> {
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

export default async (req: VercelRequest, res: VercelResponse) => {
  const server = await bootstrap();
  return server(req, res);
};
