#![feature(proc_macro, wasm_custom_section, wasm_import_module)]
extern crate wasm_bindgen;
use wasm_bindgen::prelude::*;

extern crate nzsc_single_player;
use nzsc_single_player::single_player_game::SinglePlayerNZSCGame;

extern crate nzsc_single_player_json_interface;

use std::str;
use std::str::FromStr;

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

// You can't pass Vec<String> to JS with wasm_bindgen, so we have to use a hack like this.
// Takes something like vec!["foo", "baz"] and outputs '["foo","baz"]'
// Note: this function only escapes doublequotes and newlines.
fn to_json_array(string_vec: Vec<String>) -> String {
    let mut s = "[".to_string();
    for string in &string_vec {
        s.push_str(string);
        s.push_str(",");
    }

    if string_vec.len() > 0 {
        // Remove trailing comma.
        // We must only do this if vec.len() > 0 because if vec.len() == 0, we will remove the "[".
        s.pop();
    }

    s.push_str("]");
    s
}

#[wasm_bindgen]
pub struct SinglePlayerNZSCWebInterface {
    game: SinglePlayerNZSCGame,
}

#[wasm_bindgen]
pub struct OutputWebInterface {
    notifications: String,
    question: String,
}

impl OutputWebInterface {
    pub fn from_output(output: nzsc_single_player::io::Output) -> OutputWebInterface {
        let notifications = OutputWebInterface::notification_vec_to_string(output.notifications);
        let question = OutputWebInterface::opt_question_to_string(output.question);

        OutputWebInterface {
            notifications,
            question,
        }
    }
}

#[wasm_bindgen]
impl OutputWebInterface {
    fn notification_vec_to_string(notification_vec: Vec<nzsc_single_player::io::Notification>) -> String {
        let mut v = Vec::new();

        for notification in &notification_vec {
            let notification_string = nzsc_single_player_json_interface::notification::to_json_string(notification);
            v.push(notification_string);
        }

        to_json_array(v)
    }

    // Returns an '{"type":"DONE"}' if self.question is None
    fn opt_question_to_string(question: Option<nzsc_single_player::io::Question>) -> String {
        if let Some(question) = question {
            nzsc_single_player_json_interface::question::to_json_string(&question)
        } else {
            r#"{"type":"DONE"}"#.to_string()
        }
    }

    pub fn notifications(&self) -> String {
        self.notifications.clone()
    }

    pub fn question(&self) -> String {
        self.question.clone()
    }
}

#[wasm_bindgen]
impl SinglePlayerNZSCWebInterface {
    pub fn new(seed: u32) -> SinglePlayerNZSCWebInterface {
        SinglePlayerNZSCWebInterface {
            game: SinglePlayerNZSCGame::new(seed)
        }
    }

    pub fn initial_output(&self) -> OutputWebInterface {
        let output = self.game.initial_output();
        OutputWebInterface::from_output(output)
    }

    pub fn next(&mut self, input: &str) -> OutputWebInterface {
        let parsed_input = parse_input(input.to_string(), &self.game.phase);
        let output = self.game.next(parsed_input).expect("Phase-answer mismatch!");

        OutputWebInterface::from_output(output)
    }
}
