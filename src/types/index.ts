export interface Card {
  id: string;
  title: string;
  category: string;
}

export interface Category {
  id: string;
  icon: any;
  name: string;
  color: string;
  cards: Card[];
}