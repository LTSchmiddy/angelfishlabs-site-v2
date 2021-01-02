import json

def info_defaults() -> dict:
    return {
        'title': "No Title",
        'format': "markdown",
        'sort-order': -1,
        'og:img': None,
    }


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
