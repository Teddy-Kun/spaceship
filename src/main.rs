use clap::Parser;
use rocket::fs::FileServer;

mod args;

#[macro_use]
extern crate rocket;

#[launch]
fn rocket() -> _ {
	let args = args::Args::parse();

	rocket::build().mount("/", FileServer::from(args.path))
}
