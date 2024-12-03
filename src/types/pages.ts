export interface CategoryPageProps {
  favorites: Set<string>;
  onToggleFavorite: (cardId: string) => void;
}
