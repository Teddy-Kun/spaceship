build:
    cd frontend && trunk build --release
    cd backend && cargo b -r

run:
    cd frontend && trunk build --release
    cargo r -r --bin spaceship

debug:
    cd frontend && trunk build
    cargo r --bin spaceship
