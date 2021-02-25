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

    info['name'] = name
    
    if not os.path.isfile(fullpath):
        info['type'] = 'dir'
        return

    loadFile = open(fullpath, "r")
    fileStr = loadFile.read()
    loadFile.close()
    
    info['type'] = 'file'
    info.update(parseDocument(fileStr)['info'])


def create_map(path: str = settings.current['flask']['blueprints']['markdown']['template-dir']):
    return get_dir_tree(path, process)