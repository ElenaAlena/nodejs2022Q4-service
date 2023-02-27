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
  private _logAll: WriteLogsToFile;
  private _logError: WriteLogsToFile;

  constructor() {
    super('', {
      logLevels: [LOG_LEVEL[parseInt(process.env.LOG_LEVEL)]],
    });

    this._logAll = new WriteLogsToFile('log');
    this._logError = new WriteLogsToFile('error');

    this._setInterval();
  }
  error(message: any) {
    this._logError.pushToQueue(message);
    this._logAll.pushToQueue(message);
    super.error(message);
  }
  log(message: any, context?: string): void {
    this._logAll.pushToQueue(message);
    super.log(message, context);
  }

  warn(message: any, context?: string): void {
    this._logAll.pushToQueue(message);
    super.warn(message, context);
  }
  debug(message: any, context?: string): void {
    this._logAll.pushToQueue(message);
    super.warn(message, context);
  }

  private _setInterval() {
    setInterval(() => {
      this._logAll.writeToFile();
      this._logError.writeToFile();
    }, 10);
  }
}

class WriteLogsToFile {
  private _logsDir: string;
  private _logFileSize: number;
  private _fileName: string;
  private _queue: string[] = [];
  private _writeStream: WriteStream;
  private _fileIndex = 0;
  constructor(fileName: string) {
    this._logsDir = resolve(process.env.LOG_PATH);
    this._logFileSize = parseInt(process.env.LOG_FILE_SIZE_KB);
    this._fileName = fileName;
    this._createDir();

    this._writeStream = createWriteStream(
      `${this._logsDir}/${this.getFullFileName()}`,
      { flags: 'as' },
    );
  }
  private _createDir() {
    if (!existsSync(this._logsDir)) {
      mkdirSync(this._logsDir);
    }
  }
  private getFullFileName = () => `${this._fileName}_${this._fileIndex}.log`;

  public async writeToFile() {
    const isFull = await this._isFileFull();
    if (isFull) {
      this._createNewFile();
    }
    const item = this._queue.shift();
    if (item) {
      this._writeStream.write(item + '\n');
    }
  }

  public pushToQueue = (message: string) => {
    this._queue.push(message);
  };

  private async _isFileFull(): Promise<boolean> {
    const fileInfo = await stat(`${this._logsDir}/${this.getFullFileName()}`);
    return fileInfo.size / 1024 >= this._logFileSize;
  }

  private _createNewFile() {
    this._fileIndex += 1;

    this._writeStream.close();
    this._writeStream = createWriteStream(
      `${this._logsDir}/${this.getFullFileName()}`,
      { flags: 'as' },
    );
  }
}
