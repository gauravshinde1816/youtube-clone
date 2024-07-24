export default {
  preset: 'ts-jest', // For TypeScript
  testEnvironment: 'jsdom', // Simulates a browser environment
  setupFilesAfterEnv: ['@testing-library/jest-dom'], // Adds convenient DOM assertions 
  transform: {
    '^.+\\.(ts|tsx)$': [
        'ts-jest',
        { 
            // ts-jest configuration options go here
        },
    ],
},
};