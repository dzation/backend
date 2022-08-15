export default abstract class UseCase {
  abstract run(...arguemnts: any): Promise<any>;

  abstract validate(): Promise<boolean>;
}
