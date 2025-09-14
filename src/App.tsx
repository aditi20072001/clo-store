import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentData, applyFilters } from "./features/contentSlice";
import type { RootState, AppDispatch } from "./store";
import StorePage from "./pages/StorePage";

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { status, error } = useSelector((state: RootState) => state.content);

  useEffect(() => {
    dispatch(fetchContentData()).then(() => dispatch(applyFilters()));
  }, [dispatch]);

  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;

  return <StorePage />;
};

export default App;
