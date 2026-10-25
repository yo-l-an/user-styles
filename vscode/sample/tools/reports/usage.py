"""Monthly usage report for the sample project."""

from __future__ import annotations

import csv
from dataclasses import dataclass, field
from datetime import date
from pathlib import Path

THRESHOLD_MB = 512


@dataclass
class Usage:
    project: str
    month: date
    megabytes: float
    tags: list[str] = field(default_factory=list)

    @property
    def over_limit(self) -> bool:
        return self.megabytes > THRESHOLD_MB


def load(path: Path) -> list[Usage]:
    with path.open(newline="", encoding="utf-8") as handle:
        rows = csv.DictReader(handle)
        return [
            Usage(row["project"], date.fromisoformat(row["month"]), float(row["mb"]))
            for row in rows
            if row.get("mb")
        ]


def main() -> None:
    usages = load(Path("data/usage.csv"))
    heavy = [u for u in usages if u.over_limit]
    print(f"{len(heavy)} of {len(usages)} projects are over {THRESHOLD_MB} MB")


if __name__ == "__main__":
    main()
