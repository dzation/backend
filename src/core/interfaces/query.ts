export default abstract class Query {
  abstract fetch(...arguemnts: any): Promise<any>;

}
