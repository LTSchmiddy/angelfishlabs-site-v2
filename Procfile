release: python build.py -x
web: cd ./dist/ && gunicorn --bind 0.0.0.0:${PORT} flask_app:app