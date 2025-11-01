declare module 'recharts' {
  import { ReactNode, SVGProps, ComponentType } from 'react';

  export interface LabelListProps<T = any> {
    formatter?: (value: any, entry?: T, index?: number) => ReactNode;
    dataKey?: string;
    position?: string;
    fill?: string;
    offset?: number;
    [key: string]: any;
  }

  export interface LabelProps extends SVGProps<SVGTextElement> {
    formatter?: (value: any) => ReactNode;
    [key: string]: any;
  }

  export const Bar: ComponentType<any>;
  export const BarChart: ComponentType<any>;
  export const CartesianGrid: ComponentType<any>;
  export const XAxis: ComponentType<any>;
  export const YAxis: ComponentType<any>;
  export const LabelList: ComponentType<LabelListProps>;
  export const ResponsiveContainer: ComponentType<any>;
}