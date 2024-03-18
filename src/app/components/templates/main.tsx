"use client";
import { useEffect, useState } from "react";
import Title from "../organisms/Title/title";
import PrefCheckbox from "../molecules/Prefecture/pref-checkbox";

interface Prefecture {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
}

const Main = () => {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);

  useEffect(() => {
    fetch("/api/prefectures")
      .then((res) => res.json())
      .then((data) =>
        setPrefectures(
          data.map((pref: any) => ({ ...pref, isSelected: false }))
        )
      );
  }, []);

  return (
    <>
      <Title />
      <PrefCheckbox prefectures={prefectures} setPrefectures={setPrefectures} />
    </>
  );
};

export default Main;
