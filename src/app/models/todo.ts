export class Todo {
  id: number;
  date: string;
  time: string;
  creationDate: string;
  title: string;
  complete: boolean = false;
  description: string;
  duration: string;
  tags: any;
  reminder: string;

  constructor(values: Object = {}) {
    Object.assign(this, values);
  }
}