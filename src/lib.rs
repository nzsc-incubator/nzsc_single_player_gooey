#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate nzsc_single_player;
use nzsc_single_player::single_player_game::SinglePlayerNZSCGame;
use nzsc_single_player::command_line_app::CommandLineApp;

#[wasm_bindgen]
pub extern fn add_one(n: u32) -> u32 {
    n + 1
}

#[wasm_bindgen]
pub struct SinglePlayerNZSCWebInterface {
    game: SinglePlayerNZSCGame,
}

#[wasm_bindgen]
impl SinglePlayerNZSCWebInterface {
    pub fn new(seed_high: i32, seed_low: i32) -> SinglePlayerNZSCWebInterface {
        let seed_high = seed_high as i64;
        let seed_low = seed_low as i64;
        let full_seed = (seed_high << 32) | seed_low;
        SinglePlayerNZSCWebInterface {
            game: SinglePlayerNZSCGame::new(full_seed)
        }
    }

    pub fn initial_prompt(&self) -> String {
        self.game.initial_prompt()
    }

    pub fn next(&mut self, response: &str) -> String {
        let prompt = self.game.next(response.to_string());
        prompt.text
    }
}
