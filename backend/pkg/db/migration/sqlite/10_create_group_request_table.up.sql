CREATE TABLE group_request (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER NOT NULL,
  groupId INTEGER NOT NULL,
  status_ TEXT NOT NULL,
  FOREIGN KEY (userId) REFERENCES user(id),
  FOREIGN KEY (groupId) REFERENCES group_(id)
);
