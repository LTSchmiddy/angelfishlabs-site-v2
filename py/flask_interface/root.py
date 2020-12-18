import os
import sys

from flask import *
from jinja2 import TemplateNotFound

from settings import current, exec_dir


root = Blueprint(
    'root',
    __name__,
    root_path=exec_dir,
    template_folder=os.path.join(exec_dir, current['flask']['blueprints']['root']['template-dir']),
    static_folder=os.path.join(exec_dir, current['flask']['blueprints']['root']['static-dir'])
)

@root.route("/")
def index():
    return render_template("index.html")
