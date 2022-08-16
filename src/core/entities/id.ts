import { v4 as uuidv4 } from "uuid";

export default class ID {
  private value: String;

  constructor(value: string) {
    this.value = value;
  }

  toString(): string {
    return this.value.toString();
  }

  equals(other: ID): Boolean {
    return other.toString() == this.toString();
  }

  static generate(): ID {
    return new ID(uuidv4());
  }

  static validate(id: string): boolean {
    // check if the id is a valid uuid
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      id
    );
  }
}
