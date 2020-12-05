import os
import sys

from flask import *
from jinja2 import TemplateNotFound

from settings import current, exec_dir

react_site = Blueprint(
    'react_site',
    __name__,
    root_path=exec_dir,
    template_folder=os.path.join(exec_dir, current['flask']['blueprints']['react']['template-dir']),
    static_folder=os.path.join(exec_dir, current['flask']['blueprints']['react']['static-dir']),
    static_url_path="/"
)
# A bit of an odd choice, But Flask should be serving all of components for the React app statically.
# There shouldn't be any other routes in this blueprint. So it make sense to serve the static assets at
# blueprint root.
