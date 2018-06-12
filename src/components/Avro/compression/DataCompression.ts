export interface DataCompression<T, K> {
    compress(buffer: T): K;

    decompress(buffer: K): T;
}
