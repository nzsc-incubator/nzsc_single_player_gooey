cargo +nightly build --target wasm32-unknown-unknown \
&& wasm-bindgen target/wasm32-unknown-unknown/debug/nzsc_single_player_web.wasm --out-dir ./js \
&& npx webpack

#wasm-gc ./js/nzsc_single_player_web.wasm -o nzsc_single_player_web.gc.wasm

#~/binaryen/bin/wasm-opt -Os nzsc_single_player_web.gc.wasm -o nzsc_single_player_web.gc.opt.wasm
