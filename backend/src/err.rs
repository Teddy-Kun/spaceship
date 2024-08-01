use std::{fmt::Debug, process};

use backtrace::Backtrace;

// Universal Error struct.
// Anything that can be converted to string can be converted to this Error.
// If the 'Backtrace' feature is enabled it will also automatically generate and print a Trace when converted to a string.
pub struct ErrorTrace {
	message: String,
	trace: Option<Backtrace>,
}

impl ErrorTrace {
	pub fn new(message: &str) -> ErrorTrace {
		ErrorTrace {
			message: message.to_string(),
			trace: Some(Backtrace::new()),
		}
	}

	#[allow(dead_code)]
	// Creates an Error without a trace
	// If the backtrace features is disabled it is equivalent to new()
	pub fn new_traceless(message: &str) -> ErrorTrace {
		ErrorTrace {
			message: message.to_string(),
			trace: None,
		}
	}

	#[allow(dead_code)]
	pub fn out(&self) {
		eprintln!("{:?}", self);
	}

	#[allow(dead_code)]
	pub fn fatal(&self) {
		self.out();
		process::exit(1);
	}
}

impl<T: ToString> From<T> for ErrorTrace {
	fn from(value: T) -> Self {
		ErrorTrace::new(&value.to_string())
	}
}

impl Debug for ErrorTrace {
	fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
		write!(f, "{}\nStacktrace:\n{:?}", self.message, self.trace)
	}
}
