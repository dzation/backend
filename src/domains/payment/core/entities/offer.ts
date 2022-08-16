import ID from "@core/entities/id";

export enum OfferType {
  PRO = "pro",
  FREE = "free",
  STARTER = "starter",
}

type Offer = {
  id: ID;
  type: OfferType;
  price: number;
  date: Date;
  status: "active" | "inactive";
  teacher: ID;
  course: ID;
};

export default Offer;
