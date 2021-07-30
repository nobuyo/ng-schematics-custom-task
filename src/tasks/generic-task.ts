import { TaskConfiguration, TaskConfigurationGenerator } from '@angular-devkit/schematics';
import { Observable } from 'rxjs';

import { GenericTaskOptions } from './options';

interface GenericTaskConstructionOptions {
  packageManager?: string;
  packageName?: string;
  workingDirectory?: string;
  quiet?: boolean;
  hideOutput?: boolean;
  name: string;
  operation?: (args?: any) => Observable<unknown>;
}

export class GenericTask implements TaskConfigurationGenerator<GenericTaskOptions> {
  quiet = true;
  hideOutput = true;
  workingDirectory?: string;
  name: string;
  operation: () => any;

  constructor(options: GenericTaskConstructionOptions) {
    if (options.quiet != undefined) {
      this.quiet = options.quiet;
    }
    if (options.hideOutput != undefined) {
      this.hideOutput = options.hideOutput;
    }
    if (options.workingDirectory != undefined) {
      this.workingDirectory = options.workingDirectory;
    }
    if (options.name != undefined) {
      this.name = options.name;
    }
    if (options.operation != undefined) {
      this.operation = options.operation;
    }
  }

  toConfiguration(): TaskConfiguration<GenericTaskOptions> {
    return {
      name: this.name,
      options: {
        quiet: this.quiet,
        hideOutput: this.hideOutput,
        workingDirectory: this.workingDirectory,
        name: this.name,
        operation: this.operation,
      },
    };
  }
}
