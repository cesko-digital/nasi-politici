#!/bin/sh

gunicorn -w 5 main:app
