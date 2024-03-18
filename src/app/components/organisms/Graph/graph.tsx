import { useState, useEffect } from "react";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

interface Prefecture {
  prefCode: number;
  prefName: string;
  isSelected: boolean;
}

interface Population {
  message: string | null;
  result: {
    boundaryYear: number;
    data: {
      label: string;
      data: PopulationData[];
    }[];
  };
}

interface PopulationData {
  year: number;
  value: number;
}

interface Series {
  type: string;
  name: string;
  data: Array<number>;
}

const Graph = ({
  isSelected,
  prefectures,
}: {
  isSelected: Array<number>;
  prefectures: Array<Prefecture>;
}) => {
  const [populationData, setPopulationData] = useState<Array<Population>>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const selectedPrefectures = prefectures.filter(
    (prefecture: Prefecture) => isSelected.includes(prefecture.prefCode)
  );

  const series: Array<Series> | any = populationData.map((prefData) => {
    const prefName = selectedPrefectures.find(
      (pref) =>
        pref.prefCode.toString() === prefData.result.data[0]?.label || ""
    )?.prefName;
    const values = prefData.result.data.flatMap((data) =>
      data.data.map((item) => item.value)
    );
    return {
      type: "line",
      name: prefName || "",
      data: values,
    };
  });

  useEffect(() => {
    const fetchPopulationData = async () => {
      try {
        const promises = isSelected.map((prefCode) =>
          fetch(`/api/population?prefCode=${prefCode}`).then((res) =>
            res.json()
          )
        );
        const data = await Promise.all(promises);
        setPopulationData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching population data:", error);
        setIsLoading(false);
      }
    };
    fetchPopulationData();
  }, [isSelected]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (populationData.some((data) => !data || !data.result.data)) {
    return <div>No data available</div>;
  }

  const graphOptions = {
    title: {
      text: "都道府県別人口推移",
    },
    yAxis: {
      title: {
        text: "人口(人)",
      },
    },
    xAxis: {
      title: {
        text: "年度(年度)",
      },
    },
    series: series,
  };

  return (
    <div className="graph">
      <HighchartsReact highcharts={Highcharts} options={graphOptions} />
    </div>
  );
};

export default Graph;