import React, { createContext, useContext } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip as ChartJSTooltip,
  Legend,
  Filler,
  RadialLinearScale,
} from 'chart.js';
import { 
  Chart as ReactChart,
  Line, 
  Bar, 
  Pie, 
  Doughnut, 
  PolarArea, 
  Radar, 
  Bubble,
  Scatter 
} from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  ChartJSTooltip,
  Legend,
  Filler,
  RadialLinearScale
);

// Context for chart tooltip
interface ChartContextType {
  tooltipData: any;
}

const ChartContext = createContext<ChartContextType>({ tooltipData: null });

export function useChartContext() {
  return useContext(ChartContext);
}

// ChartContainer component
interface ChartContainerProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export function ChartContainer({ children, className = '', style }: ChartContainerProps) {
  return (
    <div className={`relative ${className}`} style={style}>
      {children}
    </div>
  );
}

// ChartTooltip component
interface ChartTooltipProps {
  children: (data: any) => React.ReactNode;
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  const { tooltipData } = useChartContext();
  
  if (!tooltipData) return null;
  
  return (
    <div className="absolute bg-background border rounded-md shadow-lg p-3 pointer-events-none">
      {children(tooltipData)}
    </div>
  );
}

// ChartTooltipContent component
interface ChartTooltipContentProps {
  children: React.ReactNode;
  className?: string;
}

export function ChartTooltipContent({ children, className = '' }: ChartTooltipContentProps) {
  return (
    <div className={`text-sm ${className}`}>
      {children}
    </div>
  );
}

// Main Chart component
type ChartType = 
  | 'line' 
  | 'bar' 
  | 'pie' 
  | 'doughnut' 
  | 'polarArea' 
  | 'radar' 
  | 'bubble' 
  | 'scatter';

interface ChartDataset {
  label: string;
  data: number[] | {x: number, y: number}[];
  backgroundColor?: string | string[];
  borderColor?: string | string[];
  borderWidth?: number;
  tension?: number;
  fill?: boolean;
  [key: string]: any;
}

interface ChartData {
  labels?: string[];
  datasets: ChartDataset[];
}

interface ChartOptions {
  responsive?: boolean;
  plugins?: {
    legend?: {
      position?: 'top' | 'bottom' | 'left' | 'right';
    };
    title?: {
      display?: boolean;
      text?: string;
    };
    tooltip?: {
      enabled?: boolean;
      external?: (context: any) => void;
    };
    [key: string]: any;
  };
  scales?: any;
  [key: string]: any;
}

interface ChartProps {
  type: ChartType;
  data: ChartData;
  options?: ChartOptions;
  width?: number | string;
  height?: number | string;
  className?: string;
  style?: React.CSSProperties;
}

const chartComponents = {
  line: Line,
  bar: Bar,
  pie: Pie,
  doughnut: Doughnut,
  polarArea: PolarArea,
  radar: Radar,
  bubble: Bubble,
  scatter: Scatter,
};

export function Chart({
  type,
  data,
  options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      tooltip: {
        enabled: false,
        external: (context) => {
          // This will be handled by our custom tooltip
        },
      },
    },
  },
  width,
  height,
  className,
  style,
}: ChartProps) {
  const [tooltipData, setTooltipData] = React.useState(null);
  
  const customOptions = {
    ...options,
    plugins: {
      ...options?.plugins,
      tooltip: {
        ...options?.plugins?.tooltip,
        enabled: false,
        external: (context: any) => {
          const { tooltip } = context;
          if (tooltip.opacity === 0) {
            setTooltipData(null);
            return;
          }
          
          const data = {
            labels: tooltip.dataPoints.map((dp: any) => dp.dataset.label || ''),
            values: tooltip.dataPoints.map((dp: any) => dp.raw),
            label: tooltip.title[0],
            colors: tooltip.dataPoints.map((dp: any) => dp.dataset.backgroundColor),
          };
          
          setTooltipData(data);
        },
      },
    },
  };

  const ChartComponent = chartComponents[type];

  if (!ChartComponent) {
    console.error(`Invalid chart type: ${type}`);
    return null;
  }

  return (
    <ChartContext.Provider value={{ tooltipData }}>
      <ChartContainer className={className} style={style}>
        <ChartComponent 
          data={data} 
          options={customOptions} 
          width={width}
          height={height}
        />
        <ChartTooltip>
          {(data) => (
            <ChartTooltipContent>
              <div className="font-medium">{data.label}</div>
              {data.labels.map((label: string, i: number) => (
                <div key={i} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: data.colors[i] }}
                  />
                  <span className="mr-2">{label}:</span>
                  <span className="font-semibold">{data.values[i]}</span>
                </div>
              ))}
            </ChartTooltipContent>
          )}
        </ChartTooltip>
      </ChartContainer>
    </ChartContext.Provider>
  );
}

// Example usage:
/*
<ChartContainer className="w-full h-96">
  <Chart
    type="bar"
    data={{
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
      datasets: [
        {
          label: 'Sales 2023',
          data: [12, 19, 3, 5, 2],
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    }}
  />
  <ChartTooltip>
    {(data) => (
      <ChartTooltipContent>
        <div className="font-bold">{data.label}</div>
        {data.labels.map((label, i) => (
          <div key={i} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2" 
              style={{ backgroundColor: data.colors[i] }}
            />
            <span>{label}: {data.values[i]}</span>
          </div>
        ))}
      </ChartTooltipContent>
    )}
  </ChartTooltip>
</ChartContainer>
*/