import sys, os

try:
    from utils import *
    import settings
except:
    from py.utils import *
    from py import settings
from . import *

def process(name: str, fullpath: str, parent_dir: str, info: dict):
    if name.startswith("_"):
        return True

    if not os.path.isfile(fullpath):
        return

    loadFile = open(fullpath, "r")
    fileStr = loadFile.read()
    loadFile.close()

    info.update(parseDocument(fileStr)['info'])


def create_map(path: str = settings.current['flask']['blueprints']['markdown']['template-dir']):
    return get_dir_tree(path, process)