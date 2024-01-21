export interface Item {
  id: string;
  title: string;
  description: string;
}

export interface Column {
  name: string;
  items: Item[];
}
