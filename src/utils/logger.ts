import moment from 'moment';

type LoggerLevel = 'debug' | 'info' | 'warn' | 'error' | 'log';

const isDev = process.env.NODE_ENV === 'development';

class Logger {
  tag: string;

  level: LoggerLevel;

  constructor(tag: string = 'Log', level: LoggerLevel = 'debug') {
    this.tag = tag;
    this.level = level;
  }

  private generateLog(message: any, lev: LoggerLevel = this.level) {
    return {
      tag: this.tag,
      timestamp: moment().format('YYYY-MM-DD HH:mm:ss'),
      type: lev,
      message,
    };
  }

  debug(message: any) {
    if (isDev) {
      console.log(this.tag, this.generateLog(message, 'debug'));
    }
  }

  info(message: any) {
    if (isDev) {
      console.info(this.tag, this.generateLog(message, 'info'));
    }

    this.debug(message);
  }

  warn(message: any) {
    if (isDev) {
      console.warn(this.tag, this.generateLog(message, 'warn'));
    }

    this.info(message);
  }

  error(message: any) {
    if (isDev) {
      console.error(this.tag, this.generateLog(message, 'error'));
    }

    this.warn(message);
  }

  log(message: any) {
    if (typeof this[this.level] === 'function') {
      this[this.level](message);
    }
  }
}

export default Logger;
