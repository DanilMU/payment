import { Logger, ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
import { SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'

import { AppModule } from './app.module'
import { getCorsConfig, getSwaggerConfig } from './config'

async function bootstrap() {
	const app = await NestFactory.create<NestExpressApplication>(AppModule, {
		rawBody: true
	})

	const config = app.get(ConfigService)
	const logger = new Logger(AppModule.name)

	app.set('trust proxy', true)

	app.use(cookieParser(config.getOrThrow<string>('COOkIES_SECRET')))

	app.useGlobalPipes(new ValidationPipe())

	app.enableCors(getCorsConfig(config))

	const swaggerConfig = getSwaggerConfig()
	const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig)

	SwaggerModule.setup('docs', app, swaggerDocument, {
		jsonDocumentUrl: 'openapi.json'
	})

	const port = config.getOrThrow<number>('HTTP_PORT')
	const host = config.getOrThrow<string>('HTTP_HOST')

	try {
		await app.listen(port)

		logger.log(`Server running at: ${host}`)
	} catch (error: unknown) {
		if (error instanceof Error) {
			logger.error(`Failed to start server: ${error.message}`, error)
		} else {
			logger.error('Failed to start server: Unknown error', error)
		}
		process.exit(1)
	}
}
bootstrap()
