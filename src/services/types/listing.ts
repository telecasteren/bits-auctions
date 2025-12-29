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
  created: Date;
  updated?: Date;
  endsAt: Date;
  seller: Profile;
  bids?: Bid[];
  _count?: {
    bids: number;
  };
  _seller?: boolean;
  _bids?: boolean;
}

export interface Bid {
  id: string;
  amount: number;
  bidder: Profile;
  created: Date;
}
