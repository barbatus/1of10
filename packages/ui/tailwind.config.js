const path = require("path");

/** @type {import("tailwindcss").Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    path.join(
      __dirname,
      "src/**/*.{js,jsx,ts,tsx}"
    ),
  ],
  theme: {
  	extend: {
  		borderRadius: {
  			lg: "var(--radius)",
  			md: "calc(var(--radius) - 2px)",
  			sm: "calc(var(--radius) - 4px)"
  		},
  		colors: {
  			background: "hsl(var(--background))",
  			foreground: "hsl(var(--foreground))",
  			card: {
  				DEFAULT: "hsl(var(--card))",
  				foreground: "hsl(var(--card-foreground))"
  			},
  			popover: {
  				DEFAULT: "hsl(var(--popover))",
  				foreground: "hsl(var(--popover-foreground))"
  			},
  			primary: {
  				DEFAULT: "hsl(var(--primary))",
  				foreground: "hsl(var(--primary-foreground))"
  			},
  			secondary: {
  				DEFAULT: "hsl(var(--secondary))",
  				foreground: "hsl(var(--secondary-foreground))"
  			},
  			muted: {
  				DEFAULT: "hsl(var(--muted))",
  				foreground: "hsl(var(--muted-foreground))"
  			},
  			accent: {
  				DEFAULT: "hsl(var(--accent))",
  				foreground: "hsl(var(--accent-foreground))"
  			},
  			destructive: {
  				DEFAULT: "hsl(var(--destructive))",
  				foreground: "hsl(var(--destructive-foreground))"
  			},
  			border: "hsl(var(--border))",
  			input: "hsl(var(--input))",
  			ring: "hsl(var(--ring))",
  			chart: {
  				"1": "hsl(var(--chart-1))",
  				"2": "hsl(var(--chart-2))",
  				"3": "hsl(var(--chart-3))",
  				"4": "hsl(var(--chart-4))",
  				"5": "hsl(var(--chart-5))"
  			}
  		},
      keyframes: {
        "list-enter": {
          "0%": { backgroundColor: "rgba(255, 255, 0, 1)" },
          "100%": { backgroundColor: "rgba(255, 255, 0, 0)" },
        },
        "list-exit": {
          "0%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        enter: "list-enter 1s forwards",
        exit: "list-exit 1s forwards",
      },
  	}
  },
  plugins: [require("tailwindcss-animate")],
}
