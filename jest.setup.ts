import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill fetch and Response for Firebase
global.fetch = jest.fn();
global.Response = class Response {
  constructor(public body: never, public init?: ResponseInit) {}
} as never;

// Mock import.meta.env for Vite
jest.mock('./src/utils/constants', () => ({
  LOGO: 'https://test-logo.png',
  USER_AVATAR: 'https://test-avatar.png',
  API_OPTIONS: { method: 'GET', headers: {} },
  IMAGE_CDN_URL: 'https://test-cdn.com/',
  BG_URL: 'https://test-bg.jpg',
  SUPPORTED_LANGUAGES: [{ value: 'english', flag: '🇺🇸', name: 'English' }],
}));

// Mock Firebase
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
  signInWithEmailAndPassword: jest.fn(),
  createUserWithEmailAndPassword: jest.fn(),
  signOut: jest.fn(),
  onAuthStateChanged: jest.fn(() => jest.fn()),
  updateProfile: jest.fn(),
}));

jest.mock('./src/utils/firebase', () => ({
  auth: {},
}));