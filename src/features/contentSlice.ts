import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { fetchContents } from "../api/contentApi";
import type { ContentItem, PricingOption } from "../api/contentApi";

interface FilterState {
  pricing: PricingOption[];
  keyword: string;
}

interface ContentState {
  items: ContentItem[];
  filtered: ContentItem[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  filters: FilterState;
}

const initialState: ContentState = {
  items: [],
  filtered: [],
  status: "idle",
  error: null,
  filters: { pricing: [] as PricingOption[], keyword: "" },
};

export const fetchContentData = createAsyncThunk(
  "content/fetch",
  fetchContents
);

const contentSlice = createSlice({
  name: "content",
  initialState,
  reducers: {
    setPricingFilter(state, action: PayloadAction<PricingOption[]>) {
      state.filters.pricing = action.payload;
    },
    setKeyword(state, action: PayloadAction<string>) {
      state.filters.keyword = action.payload;
    },
    applyFilters(state) {
      const { pricing, keyword } = state.filters;
      let filtered = state.items.slice();

      if (pricing.length) {
        filtered = filtered.filter((item) =>
          pricing.includes(item.pricingOption)
        );
      }

      if (keyword) {
        const q = keyword.toLowerCase();
        filtered = filtered.filter(
          (item) =>
            item.title.toLowerCase().includes(q) ||
            item.userName.toLowerCase().includes(q)
        );
      }

      state.filtered = filtered;
    },
    resetFilters(state) {
      state.filters = { pricing: [] as PricingOption[], keyword: "" };
      state.filtered = state.items;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContentData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchContentData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
        state.filtered = action.payload;
      })
      .addCase(fetchContentData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message ?? "Failed to fetch data";
      });
  },
});

export const { setPricingFilter, setKeyword, applyFilters, resetFilters } =
  contentSlice.actions;
export default contentSlice.reducer;
