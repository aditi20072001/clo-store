import React, { useMemo, useState } from "react";
import ContentCard from "./ContentCard";
import { PricingOption as Pricing, type ContentItem } from "../api/contentApi";

type Props = {
  items: ContentItem[];
  showAllWhenEmpty?: boolean;
};

const pricingLabel = (p: number, price?: number) => {
  if (p === Pricing.Free) return "FREE";
  if (p === Pricing.ViewOnly) return "View Only";
  return typeof price === "number" ? `$${price}` : "$0";
};

const SearchBarAndFilter: React.FC<Props> = ({
  items,
  showAllWhenEmpty = true,
}) => {
  const [query, setQuery] = useState("");
  const [pricingFilter, setPricingFilter] = useState<Record<number, boolean>>({
    [Pricing.Paid]: false,
    [Pricing.Free]: false,
    [Pricing.ViewOnly]: false,
  });

  const tokens = useMemo(
    () => query.toLowerCase().trim().split(/\s+/).filter(Boolean),
    [query]
  );

  const filtered = useMemo(() => {
    const activePricing = Object.entries(pricingFilter)
      .filter(([, v]) => v)
      .map(([k]) => Number(k));

    return items.filter((it) => {
      const pricingOk =
        activePricing.length === 0 || activePricing.includes(it.pricingOption);
      if (!pricingOk) return false;

      if (tokens.length === 0) return showAllWhenEmpty;

      const creatorText =
        typeof it.creator === "string" ? (it.creator as string) : "";
      const haystack = [
        it.title,
        it.userName,
        creatorText,
        pricingLabel(it.pricingOption, it.price),
        typeof it.price === "number" ? `$${it.price}` : "",
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return tokens.every((t) => haystack.includes(t));
    });
  }, [items, pricingFilter, tokens, showAllWhenEmpty]);

  const resultLabel =
    query.trim().length === 0 && Object.values(pricingFilter).every((v) => !v)
      ? `${items.length} item${items.length !== 1 ? "s" : ""}`
      : `${filtered.length} result${filtered.length !== 1 ? "s" : ""}`;

  function togglePricing(p: number) {
    setPricingFilter((prev) => ({ ...prev, [p]: !prev[p] }));
  }

  function resetAll() {
    setQuery("");
    setPricingFilter({
      [Pricing.Paid]: false,
      [Pricing.Free]: false,
      [Pricing.ViewOnly]: false,
    });
  }

  return (
    <section className="search-section">
      <div className="toolbar">
        <div className="search-input-wrap">
          <input
            id="store-search"
            type="search"
            placeholder="Find the items you’re looking for"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
            aria-label="Search items"
            className="search-input"
          />
          <svg className="search-icon" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79L20 21.5 21.5 20 15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
          </svg>
        </div>

        <div className="filters">
          <div className="filters__left">
            <span className="filters__label">Pricing Option</span>
            <label className="filters__options">
              <input
                type="checkbox"
                className="filters__option"
                checked={pricingFilter[Pricing.Paid]}
                onChange={() => togglePricing(Pricing.Paid)}
              />
              Paid
            </label>
            <label className="filters__options">
              <input
                type="checkbox"
                className="filters__option"
                checked={pricingFilter[Pricing.Free]}
                onChange={() => togglePricing(Pricing.Free)}
              />
              Free
            </label>
            <label className="filters__options">
              <input
                type="checkbox"
                className="filters__options"
                checked={pricingFilter[Pricing.ViewOnly]}
                onChange={() => togglePricing(Pricing.ViewOnly)}
              />
              View Only
            </label>
          </div>

          <button type="button" className="filters__reset" onClick={resetAll}>
            RESET
          </button>
        </div>

        <p className="result-count" role="status" aria-live="polite">
          {resultLabel}
        </p>
      </div>

      {filtered.length === 0 ? (
        <div className="empty">No items found.</div>
      ) : (
        <div className="grid">
          {filtered.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
};

export default SearchBarAndFilter;
