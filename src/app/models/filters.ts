import { Tags } from "./tags";

export class Filters {
  status: boolean;
  tags: Array<Tags>;
  typing: string;
  period: any = 'day';

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}