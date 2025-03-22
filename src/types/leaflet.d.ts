declare module 'leaflet' {
  export interface LatLng {
    lat: number;
    lng: number;
  }

  export type LatLngExpression = LatLng | [number, number] | number[];

  export interface DivIconOptions extends BaseIconOptions {
    html?: string;
    bgPos?: PointExpression;
    iconSize?: PointExpression;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    className?: string;
  }

  export interface BaseIconOptions {
    iconRetinaUrl?: string;
    iconUrl?: string;
    shadowUrl?: string;
    iconSize?: PointExpression;
    iconAnchor?: PointExpression;
    popupAnchor?: PointExpression;
    tooltipAnchor?: PointExpression;
    shadowSize?: PointExpression;
    shadowAnchor?: PointExpression;
    className?: string;
  }

  export class Icon<T extends BaseIconOptions = BaseIconOptions> {
    constructor(options: T);
    static Default: {
      imagePath: string;
      prototype: any;
      mergeOptions(options: BaseIconOptions): void;
    };
  }

  export class DivIcon extends Icon<DivIconOptions> {
    constructor(options?: DivIconOptions);
  }

  export type PointExpression = Point | [number, number] | [number, number, number];

  export class Point {
    constructor(x: number, y: number, round?: boolean);
    x: number;
    y: number;
  }

  export function divIcon(options?: DivIconOptions): DivIcon;
} 