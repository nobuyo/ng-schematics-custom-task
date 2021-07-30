import { SchematicContext, TaskExecutor } from '@angular-devkit/schematics';
import { Observable } from 'rxjs';

import {
  GenericTaskFactoryOptions,
  GenericTaskOptions,
} from './options';

export default function (
  _: GenericTaskFactoryOptions = {},
): TaskExecutor<GenericTaskOptions> {
  return (options: GenericTaskOptions = {}, context: SchematicContext) => {
    context.logger.info(`Executing task: ${options.name}`)
    if (options.operation) {
      return options.operation(context);
    }

    return new Observable()
  }
}
