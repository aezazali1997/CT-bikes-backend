export interface ICountry {
  name: string;
  states: string[];
  shipping_fee: number;
  disabled: boolean;
  createdAt: Date;
  updatedAt: Date;
  id:string;
}