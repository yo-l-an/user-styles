<?php
declare(strict_types=1);

namespace Sample\Site\Models;

final class Project
{
    public const DEFAULT_LIMIT = 20;

    public function __construct(
        public readonly string $id,
        public string $name,
        public int $size = 0,
        private array $tags = [],
    ) {}

    /** @return self[] */
    public static function recent(int $limit = self::DEFAULT_LIMIT): array
    {
        $rows = Database::query('SELECT * FROM projects ORDER BY created_at DESC LIMIT ?', [$limit]);

        return array_map(
            fn (array $row): self => new self($row['id'], $row['name'], (int) $row['size']),
            $rows,
        );
    }

    public function hasTag(string $tag): bool
    {
        return in_array($tag, $this->tags, true);
    }
}
