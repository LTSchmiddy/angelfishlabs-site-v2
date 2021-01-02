import os, json
from py.doc_loaders import doc_mapper


docs_path = "docs"

def run(path: str = docs_path):
    doc_map = json.dumps(doc_mapper.create_map(path), indent=4)
    print(f"_map.json = {doc_map}")
    outFile = open(os.path.join(path, "_map.json").replace("\\", "/"), 'w', encoding='utf-8')
    outFile.write(doc_map)
    outFile.close()


if __name__ == '__main__':
    run()