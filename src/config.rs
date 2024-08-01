use config::{builder::DefaultState, ConfigBuilder, Environment, File as CfgFile, FileFormat};
use serde::{Deserialize, Serialize};
use std::{fs::File, io::Write, path::PathBuf};

use crate::err::ErrorTrace;

#[derive(Debug, Deserialize, Serialize)]
pub struct Settings {
	pub index: String,
}

impl Default for Settings {
	fn default() -> Self {
		Settings {
			index: String::from("nightly"),
		}
	}
}

impl Settings {
	fn get_path() -> Result<PathBuf, ErrorTrace> {
		let xdg_dirs = xdg::BaseDirectories::with_prefix("spaceship")?;
		Ok(xdg_dirs.place_config_file("config.toml")?)
	}

	fn read_toml() -> Result<Self, ErrorTrace> {
		let path = Self::get_path()?;
		let path_str = path.to_str().unwrap();

		let builder: ConfigBuilder<DefaultState> = ConfigBuilder::default();
		let cfg: Settings = builder
			.add_source(CfgFile::new(path_str, FileFormat::Toml))
			.add_source(Environment::with_prefix("SPACESHIP"))
			.build()?
			.try_deserialize()?;

		Ok(cfg)
	}

	pub fn create_file(path: PathBuf) -> Result<Self, ErrorTrace> {
		let me = Settings::default();
		let t = toml::to_string(&me)?;

		let mut file = File::create_new(&path)?;
		file.write_all(t.as_bytes())?;

		Ok(me)
	}

	pub fn new() -> Result<Self, ErrorTrace> {
		let cfg_path = Self::get_path()?;
		if !cfg_path.is_file() {
			return Self::create_file(cfg_path);
		}

		Self::read_toml()
	}
}
