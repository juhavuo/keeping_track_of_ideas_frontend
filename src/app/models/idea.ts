export interface Idea{
  _id: string;
  owner: string;
  is_private: boolean;
  title: string;
  details: string;
  keywords: string[];
  time: string;
  links: string[];
  liked_by?: string[];
  likes?: number;
  viewers_own?: boolean;
}
