import json

def info_defaults() -> dict:
    return {
        'title': "No Title",
        'format': "markdown",
        'sort-order': -1,
        'og:img': None,
    }

def seek_path(node: dict, path_list: list):
        next_path = path_list.pop(0)
        
        if len(path_list) > 0:
            return seek_path(node['dirs'][next_path], path_list)
        
        if next_path in node['dirs'].keys():
            return node['dirs'][next_path]
        
        if next_path in node['files'].keys():
            return node['files'][next_path]
        
        return None

def parseDocument(loaded_doc: str) -> dict:
    retVal = {
        'info': info_defaults(),
        'content': loaded_doc
    }

    if loaded_doc.lstrip().startswith("<!--{"):
        split_point = loaded_doc.lstrip().index("-->")
        json_info = json.loads(loaded_doc.lstrip()[4: split_point])
        retVal['info'].update(json_info)

    return retVal

def parseDocumentFile(doc_path: str) -> dict:
    
    loadFile = open(doc_path, "r")
    fileStr = loadFile.read()
    loadFile.close()

    return parseDocument(fileStr)