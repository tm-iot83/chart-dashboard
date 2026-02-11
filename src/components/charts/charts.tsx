import { useEffect, useRef, useState } from 'react'
import type { ChartProps } from '../../data/mockChartData'
import { mockChartData } from '../../data/mockChartData'
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

declare global {
  interface Window {
    Chart: any;
  }
}

function Charts({instanceId, widgetId, isEditing}: {instanceId: string, widgetId: number, isEditing: boolean}) {
  const [config, setConfig] = useState<ChartProps>(mockChartData[widgetId]); 
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<any>(null);
  const [chartLoaded, setChartLoaded] = useState(false);

  // Sync config when widgetId changes (e.g. if we add a way to swap widgets)
  useEffect(() => {
    setConfig(mockChartData[widgetId]);
  }, [widgetId]);

  // Load Chart.js UMD
  useEffect(() => {
    const loadChartJS = () => {
      return new Promise((resolve, reject) => {
        if (window.Chart) {
          resolve(window.Chart);
          return;
        }

        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.js";
        script.async = true;
        script.onload = () => {
          if (window.Chart) {
            resolve(window.Chart);
          } else {
            reject(new Error("Chart.js failed to load"));
          }
        };
        script.onerror = () => reject(new Error("Failed to load Chart.js"));
        document.head.appendChild(script);
      });
    };

    loadChartJS()
      .then(() => setChartLoaded(true))
      .catch((err) => console.error("Chart.js loading error:", err));
  }, []);

  // Create/update chart
  useEffect(() => {
    if (!chartLoaded || !canvasRef.current || !config) {
      return;
    }

    // Map chart type
    const getChartType = () => {
      if (config.type === "area") return "line";
      return config.type;
    };

    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext("2d");
    if (ctx) {
      chartInstanceRef.current = new window.Chart(ctx, {
        type: getChartType(),
        data: {
          labels: config.xAxis,
          datasets: [
            {
              label: config.title,
              data: config.yAxis,
              backgroundColor: config.type === "area" 
                ? `${config.hexColor}33` // Add transparency for area
                : config.hexColor,
              borderColor: config.hexColor,
              borderWidth: 2,
              fill: config.type === "area",
              tension: config.type === "line" || config.type === "area" ? 0.4 : 0,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: !!config.title,
              text: config.title,
              font: {
                size: 18,
                weight: "bold",
              },
            },
            legend: {
              display: true,
              position: "top",
            },
            tooltip: {
              enabled: true,
            },
          },
          scales: {
            x: {
              ticks: {
                maxRotation: config.xAxis.length > 10 ? 45 : 0,
                minRotation: config.xAxis.length > 10 ? 45 : 0,
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Value',
              },
            },
          },
        },
      });
    }

    // Cleanup
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartLoaded, config]);

  if (!config) {
    return null;
  }

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({id:instanceId});
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isEditing ? 'grab' : 'default',
  };

  const dragProps = isEditing ? { ...attributes, ...listeners } : {};

  return (
      <div className={`card m-4 ${isEditing ? 'border-dashed border-2 border-blue-400' : ''}`} ref={setNodeRef} style={style} {...dragProps}>
        {isEditing && (
          <div className="absolute top-2 right-2 flex items-center justify-center opacity-50 hover:opacity-100 transition-opacity">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="5" r="1"/><circle cx="9" cy="12" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="19" r="1"/></svg>
          </div>
        )}
        <canvas ref={canvasRef}></canvas>
      </div>
  );
}

export default Charts;