export interface GenericTaskFactoryOptions {}

export interface GenericTaskOptions {
  quiet?: boolean;
  hideOutput?: boolean;
  workingDirectory?: string;
  name?: string;
  operation?: (args?: any) => any;
}
