cargo +nightly build --release --target wasm32-unknown-unknown \
&& wasm-bindgen target/wasm32-unknown-unknown/release/nzsc_single_player_web.wasm --out-dir ./web-src \
&& npx webpack
