#!/usr/bin/env bash
set -euo pipefail

ENVIRONMENT="${1:-staging}"
TAG="$(git rev-parse --short HEAD)"
HOSTS=(web-1 web-2)

log() {
  printf '[%s] %s\n' "$(date +%H:%M:%S)" "$*"
}

if [[ "$ENVIRONMENT" != "staging" && "$ENVIRONMENT" != "production" ]]; then
  echo "unknown environment: $ENVIRONMENT" >&2
  exit 1
fi

log "building sample:${TAG}"
docker build --build-arg VERSION="$TAG" -t "sample:${TAG}" .

for host in "${HOSTS[@]}"; do
  log "deploying to ${host}"
  ssh "deploy@${host}" "docker pull sample:${TAG} && docker restart sample" || {
    log "failed on ${host}"
    exit 2
  }
done

log "done ($(( SECONDS / 60 ))m $(( SECONDS % 60 ))s)"
