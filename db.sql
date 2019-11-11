
CREATE TABLE IF NOT EXISTS public.user (
 firebaseID varchar PRIMARY key  ,
  firstname varchar,
  lastname varchar,
  created_at timestamp default now()
);

CREATE TABLE IF NOT EXISTS public.tweets (
  id SERIAL PRIMARY key ,
  user_id varchar,
  post varchar(140),
  created_at timestamp default now()
);

ALTER TABLE public.tweets
ADD CONSTRAINT fk_tweet_user_id FOREIGN KEY (user_id) REFERENCES public.user (firebaseID);

CREATE TABLE IF NOT EXISTS public.followers (
  id  varchar PRIMARY key ,
  followers varchar[],
  updated_at timestamp default now()
 
);

ALTER TABLE public.followers
ADD CONSTRAINT fk_follower_user_id FOREIGN KEY (id) REFERENCES public.user (firebaseID);