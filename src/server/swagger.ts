import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFileSync } from 'fs';
import { description, name, version } from './../../package.json';

export const swaggerLoad = (app, globalPrefix, swaggerJsonWriteFile) => {
  const options = new DocumentBuilder()
    .setTitle(`${name.charAt(0).toUpperCase() + name.slice(1)} API`)
    .setDescription(description)
    .setContact('WeslyG', 'https://github.com/WeslyG/', 'weslyg22@gmail.com')
    .setVersion(version)
    .addBearerAuth()
    .build();
  const swaggerDocument = SwaggerModule.createDocument(app, options);

  if (swaggerJsonWriteFile) {
    writeFileSync('./swagger-spec.json', JSON.stringify(swaggerDocument));
  }

  SwaggerModule.setup(`${globalPrefix}/swagger`, app, swaggerDocument);
};
