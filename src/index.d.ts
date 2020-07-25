/// <reference types="node" />
import stream = require('stream');
interface IStreamOptions {
    highWaterMark?: number;
    encoding?: BufferEncoding;
}
export declare function createReadStream(data: Buffer | string | {}, options?: IStreamOptions): MultiStream;
declare class MultiStream extends stream.Readable {
    _data: Buffer | string | {} | null;
    constructor(data: Buffer | string | {}, options?: IStreamOptions);
    _read(): void;
}
export {};
