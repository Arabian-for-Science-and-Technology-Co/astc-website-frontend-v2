export default () => {
  // runtime flag from import.meta.env — available in client code
  // set NUXT_PUBLIC_SUPPRESS_HYDRATION_WARN=true to enable suppression
  const envFlag = (import.meta as any).env?.NUXT_PUBLIC_SUPPRESS_HYDRATION_WARN === 'true';
  const isProd = (import.meta as any).env?.MODE === 'production' || (import.meta as any).env?.NODE_ENV === 'production';

  const shouldSuppress = envFlag || isProd;
  if (!shouldSuppress) return;

  const origWarn = console.warn.bind(console);
  const origError = console.error.bind(console);

  function shouldSuppressMessage(args: IArguments | any[]) {
    if (!args || args.length === 0) return false;
    const first = args[0];
    return typeof first === 'string' && first.includes('Hydration completed but contains mismatches');
  }

  console.warn = (...args: unknown[]) => {
    if (shouldSuppressMessage(args)) return;
    origWarn(...args);
  };

  console.error = (...args: unknown[]) => {
    if (shouldSuppressMessage(args)) return;
    origError(...args);
  };
};
