/** @type {import('tailwindcss').Config} */
export default {
    darkMode: "class",
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            "colors": {
                "secondary-fixed-dim": "#e1c566",
                "inverse-on-surface": "#eef0ff",
                "on-primary-container": "#758ed4",
                "surface-container": "#fff9d6",
                "on-surface": "#1a1600",
                "surface-container-lowest": "#fffbe6",
                "on-background": "#1a1600",
                "secondary-fixed": "#fee17f",
                "on-tertiary-fixed-variant": "#930015",
                "on-primary": "#ffffff",
                "inverse-surface": "#2d303b",
                "surface-bright": "#ffffff",
                "holiday-bg": "#fef7dc",
                "primary-fixed-dim": "#b3c5ff",
                "outline-variant": "#8a7e55",
                "tertiary-fixed": "#ffdad7",
                "on-primary-fixed": "#001849",
                "on-surface-variant": "#4d4100",
                "surface-tint": "#435c9e",
                "surface": "#fffbe6",
                "on-secondary-fixed-variant": "#564500",
                "primary": "#00113a",
                "on-secondary-container": "#786208",
                "surface-container-highest": "#eadeaa",
                "surface-container-high": "#f5ebb9",
                "secondary": "#715c00",
                "border-muted": "#e6da98",
                "on-secondary-fixed": "#231b00",
                "surface-dim": "#e8dc9c",
                "on-tertiary-fixed": "#410004",
                "inverse-primary": "#b3c5ff",
                "error": "#ba1a1a",
                "tertiary-fixed-dim": "#ffb3ae",
                "on-tertiary": "#ffffff",
                "primary-fixed": "#dae1ff",
                "on-error-container": "#93000a",
                "tertiary": "#330003",
                "on-error": "#ffffff",
                "surface-container-low": "#fffdef",
                "primary-container": "#002465",
                "secondary-container": "#fee17f",
                "surface-variant": "#eadeaa",
                "background": "#fffbe6",
                "accent-red": "#CE1126",
                "on-secondary": "#ffffff",
                "on-tertiary-container": "#ff5151",
                "outline": "#716335",
                "on-primary-fixed-variant": "#294484",
                "error-container": "#ffdad6",
                "tertiary-container": "#5a0009",
                "login-bg": "#001233"
            },
            "borderRadius": {
                "DEFAULT": "0.25rem",
                "lg": "0.5rem",
                "xl": "0.75rem",
                "full": "9999px"
            },
            "spacing": {
                "stack-lg": "32px",
                "stack-md": "16px",
                "container-margin": "24px",
                "cell-padding": "12px",
                "stack-sm": "8px",
                "grid-gutter": "12px"
            },
            "fontFamily": {
                "display-lg": ["'Lilita One'", "'Plus Jakarta Sans'", "sans-serif"],
                "headline-md": ["'Plus Jakarta Sans'", "sans-serif"],
                "headline-sm": ["'Plus Jakarta Sans'", "sans-serif"],
                "body-lg": ["'Plus Jakarta Sans'", "sans-serif"],
                "body-md": ["'Plus Jakarta Sans'", "sans-serif"],
                "label-caps": ["'Plus Jakarta Sans'", "sans-serif"],
                "sans": ["'Plus Jakarta Sans'", "system-ui", "-apple-system", "sans-serif"]
            },
            "fontSize": {
                "headline-sm": ["18px", { "lineHeight": "26px", "fontWeight": "600" }],
                "body-lg": ["15px", { "lineHeight": "22px", "fontWeight": "400" }],
                "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                "display-lg": ["36px", { "lineHeight": "44px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.06em", "fontWeight": "600" }],
                "headline-md": ["22px", { "lineHeight": "28px", "fontWeight": "600" }]
            }
        }
    }
}
