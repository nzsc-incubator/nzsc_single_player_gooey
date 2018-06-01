#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate nzsc_single_player;
use nzsc_single_player::single_player_game::SinglePlayerNZSCGame;

extern crate nzsc_single_player_text_interface;

use std::str::FromStr;

// Converts a String to an Answer.
fn parse_input(input: String, phase: &nzsc_single_player::single_player_game::Phase) -> nzsc_single_player::io::Answer {
    match phase {
        &nzsc_single_player::single_player_game::Phase::CharacterChoosing {
            human: _,
            computer: _,
        } => {
            let character_selection = if let Ok(selected_human_character) = nzsc_single_player::characters::Character::from_str(&input[..]) {
                nzsc_single_player::io::CharacterSelection::Character(selected_human_character)
            } else {
                nzsc_single_player::io::CharacterSelection::Nonexistent(input)
            };
            nzsc_single_player::io::Answer::CharacterSelection(character_selection)
        },

        &nzsc_single_player::single_player_game::Phase::BoosterChoosing {
            human: _,
            computer: _,
        } => {
            let booster_selection = if let Ok(selected_human_booster) = nzsc_single_player::boosters::Booster::from_str(&input[..]) {
                nzsc_single_player::io::BoosterSelection::Booster(selected_human_booster)
            } else {
                nzsc_single_player::io::BoosterSelection::Nonexistent(input)
            };
            nzsc_single_player::io::Answer::BoosterSelection(booster_selection)
        },

        &nzsc_single_player::single_player_game::Phase::MoveChoosing {
            human: _,
            computer: _,
        } => {
            let move_selection = if let Ok(selected_human_move) = nzsc_single_player::moves::Move::from_str(&input[..]) {
                nzsc_single_player::io::MoveSelection::Move(selected_human_move)
            } else {
                nzsc_single_player::io::MoveSelection::Nonexistent(input)
            };
            nzsc_single_player::io::Answer::MoveSelection(move_selection)
        },
        &nzsc_single_player::single_player_game::Phase::GameOver {
            human_points: _,
            computer_points: _,
        } => panic!("The app is trying to handle input after the game is over."),
    }
}

#[wasm_bindgen]
pub struct SinglePlayerNZSCWebInterface {
    raw_game: SinglePlayerNZSCGame,
}

#[wasm_bindgen]
pub struct OutputWebInterface {
    raw_output: nzsc_single_player::io::Output,
}

#[wasm_bindgen]
impl OutputWebInterface {
    /// Returns the question in string form, or an empty string if there is no question.
    pub fn question(&self) -> String {
        if let Some(ref question) = &self.raw_output.question {
            nzsc_single_player_text_interface::question::to_string(question)
        } else {
            String::new()
        }
    }

    pub fn notifications(&self) -> Vec<String> {
        let mut v = Vec::new();
        for notification in &self.raw_output.notifications {
            let notification_string = nzsc_single_player_text_interface::notification::to_string(notification);
            v.push(notification_string);
        }
        v
    }
}

#[wasm_bindgen]
impl SinglePlayerNZSCWebInterface {
    pub fn new(seed: u32) -> SinglePlayerNZSCWebInterface {
        SinglePlayerNZSCWebInterface {
            raw_game: SinglePlayerNZSCGame::new(seed)
        }
    }

    pub fn initial_output(&self) -> OutputWebInterface {
        OutputWebInterface {
            raw_output: self.raw_game.initial_output(),
        }
    }

    pub fn next(&mut self, input: &str) -> OutputWebInterface {
        let parsed_input = parse_input(input.to_string(), &self.raw_game.phase);
        let output = self.raw_game.next(parsed_input).expect("Phase-answer mismatch!");

        OutputWebInterface {
            raw_output: output,
        }
    }
}
