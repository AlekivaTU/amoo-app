declare module 'react-leaflet' {
  import { FC, ReactNode } from 'react';
  import { LatLngExpression, MapOptions, CircleMarkerOptions, Icon, DivIcon, Map } from 'leaflet';

  interface MapContainerProps extends MapOptions {
    center: LatLngExpression;
    zoom: number;
    style?: React.CSSProperties;
    children?: ReactNode;
    whenCreated?: (map: Map) => void;
  }

  interface TileLayerProps {
    url: string;
    attribution?: string;
  }

  interface MarkerProps {
    position: LatLngExpression;
    icon?: Icon | DivIcon;
    eventHandlers?: {
      [key: string]: (...args: any[]) => void;
    };
    children?: ReactNode;
  }

  interface PopupProps {
    children?: ReactNode;
  }

  interface CircleProps extends CircleMarkerOptions {
    center: LatLngExpression;
    radius: number;
    pathOptions?: {
      color?: string;
      fillColor?: string;
      fillOpacity?: number;
      weight?: number;
    };
  }

  export const MapContainer: FC<MapContainerProps>;
  export const TileLayer: FC<TileLayerProps>;
  export const Marker: FC<MarkerProps>;
  export const Popup: FC<PopupProps>;
  export const Circle: FC<CircleProps>;
} 