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
                "surface-container": "#ffffff",
                "on-surface": "#181b26",
                "surface-container-lowest": "#ffffff",
                "on-background": "#181b26",
                "secondary-fixed": "#fee17f",
                "on-tertiary-fixed-variant": "#930015",
                "on-primary": "#ffffff",
                "inverse-surface": "#2d303b",
                "surface-bright": "#faf8ff",
                "holiday-bg": "#fef7dc",
                "primary-fixed-dim": "#b3c5ff",
                "outline-variant": "#c5c6d2",
                "tertiary-fixed": "#ffdad7",
                "on-primary-fixed": "#001849",
                "on-surface-variant": "#444650",
                "surface-tint": "#435c9e",
                "surface": "#f8f9ff",
                "on-secondary-fixed-variant": "#564500",
                "primary": "#00113a",
                "on-secondary-container": "#786208",
                "surface-container-highest": "#e0e2f1",
                "surface-container-high": "#e6e7f6",
                "secondary": "#715c00",
                "border-muted": "#d1dbec",
                "on-secondary-fixed": "#231b00",
                "surface-dim": "#d7d9e8",
                "on-tertiary-fixed": "#410004",
                "inverse-primary": "#b3c5ff",
                "error": "#ba1a1a",
                "tertiary-fixed-dim": "#ffb3ae",
                "on-tertiary": "#ffffff",
                "primary-fixed": "#dae1ff",
                "on-error-container": "#93000a",
                "tertiary": "#330003",
                "on-error": "#ffffff",
                "surface-container-low": "#f2f3ff",
                "primary-container": "#002465",
                "secondary-container": "#fee17f",
                "surface-variant": "#e0e2f1",
                "background": "#faf8ff",
                "accent-red": "#CE1126",
                "on-secondary": "#ffffff",
                "on-tertiary-container": "#ff5151",
                "outline": "#757681",
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
                "headline-sm": ["Lilita One"],
                "body-lg": ["Lilita One"],
                "body-md": ["Lilita One"],
                "display-lg": ["Lilita One"],
                "label-caps": ["Lilita One"],
                "headline-md": ["Lilita One"]
            },
            "fontSize": {
                "headline-sm": ["20px", { "lineHeight": "28px", "fontWeight": "600" }],
                "body-lg": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
                "body-md": ["14px", { "lineHeight": "20px", "fontWeight": "400" }],
                "display-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
                "label-caps": ["12px", { "lineHeight": "16px", "letterSpacing": "0.1em", "fontWeight": "500" }],
                "headline-md": ["24px", { "lineHeight": "32px", "fontWeight": "600" }]
            }
        }
    }
}
