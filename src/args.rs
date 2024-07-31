use clap::Parser;

#[derive(Parser, Debug)]
#[command(version)]
pub struct Args {
	#[arg(short, long, default_value_t = String::from("nightly"))]
	pub path: String,
}
