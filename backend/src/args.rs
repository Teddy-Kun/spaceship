use clap::Parser;

#[derive(Parser, Debug)]
#[command(version)]
pub struct Args {
	#[arg(short, long)]
	pub path: Option<String>,

	#[arg(short, long)]
	pub reset_config: bool,
}
