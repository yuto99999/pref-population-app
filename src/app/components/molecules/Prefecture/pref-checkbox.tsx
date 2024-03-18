import { useState } from "react";
import "./pref-checkbox.css";
import Graph from "../../organisms/Graph/graph";

interface Prefecture {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
}

export default function PrefCheckbox({
  prefectures,
  setPrefectures,
}: {
  prefectures: Array<Prefecture>;
  setPrefectures: any;
}) {
  const [isSelected, setIsSelected] = useState<number[]>([]);

  const handleCheckSelect = (prefCode: number) => {
    setPrefectures((prevPrefectures: any[]) =>
      prevPrefectures.map((prefecture) =>
        prefecture.prefCode === prefCode
          ? { ...prefecture, isSelected: !prefecture.isSelected }
          : prefecture
      )
    );
    setIsSelected((prevSelectedPrefectures) =>
      prevSelectedPrefectures.includes(prefCode)
        ? prevSelectedPrefectures.filter((code) => code !== prefCode)
        : [...prevSelectedPrefectures, prefCode]
    );
  };

  return (
    <div className="pref-box">
      <h2>都道府県を選択してください</h2>
      <ul className="pref-list">
        {prefectures.map((pref) => (
          <li className="pref-item" key={pref.prefCode}>
            <input
              type="checkbox"
              id={`pref-${pref.prefCode}`}
              checked={isSelected.includes(pref.prefCode)}
              onChange={() => handleCheckSelect(pref.prefCode)}
            />
            <label htmlFor={`pref-${pref.prefCode}`}>{pref.prefName}</label>
          </li>
        ))}
      </ul>
      <p>選択された都道府県コード: {isSelected.join(", ")}</p>
      <Graph isSelected={isSelected} prefectures={prefectures} />
    </div>
  );
}