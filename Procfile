release: python build.py
web: cd ./dist/cython_build && gunicorn --bind 0.0.0.0:${PORT} flask_app:app