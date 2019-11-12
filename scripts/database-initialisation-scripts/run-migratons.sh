#!/bin/bash

for f in /migrations/*.sql; do
  echo "$0: running $f"
  "${psql[@]}" -f "$f"
done
