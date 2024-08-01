# Spaceship
## A totally minimal personal homepage

### How to use

```
git clone --recursive https://github.com/Teddy-Kun/spaceship
cd spaceship
```

Next create a Rocket.toml, it needs at least this:

```
[release]
secret_key = "myRandomKeyInBase64"
```

You can generate a key using `openssl rand -base64 32`

Lastly start the server

```
cargo r -r
```

Or if you want to point to a custom site:

```
cargo r -r -- -p "path/to/folder/"
```

or edit the config created at `~/.config/spaceship/config.toml`

A custom frontend is in the works. If you want to test it install `just` and simply run:

```
just dev
```
