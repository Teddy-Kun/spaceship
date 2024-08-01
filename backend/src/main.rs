use clap::Parser;
use config::Settings;
use rocket::fs::FileServer;
use std::process;

mod args;
mod config;
mod err;

#[macro_use]
extern crate rocket;

#[launch]
fn rocket() -> _ {
	let args = args::Args::parse();

	let conf = match args.reset_config {
		true => match Settings::reset() {
			Ok(c) => c,
			Err(e) => {
				eprintln!("{e:?}");
				process::exit(1);
			}
		},
		false => match Settings::new() {
			Ok(c) => c,
			Err(e) => {
				eprintln!("{e:?}");
				process::exit(1);
			}
		},
	};

	let mut path = conf.index;

	if let Some(p) = args.path {
		path = p;
	}

	if path == "" {
		path = String::from(Settings::default().index);
	}

	rocket::build().mount("/", FileServer::from(path))
}
