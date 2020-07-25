'use strict';
import { Stream, TransformCallback } from 'stream';

interface IStreamOptions {
  highWaterMark?: number,
  encoding?: BufferEncoding
}

class Streamifier {
  createReadStream(data: Buffer | string | {}, options: IStreamOptions = {}) {
    if (data instanceof Buffer || typeof data === 'string') {
      return new MultiStream(data, options);
    } else {
      return (new MultiStream(data, options)).pipe(new JSONStringifier());
    }
  };
}

class MultiStream extends Stream.Readable {
  private _data: Buffer | string | {} | null;
  constructor(data: Buffer | string | {}, options: IStreamOptions = {}) {
    if (data instanceof Buffer || typeof data === 'string') {
      super({
        highWaterMark: options.highWaterMark,
        encoding: options.encoding
      });
    } else {
      super({ objectMode: true });
    }
    this._data = data;
  }

  _read() {
    this.push(this._data);
    this._data = null;
  }
}

class JSONStringifier extends Stream.Transform {
  constructor() {
    super({ objectMode: true });
  }

  _transform(obj: {}, encoding: BufferEncoding, callback: TransformCallback) {
    this.push(JSON.stringify(obj));
    callback();
  }
};


export const streamifier = new Streamifier();