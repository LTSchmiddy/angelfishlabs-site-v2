# from __future__ import annotations

import os
import sys

from flask import *
from jinja2 import TemplateNotFound
from utils import *
import utils.anon_func as af

from doc_loaders import *

from settings import current, exec_dir

md_docs = Blueprint(
    'md_docs',
    __name__,
    root_path=exec_dir,
    template_folder=os.path.join(exec_dir, current['flask']['blueprints']['markdown']['template-dir']),
    static_folder=os.path.join(exec_dir, current['flask']['blueprints']['markdown']['static-dir'])
)


@md_docs.route("/docs/<path:md_path>", methods=['POST', 'GET'])
def get_markdown_doc(md_path: str, **kwargs):
    return parseDocument(render_template(md_path))

@md_docs.route("/list/<path:md_path>", methods=['POST', 'GET'])
def get_markdown_doc_list(md_path: str, **kwargs):

    # tree = get_dir_tree(
    #     os.path.join(current['flask']['blueprints']['markdown']['template-dir'], md_path).replace("\\", "/"),
    # )

    retVal = {
        "files":[],
        "dirs": []
    }
    parent_dir = os.path.join(current['flask']['blueprints']['markdown']['template-dir'], md_path).replace("\\", "/")
    for i in os.listdir(parent_dir):
        fullpath = os.path.join(parent_dir, i).replace("\\", "/")

        if os.path.isfile(fullpath):
            retVal["files"].append({
                "name": i,
                "type": "file",
                "path": fullpath
            })
        else:
            retVal["dirs"].append({
                "name": i,
                "type": "dir",
                "path": fullpath
            },)

        print(retVal)

    return retVal