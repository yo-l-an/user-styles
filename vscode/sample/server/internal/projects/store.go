package projects

import (
	"errors"
	"sync"
)

// ErrNotFound is returned when a project does not exist.
var ErrNotFound = errors.New("project not found")

type Status int

const (
	Draft Status = iota
	Published
	Archived
)

type Project struct {
	ID     string   `json:"id"`
	Name   string   `json:"name"`
	Size   int64    `json:"size"`
	Tags   []string `json:"tags,omitempty"`
	Status Status   `json:"status"`
}

type Store struct {
	mu    sync.RWMutex
	items map[string]Project
}

func NewStore() *Store {
	return &Store{items: make(map[string]Project)}
}

func (s *Store) Get(id string) (Project, error) {
	s.mu.RLock()
	defer s.mu.RUnlock()

	p, ok := s.items[id]
	if !ok {
		return Project{}, ErrNotFound
	}
	return p, nil
}

func (s *Store) Put(p Project) {
	s.mu.Lock()
	s.items[p.ID] = p
	s.mu.Unlock()
}
