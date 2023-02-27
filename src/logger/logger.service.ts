import { ConsoleLogger, Injectable, LogLevel } from '@nestjs/common';
import { createWriteStream, existsSync, mkdirSync, WriteStream } from 'fs';
import { stat } from 'fs/promises';
import { resolve } from 'path';
import 'dotenv/config';

const LOG_LEVEL: Record<number, LogLevel> = {
  0: 'debug',
  1: 'verbose',
  2: 'log',
  3: 'warn',
  4: 'error',
};

@Injectable()
export class LoggerService extends ConsoleLogger {
  private _logFileName: string;
  private _logsDir: string;
  private _logFileSize: number;
  private _queue: string[] = [];
  private _writeStream: WriteStream;
  constructor() {
    super('', {
      logLevels: [LOG_LEVEL[parseInt(process.env.LOG_LEVEL)]],
    });
    this._logsDir = resolve(process.env.LOG_PATH);
    this._createDir();
    this._logFileName = 'log_0.txt';
    this._writeStream = createWriteStream(
      `${this._logsDir}/${this._logFileName}`,
      { flags: 'as' },
    );
    this._logFileSize = parseInt(process.env.LOG_FILE_SIZE_KB);
    this._queue = [];
    this._setInterval();
  }
  error(message: any) {
    this._queue.push(message);
    super.error(message);
  }
  log(message: any, context?: string): void {
    this._queue.push(message);
    super.log(message, context);
  }

  warn(message: any, context?: string): void {
    this._queue.push(message);
    super.warn(message, context);
  }
  debug(message: any, context?: string): void {
    this._queue.push(message);
    super.warn(message, context);
  }

  private _setInterval() {
    setInterval(() => {
      this._writeToFile();
    }, 100);
  }

  private async _writeToFile() {
    if (await this._isFileFull()) {
      this._createNewFile();
    }
    const item = this._queue.shift();
    if (item) {
      this._writeStream.write(item + '\n');
    }
  }

  private async _isFileFull(): Promise<boolean> {
    const fileInfo = await stat(`${this._logsDir}/${this._logFileName}`);
    return fileInfo.size / 1024 >= this._logFileSize;
  }

  private _createNewFile() {
    this._logFileName = `log_${
      parseInt(this._logFileName.split('_')[1]) + 1
    }.txt`;
    this._writeStream.close();
    this._writeStream = createWriteStream(
      `${this._logsDir}/${this._logFileName}`,
      { flags: 'as' },
    );
  }

  private _createDir() {
    if (!existsSync(this._logsDir)) {
      mkdirSync(this._logsDir);
    }
  }
}
