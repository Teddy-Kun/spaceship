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
	let conf = match Settings::new() {
		Ok(c) => c,
		Err(e) => {
			eprintln!("{e:?}");
			process::exit(1);
		}
	};
	let mut path = conf.index;
	let arg = args::Args::parse();

	if let Some(p) = arg.path {
		path = p;
	}

	if path == "" {
		path = String::from(Settings::default().index);
	}

	rocket::build().mount("/", FileServer::from(path))
}
