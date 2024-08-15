create table "user" (
    "id" UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    "full_name" text not null,
    "phone" text not null unique,
    "password" text not null,
    "thumbnail" text null,
    "created_at" timestamptz default current_timestamp,
    "updated_at" timestamptz null
);