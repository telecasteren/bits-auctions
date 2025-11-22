import type { Profile } from "./profile";

export interface Listing {
  id: string;
  title: string;
  description: string;
  tags: Array<string>;
  media: Array<{
    url: string;
    alt: string;
  }>;
  created: string;
  updated: string;
  endsAt: string;
  seller: Profile;
  _count: {
    bids: number;
  };
  _seller?: boolean;
  _bids?: boolean;
}
