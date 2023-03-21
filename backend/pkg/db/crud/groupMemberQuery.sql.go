// Code generated by sqlc. DO NOT EDIT.
// versions:
//   sqlc v1.17.2
// source: groupMemberQuery.sql

package crud

import (
	"context"
)

const createGroupMember = `-- name: CreateGroupMember :one
INSERT INTO group_member (
  user_id, group_id, status_
) VALUES (
  ?, ?, ?
)
RETURNING id, user_id, group_id, status_
`

type CreateGroupMemberParams struct {
	UserID  int64
	GroupID int64
	Status  int64
}

func (q *Queries) CreateGroupMember(ctx context.Context, arg CreateGroupMemberParams) (GroupMember, error) {
	row := q.db.QueryRowContext(ctx, createGroupMember, arg.UserID, arg.GroupID, arg.Status)
	var i GroupMember
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.GroupID,
		&i.Status,
	)
	return i, err
}

const deleteGroupMember = `-- name: DeleteGroupMember :exec
DELETE FROM group_member
WHERE group_id = ? AND user_id = ?
`

type DeleteGroupMemberParams struct {
	GroupID int64
	UserID  int64
}

func (q *Queries) DeleteGroupMember(ctx context.Context, arg DeleteGroupMemberParams) error {
	_, err := q.db.ExecContext(ctx, deleteGroupMember, arg.GroupID, arg.UserID)
	return err
}

const getGroupMembers = `-- name: GetGroupMembers :many
SELECT id, user_id, group_id, status_ FROM group_member
WHERE id = ? AND status_ = ?
`

type GetGroupMembersParams struct {
	ID     int64
	Status int64
}

func (q *Queries) GetGroupMembers(ctx context.Context, arg GetGroupMembersParams) ([]GroupMember, error) {
	rows, err := q.db.QueryContext(ctx, getGroupMembers, arg.ID, arg.Status)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	var items []GroupMember
	for rows.Next() {
		var i GroupMember
		if err := rows.Scan(
			&i.ID,
			&i.UserID,
			&i.GroupID,
			&i.Status,
		); err != nil {
			return nil, err
		}
		items = append(items, i)
	}
	if err := rows.Close(); err != nil {
		return nil, err
	}
	if err := rows.Err(); err != nil {
		return nil, err
	}
	return items, nil
}

const updateGroupMember = `-- name: UpdateGroupMember :one
UPDATE group_member
set status_ = ?
WHERE group_id = ? AND user_id = ?
RETURNING id, user_id, group_id, status_
`

type UpdateGroupMemberParams struct {
	Status  int64
	GroupID int64
	UserID  int64
}

func (q *Queries) UpdateGroupMember(ctx context.Context, arg UpdateGroupMemberParams) (GroupMember, error) {
	row := q.db.QueryRowContext(ctx, updateGroupMember, arg.Status, arg.GroupID, arg.UserID)
	var i GroupMember
	err := row.Scan(
		&i.ID,
		&i.UserID,
		&i.GroupID,
		&i.Status,
	)
	return i, err
}