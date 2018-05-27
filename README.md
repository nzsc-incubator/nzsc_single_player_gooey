# nzsc_single_player_web
Play NZSC in your browser against the computer!

Click [here](https://nzsc-org.github.io/nzsc_single_player_web) to play the finished product.

If you already know how to play NZSC, you're good to go. Otherwise, read [the handbook](https://nzsc-org.github.io/nzsc_handbook/book/).

## Query-string flags
You can optionally pass in flags to the web app via the query-string (e.g., `https://nzsc-org.github.io/nzsc_single_player_web?disable_autofocus&seed=0xbada55`)

| flag | values | examples | description | default behavior
| --- | --- | --- | --- | --- |
| `seed` | a u32 number | `seed=42` `seed=0xbada55` `seed=0b101011` | If you want a non-random game, you can force the seed to be a certain value. This is useful when you need a reproducible game (e.g., if your writing a tutorial and want to create a specific game for your users to play). | If you don't pass in an override seed, a random seed will be created at the start of the game. |
| `disable_autofocus` | nothing or "true" | `disable_autofocus` `disable_autofocus=true` | By default, when you click anywhere on the terminal, the input will be focused. This means you can't perform certain actions such as highlighting text. This flag disables this "autofocus". | If you don't pass in this flag, autofocus will remain enabled. |
