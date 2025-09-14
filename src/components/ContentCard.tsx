import React from "react";
import type { ContentItem } from "../api/contentApi";
import { PricingOption } from "../api/contentApi";

const ContentCard: React.FC<{ item: ContentItem }> = ({ item }) => {
  const pricingText =
    item.pricingOption === PricingOption.Free
      ? "FREE"
      : item.pricingOption === PricingOption.ViewOnly
      ? "View Only"
      : `$${item.price ?? 0}`;

  return (
    <div className="card">
      <img src={item.imagePath} alt={item.title} className="thumb" />
      <div className="meta">
        <div className="meta-left">
          <h3 className="title">{item.title}</h3>
          <p className="user">{item.userName || item.creator}</p>
        </div>
        <div className="pricing">{pricingText}</div>
      </div>
    </div>
  );
};

export default ContentCard;
