import { NestFactory } from '@nestjs/core';
import * as dotenv from 'dotenv';
import * as cookieParser from 'cookie-parser';
import {
  Logger,
  ValidationPipe,
} from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cors from 'cors';
import { AppModule } from './app.module';
import { SwaggerTheme, SwaggerThemeNameEnum } from 'swagger-themes';
import { readFileSync } from 'fs';
import { join } from 'path';

dotenv.config();

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const logger = new Logger('Flash Review');

  const app = await NestFactory.create(AppModule);

  let currentRoute = null;
  app.use((req, _, next) => {
    currentRoute = req.path;
    next();
  });

  app.use(
    cors({
      origin: function (origin, callback) {
        const whiteList = process.env.CORS_WHITELIST
          ? process.env.CORS_WHITELIST.split(',')
          : [];
        if (whiteList.includes(origin) || !origin) {
          if (process.env.PRODUCTION === 'false')
            logger.debug(
              `Origem permitida através do CORS. Origem ${origin} na rota ${currentRoute}`,
            );
          callback(null, true);
        } else {
          logger.error(
            `Origem não permitida através do CORS. Origem ${origin} na rota ${currentRoute}`,
          );
        }
      },
      methods: ['GET', 'POST', 'PATCH', 'DELETE'],
      credentials: true,
    }),
  );
  app.use(cookieParser());
  // app.useGlobalInterceptors(new EmojiInterceptor());

  if (process.env.PRODUCTION === 'false') {
    const packageJson = JSON.parse(
      readFileSync(join(__dirname, '../package.json'), 'utf8'),
    );

    const config = new DocumentBuilder()
      .setTitle('Flash Review')
      .setDescription(
        'Sistema de avaliações de filmes e séries'
      )
      .setVersion(`${packageJson.version}`)
      .build();

    const document = SwaggerModule.createDocument(app, config);

    const theme = new SwaggerTheme();

    SwaggerModule.setup('api', app, document, {
      swaggerOptions: {
        defaultModelsExpandDepth: -1,
        docExpansion: 'none',
      },
      customCss: theme.getBuffer(SwaggerThemeNameEnum.DRACULA),
    });
  }

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  await app.listen(port);

  logger.debug(`Servidor de ${
    process.env.PRODUCTION == 'false'
    ? `desenvolvimento`
    : `produção`
    } rodando na porta ${port}`
  );
}
bootstrap();