<?php
declare(strict_types=1);

namespace Sample\Site;

use Sample\Site\Models\Project;

/** @var Project[] $projects */
$projects = Project::recent(limit: 10);
$title = 'Projects';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <title><?= htmlspecialchars($title) ?></title>
</head>
<body>
  <?php if (empty($projects)): ?>
    <p class="empty">No projects yet.</p>
  <?php else: ?>
    <ul class="projects">
      <?php foreach ($projects as $index => $project): ?>
        <li class="<?= $index % 2 === 0 ? 'even' : 'odd' ?>">
          <a href="/projects/<?= $project->id ?>"><?= htmlspecialchars($project->name) ?></a>
          <span><?= number_format($project->size / 1024, 1) ?> KB</span>
        </li>
      <?php endforeach; ?>
    </ul>
  <?php endif; ?>
</body>
</html>
