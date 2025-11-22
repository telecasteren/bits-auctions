export interface Profile {
  id: string;
  name: string;
  email: string;
  bio: string;
  banner: {
    url: string;
    alt: string;
  };
  avatar: {
    url: string;
    alt: string;
  };
  credits: number;
  _count: {
    listings: number;
    bids: number;
  };
  _listings?: boolean;
  _wins?: boolean;
}
