/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    './src/**/*.{ts,tsx}',
    './index.html',
  ],
  theme: {
    extend: {
      boxShadow: {
        // MD3 Elevation levels
        'md3-0': 'none',
        'md3-1': '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 1px 3px 1px rgba(0, 0, 0, 0.15)',
        'md3-2': '0px 1px 2px 0px rgba(0, 0, 0, 0.30), 0px 2px 6px 2px rgba(0, 0, 0, 0.15)',
        'md3-3': '0px 4px 8px 3px rgba(0, 0, 0, 0.15), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
        'md3-4': '0px 6px 10px 4px rgba(0, 0, 0, 0.15), 0px 2px 3px 0px rgba(0, 0, 0, 0.30)',
        'md3-5': '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px 0px rgba(0, 0, 0, 0.30)',
      },
      borderRadius: {
        // MD3 Shape scale
        'md3-none': '0px',
        'md3-sm': '4px',
        'md3-md': '8px',
        'md3-lg': '16px',
        'md3-xl': '28px',
        'md3-full': '9999px',
      },
      transitionTimingFunction: {
        // MD3 Motion curves
        'md3-standard': 'cubic-bezier(0.2, 0.0, 0, 1.0)',
        'md3-decelerate': 'cubic-bezier(0.0, 0.0, 0, 1.0)',
        'md3-accelerate': 'cubic-bezier(0.3, 0.0, 1, 1.0)',
      },
      transitionDuration: {
        // MD3 Duration tokens
        'md3-short1': '50ms',
        'md3-short2': '100ms',
        'md3-short3': '150ms',
        'md3-short4': '200ms',
        'md3-medium1': '250ms',
        'md3-medium2': '300ms',
        'md3-medium3': '350ms',
        'md3-medium4': '400ms',
        'md3-long1': '450ms',
        'md3-long2': '500ms',
        'md3-long3': '550ms',
        'md3-long4': '600ms',
      },
    },
  },
  plugins: [],
}
