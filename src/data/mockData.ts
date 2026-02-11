interface WidgetListProps {
   id:string;
  title: string;
  description: string;
  icon: string;
}

export const WidgetListData: WidgetListProps[] = [
  {
    id: "0",
    title: "Line Chart",
    description:
      "Line chart is a type of chart that displays data as a series of points connected by straight lines.",
    icon: "fa-solid fa-chart-line",
  },
  {
    id: "1",
    title: "Bar Chart",
    description:
      "Bar chart is a type of chart that displays data as a series of points connected by straight lines.",
    icon: "fa-solid fa-chart-bar",
  },
  {
    id: "2",
    title: "Area Chart",
    description:
      "Area chart is a type of chart that displays data as a series of points connected by straight lines.",
    icon: "fa-solid fa-chart-area",
  }
];


