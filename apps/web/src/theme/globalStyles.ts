// Global styles injected via JavaScript
export function injectAppGlobalStyles() {
  const style = document.createElement('style')
  style.textContent = `
    /* Font faces */
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('./fonts/Poppins-latin-ext-v20.woff2') format('woff2');
      unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
        U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
    }
    
    @font-face {
      font-family: 'Poppins';
      font-style: normal;
      font-weight: 400;
      font-display: swap;
      src: url('./fonts/Poppins-latin-v20.woff2') format('woff2');
      unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
        U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122, U+2191,
        U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
    }

    /* Base HTML styles */
    html {
      scroll-behavior: smooth;
    }

    /* Layout variables */
    :root {
      --Header-height: 52px;
      --Sidebar-width: 220px;
    }

    @media (min-width: 900px) {
      :root {
        --Header-height: 0px;
      }
    }

    @media (min-width: 1200px) {
      :root {
        --Sidebar-width: 240px;
      }
    }

    /* Theme variables - Orange theme */
    :root {
      --background: 0 0% 100%;
      --foreground: 20 14.3% 4.1%;

      --card: 0 0% 100%;
      --card-foreground: 20 14.3% 4.1%;

      --popover: 0 0% 100%;
      --popover-foreground: 20 14.3% 4.1%;

      --primary: 24.6 95% 53.1%;
      --primary-foreground: 60 9.1% 97.8%;

      --secondary: 60 4.8% 95.9%;
      --secondary-foreground: 24 9.8% 10%;

      --muted: 60 4.8% 95.9%;
      --muted-foreground: 25 5.3% 44.7%;

      --accent: 60 4.8% 95.9%;
      --accent-foreground: 24 9.8% 10%;

      --destructive: 0 84.2% 60.2%;
      --destructive-foreground: 60 9.1% 97.8%;

      --border: 20 5.9% 90%;
      --input: 20 5.9% 90%;
      --ring: 24.6 95% 53.1%;
      --radius: 0.5rem;
    }

    .dark {
      --background: 20 14.3% 4.1%;
      --foreground: 60 9.1% 97.8%;

      --card: 24 9.8% 8%;
      --card-foreground: 0 0% 95%;

      --popover: 20 14.3% 4.1%;
      --popover-foreground: 60 9.1% 97.8%;

      --primary: 20.5 90.2% 48.2%;
      --primary-foreground: 60 9.1% 97.8%;

      --secondary: 12 6.5% 15.1%;
      --secondary-foreground: 60 9.1% 97.8%;

      --muted: 12 6.5% 15.1%;
      --muted-foreground: 24 5.4% 63.9%;

      --accent: 12 6.5% 15.1%;
      --accent-foreground: 60 9.1% 97.8%;

      --destructive: 0 72.2% 50.6%;
      --destructive-foreground: 60 9.1% 97.8%;

      --border: 12 6.5% 15.1%;
      --input: 12 6.5% 15.1%;
      --ring: 20.5 90.2% 48.2%;
    }

    /* Utility classes */
    .shadow-light {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.085);
    }

    .shadow-dark {
      box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.141);
    }

    /* Base element styles */
    * {
      border-color: hsl(var(--border));
    }

    body {
      margin: 0;
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
    }
  `
  document.head.appendChild(style)
}
