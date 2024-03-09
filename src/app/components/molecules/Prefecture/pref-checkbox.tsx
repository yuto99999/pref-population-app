"use client";
import { useState, useEffect } from "react";
import "./pref-checkbox.css";

interface Prefecture {
  prefCode: number;
  prefName: string;
}

export default function PrefCheckbox() {
  const [prefectures, setPrefectures] = useState<Prefecture[]>([]);
  const [isSelected, setIsSelected] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/prefectures")
      .then((res) => res.json())
      .then((data) => setPrefectures(data));
  }, []);

  const handleCheckSelect = (prefCode: number) => {
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
    </div>
  );
}
