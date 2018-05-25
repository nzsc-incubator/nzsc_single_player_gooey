/* tslint:disable */
import * as wasm from './nzsc_single_player_web_bg';

export function add_one(arg0) {
    return wasm.add_one(arg0);
}

const TextDecoder = typeof self === 'object' && self.TextDecoder
    ? self.TextDecoder
    : require('util').TextDecoder;

let cachedDecoder = new TextDecoder('utf-8');

let cachegetUint8Memory = null;
function getUint8Memory() {
    if (cachegetUint8Memory === null ||
        cachegetUint8Memory.buffer !== wasm.memory.buffer)
        cachegetUint8Memory = new Uint8Array(wasm.memory.buffer);
    return cachegetUint8Memory;
}

function getStringFromWasm(ptr, len) {
    return cachedDecoder.decode(getUint8Memory().subarray(ptr, ptr + len));
}

let cachedGlobalArgumentPtr = null;
function globalArgumentPtr() {
    if (cachedGlobalArgumentPtr === null)
        cachedGlobalArgumentPtr = wasm.__wbindgen_global_argument_ptr();
    return cachedGlobalArgumentPtr;
}

let cachegetUint32Memory = null;
function getUint32Memory() {
    if (cachegetUint32Memory === null ||
        cachegetUint32Memory.buffer !== wasm.memory.buffer)
        cachegetUint32Memory = new Uint32Array(wasm.memory.buffer);
    return cachegetUint32Memory;
}

const TextEncoder = typeof self === 'object' && self.TextEncoder
    ? self.TextEncoder
    : require('util').TextEncoder;

let cachedEncoder = new TextEncoder('utf-8');

function passStringToWasm(arg) {

    const buf = cachedEncoder.encode(arg);
    const ptr = wasm.__wbindgen_malloc(buf.length);
    getUint8Memory().set(buf, ptr);
    return [ptr, buf.length];
}

export class SinglePlayerNZSCWebInterface {

                static __construct(ptr) {
                    return new SinglePlayerNZSCWebInterface(ptr);
                }

                constructor(ptr) {
                    this.ptr = ptr;
                }

            free() {
                const ptr = this.ptr;
                this.ptr = 0;
                wasm.__wbg_singleplayernzscwebinterface_free(ptr);
            }
        static new(arg0) {
    return SinglePlayerNZSCWebInterface.__construct(wasm.singleplayernzscwebinterface_new(arg0));
}
initial_prompt() {
    const retptr = globalArgumentPtr();
    wasm.singleplayernzscwebinterface_initial_prompt(retptr, this.ptr);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len);
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
}
next(arg0) {
    const [ptr0, len0] = passStringToWasm(arg0);
    try {
        return PromptWebInterface.__construct(wasm.singleplayernzscwebinterface_next(this.ptr, ptr0, len0));
    } finally {
        wasm.__wbindgen_free(ptr0, len0 * 1);
    }
}
}

export class PromptWebInterface {

                static __construct(ptr) {
                    return new PromptWebInterface(ptr);
                }

                constructor(ptr) {
                    this.ptr = ptr;
                }

            free() {
                const ptr = this.ptr;
                this.ptr = 0;
                wasm.__wbg_promptwebinterface_free(ptr);
            }
        text() {
    const retptr = globalArgumentPtr();
    wasm.promptwebinterface_text(retptr, this.ptr);
    const mem = getUint32Memory();
    const ptr = mem[retptr / 4];
    const len = mem[retptr / 4 + 1];
    const realRet = getStringFromWasm(ptr, len);
    wasm.__wbindgen_free(ptr, len * 1);
    return realRet;
}
is_final() {
    return (wasm.promptwebinterface_is_final(this.ptr)) !== 0;
}
}

export function __wbindgen_throw(ptr, len) {
    throw new Error(getStringFromWasm(ptr, len));
}

