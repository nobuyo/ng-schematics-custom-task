import { spawn, SpawnOptions } from 'child_process';

import { Rule, SchematicContext, Tree, TaskId, chain } from '@angular-devkit/schematics';
import { NodeWorkflow } from '@angular-devkit/schematics/tools/workflow/node-workflow';
import { NodePackageInstallTask } from '@angular-devkit/schematics/tasks';

import { Observable } from 'rxjs';

import { CustomTaskExecutor } from '../tasks';
import { GenericTask } from '../tasks/generic-task';

function step1(context: SchematicContext) {
  return new Observable((obs) => {
    context.logger.info('step 1');
    obs.next();
    obs.complete();
  });
}

function step2(_context: SchematicContext) {
  const spawnOptions = {
    stdio: 'inherit',
    shell: true,
  } as SpawnOptions;

  return new Observable((obs) => {
    spawn('sleep', ['5'], spawnOptions).on(
      'close',
      (code: number) => {
        if (code === 0) {
          obs.next();
          obs.complete();
        }
      },
    );
  });
}

const taskIds: TaskId[] = [];

export function bootleg(_options: any): Rule {
  const customTaskExecutor = new CustomTaskExecutor();

  return chain([
    (tree: Tree, context: SchematicContext) => {
      const engineHost = (context.engine.workflow as NodeWorkflow).engineHost;
      engineHost.registerTaskExecutor(customTaskExecutor.createGenericTask('step1'));
      context.addTask(new GenericTask({ name: 'step1', operation: step1 }));

      return tree;
    },
    (host: Tree, context: SchematicContext) => {
      taskIds.push(context.addTask(new NodePackageInstallTask()));

      return host;
    },
    (tree: Tree, context: SchematicContext) => {
      const engineHost = (context.engine.workflow as NodeWorkflow).engineHost;
      engineHost.registerTaskExecutor(customTaskExecutor.createGenericTask('step2'));
      taskIds.push(context.addTask(new GenericTask({ name: 'step2', operation: step2 }), taskIds));

      return tree;
    },
  ]);
}
