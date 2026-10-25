APP     := sample
VERSION ?= $(shell git describe --tags --always)
BIN_DIR  = bin

.PHONY: all build test clean

all: build

build: $(BIN_DIR)/$(APP)

$(BIN_DIR)/$(APP): $(wildcard server/**/*.go)
	@mkdir -p $(BIN_DIR)
	cd server && go build -o ../$@ ./cmd/app

test:
	cd server && go test ./... -count=1

clean:
	rm -rf $(BIN_DIR)

# prints a variable: make print-VERSION
print-%:
	@echo $* = $($*)
