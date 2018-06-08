cargo +nightly build --target wasm32-unknown-unknown \
&& wasm-bindgen target/wasm32-unknown-unknown/debug/nzsc_single_player_web.wasm --out-dir ./web-src \
&& npx webpack \
&& echo "Warning: build-debug deprecated. Use build-release"
