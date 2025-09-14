import React from "react";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import SearchBarAndFilter from "../components/SearchBarAndFilter";

const StorePage: React.FC = () => {
  const { items } = useSelector((s: RootState) => s.content);
  return (
    <>
      <Header />
      <SearchBarAndFilter items={items} />
    </>
  );
};

export default StorePage;
