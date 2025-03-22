import '@testing-library/jest-dom';

// Mock CSS modules
jest.mock('./src/__mocks__/styleMock.js', () => ({}), { virtual: true });
jest.mock('leaflet/dist/leaflet.css', () => ({}), { virtual: true });
jest.mock('\\.css$', () => ({}), { virtual: true });

// Mock react-leaflet
jest.mock('react-leaflet', () => ({
  MapContainer: ({ children }) => <div data-testid="map-container">{children}</div>,
  TileLayer: () => <div data-testid="tile-layer" />,
  Marker: ({ children }) => <div data-testid="marker">{children}</div>,
  Popup: ({ children }) => <div data-testid="popup">{children}</div>,
  useMap: jest.fn(),
  useMapEvent: jest.fn(),
  useMapEvents: jest.fn()
}));

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock IntersectionObserver
class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: MockIntersectionObserver,
});

// Mock Leaflet
jest.mock('leaflet', () => ({
  icon: jest.fn(),
  marker: jest.fn(() => ({
    setLatLng: jest.fn(),
    setIcon: jest.fn(),
    addTo: jest.fn(),
    bindPopup: jest.fn(),
  })),
  map: jest.fn(() => ({
    setView: jest.fn(),
    remove: jest.fn(),
  })),
  tileLayer: jest.fn(() => ({
    addTo: jest.fn(),
  })),
})); 