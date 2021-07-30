import { TaskExecutor, TaskExecutorFactory } from '@angular-devkit/schematics';

import { GenericTaskFactoryOptions } from './options';

export class CustomTaskExecutor {
  static readonly Generic: TaskExecutorFactory<GenericTaskFactoryOptions> = {
    name: 'step1',
    create: (options) =>
      import('./executor').then((mod) => mod.default(options)) as Promise<
        TaskExecutor<{}>
      >,
  };

  createGenericTask(name: string): TaskExecutorFactory<GenericTaskFactoryOptions> {
    return {
      name: name,
      create: (options) =>
        import('./executor').then((mod) => mod.default(options)) as Promise<
          TaskExecutor<{}>
        >,
    }
  };
}
