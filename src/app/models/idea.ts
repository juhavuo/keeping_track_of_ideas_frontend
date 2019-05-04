export interface Idea{
  _id: string;
  owner: string;
  owner_id: string;
  is_private: boolean;
  title: string;
  details: string;
  keywords: string[];
  time?: Date;
  links: string[];
  liked_by?: string[];
  likes?: number;
  comments?: [{_id: string, comment_time: Date, commenter_id: string, commenter_name: string, comment_text: string}];
  show_comments?: boolean;
  show_add_comment?: boolean;
}
