import axios from "axios";
import type { ReactNode } from "react";

export const PricingOption = {
  Paid: 0,
  Free: 1,
  ViewOnly: 2,
} as const;

export type PricingOption = (typeof PricingOption)[keyof typeof PricingOption];

export interface ContentItem {
  imagePath: string | undefined;
  creator: ReactNode;
  id: string;
  title: string;
  userName: string;
  thumbnail: string;
  pricingOption: PricingOption;
  price?: number;
}

const API_URL = "https://closet-recruiting-api.azurewebsites.net/api/data";

export const fetchContents = async (): Promise<ContentItem[]> =>
  (await axios.get(API_URL)).data;
