import type { AppProps } from 'next/app';

// Import the global stylesheet from its location in the 'app' directory
import '../app/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;