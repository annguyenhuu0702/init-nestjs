create table "posts" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "title" text not null,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz null
);