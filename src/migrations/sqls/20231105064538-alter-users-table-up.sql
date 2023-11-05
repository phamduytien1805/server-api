CREATE TABLE users(
	id 			BIGINT PRIMARY KEY,
	created_at 	timestamptz NOT NULL DEFAULT (now()),
	updated_at 	timestamptz NOT NULL DEFAULT (now()),
	state 		SMALLINT NOT NULL DEFAULT 0,
	state_at 	timestamptz,
	last_seen 	timestamptz,
	user_agent 	VARCHAR(255) DEFAULT ''
);

CREATE INDEX users_state_stateat ON users (state, state_at);	
CREATE INDEX users_lastseen_updatedat ON users (last_seen, updated_at);