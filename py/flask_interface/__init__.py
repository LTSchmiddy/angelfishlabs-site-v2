import os
import textwrap

from flask import Flask, send_from_directory
import markdown2
from logging.config import dictConfig

import settings

dictConfig({
    'version': 1,
    'formatters': {'default': {
        'format': '[%(asctime)s] %(levelname)s in %(module)s: %(message)s',
    }},
    'handlers': {'wsgi': {
        'class': 'logging.StreamHandler',
        # 'stream': 'ext://flask.logging.wsgi_errors_stream',
        'stream': 'ext://sys.stdout',
        'formatter': 'default'
    }},
    'root': {
        'level': 'INFO',
        'handlers': ['wsgi']
    }
})

app = Flask(__name__, root_path=settings.exec_dir)
app.jinja_options['extensions'].append('jinja2.ext.do')

app.config.update(settings.current["flask"]["config"])

from .root import root
from .react_site import react_site

app.register_blueprint(root, url_prefix='/')
app.register_blueprint(react_site, url_prefix='/react/')
