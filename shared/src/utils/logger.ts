// Logger utility for consistent logging across the application

type LogLevel = 'debug' | 'info' | 'warn' | 'error';

class Logger {
  private isDevelopment: boolean;

  constructor() {
    this.isDevelopment = process.env.NODE_ENV === 'development';
  }

  private formatMessage(level: LogLevel, args: unknown[]): unknown[] {
    const timestamp = new Date().toISOString();
    const prefix = `[${timestamp}] ${level.toUpperCase()}:`;
    return [prefix, ...args];
  }

  private shouldLog(level: LogLevel): boolean {
    // In production, only log warnings and errors
    if (!this.isDevelopment && (level === 'debug' || level === 'info')) {
      return false;
    }
    return true;
  }

  debug(...args: unknown[]): void {
    if (!this.shouldLog('debug')) return;
    // eslint-disable-next-line no-console
    console.debug(...this.formatMessage('debug', args));
  }

  info(...args: unknown[]): void {
    if (!this.shouldLog('info')) return;
    // eslint-disable-next-line no-console
    console.info(...this.formatMessage('info', args));
  }

  warn(...args: unknown[]): void {
    if (!this.shouldLog('warn')) return;
    // eslint-disable-next-line no-console
    console.warn(...this.formatMessage('warn', args));
  }

  error(...args: unknown[]): void {
    if (!this.shouldLog('error')) return;
    // eslint-disable-next-line no-console
    console.error(...this.formatMessage('error', args));
  }

  log(...args: unknown[]): void {
    // Alias for info to match console.log behavior
    this.info(...args);
  }

  // Convenience methods for common use cases
  apiRequest(method: string, url: string, duration?: number): void {
    this.info(`API ${method.toUpperCase()} ${url}`, {
      duration: duration ? `${duration}ms` : undefined,
    });
  }

  apiError(method: string, url: string, error: Error | unknown): void {
    this.error(`API ${method.toUpperCase()} ${url} failed`, error);
  }

  auth(message: string, ...args: unknown[]): void {
    this.info(`Auth: ${message}`, ...args);
  }

  upload(
    fileName: string,
    status: 'start' | 'success' | 'error',
    ...args: unknown[]
  ): void {
    const level = status === 'error' ? 'error' : 'info';
    this[level](`File upload ${status}: ${fileName}`, ...args);
  }
}

// Export singleton instance
export const logger = new Logger();

// Export class for testing
export { Logger };
