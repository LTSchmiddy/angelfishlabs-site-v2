# This method in the utils module is gonna be really helpful here:
import sys, os, json, subprocess, shutil

import Cython
from py.utils import get_dir_tree, list_get
from py.utils import anon_func as af

# from src.py import settings
# settings.load_settings()

from distutils.core import setup, Extension
from Cython.Build import *
from Cython.Compiler.Errors import CompileError

python_suffix = ".py"
cython_suffix = ".pyx"
source_dir = "./py"
templates_dir = "./templates"
docs_dir = "./docs"
static_dir = "./static"
out_dir = "./dist"

delete_unneeded_files = True
compile_cython_only = False

platform_extension = af.tget(os.name == 'nt', ".pyd", ".so")

def dist_cythonize(name: str, fullpath: str, parent_dir: str, info: dict):
    if name.endswith(cython_suffix) or (not compile_cython_only and name.endswith(python_suffix)):
        suffix = ".py"
        if name.endswith(cython_suffix):
            suffix+="x"

        filename = classname = name.removesuffix(suffix)
        dst_path = os.path.join(parent_dir, filename)
        
        if classname == "__init__":
            classname = parent_dir.replace("\\", "/").split("/")[-1]

        try:
            compile_cython(classname, fullpath)
            # Moving File:
            outname = list_get(lambda x: x.startswith(classname) and x.endswith(platform_extension), os.listdir("./"))
            print(f"Generated {outname}...")
            dst_path = os.path.join(parent_dir, filename)
            shutil.move(outname, dst_path + platform_extension)
            
            # Rename the source .py file, to avoid confusion on importing:
            if delete_unneeded_files:
                if os.path.isfile(dst_path + suffix): os.remove(dst_path + suffix)
                if os.path.isfile(dst_path + ".c"): os.remove(dst_path + ".c")
            else:
                os.rename(dst_path + suffix, dst_path + ".old_py")
            
        except CompileError as e:
            if os.path.isfile(dst_path + ".c"): os.remove(dst_path + ".c")
            if name.endswith(python_suffix):
                print(e)
                print("Using .py file directly")
            else:
                raise e


def src_cythonize(name: str, fullpath: str, parent_dir: str, info: dict):
    if name.endswith(cython_suffix):
        filename = classname = name.removesuffix(cython_suffix)
        dst_path = os.path.join(parent_dir, filename)

        if classname == "__init__":
            classname = parent_dir.replace("\\", "/").split("/")[-1]

        try:
            compile_cython(classname, fullpath)
            # Moving File:
            outname = list_get(lambda x: x.startswith(classname) and x.endswith(platform_extension), os.listdir("./"))
            print(f"Generated {outname}...")

            dst_path = os.path.join(parent_dir, filename)
            if os.path.isfile(dst_path + platform_extension): os.remove(dst_path + platform_extension)
            shutil.move(outname, dst_path + platform_extension)

            # Rename the source .py file, to avoid confusion on importing:
            if delete_unneeded_files:
                if os.path.isfile(dst_path + ".c"): os.remove(dst_path + ".c")


        except CompileError as e:
            if os.path.isfile(dst_path + ".c"): os.remove(dst_path + ".c")
            raise e


def compile_cython(classname, path):
    new_extension = Extension(classname, [path])
    old_args = sys.argv
    sys.argv = [old_args[0], 'build_ext', '--inplace']
    setup(
        name=classname,
        ext_modules=cythonize(
            new_extension,
            compiler_directives={'language_level' : "3"}
        )
    )
    sys.argv = old_args

def run(source_mode = False):
    if os.path.isdir(out_dir):
        shutil.rmtree(out_dir)

    shutil.copytree(source_dir, out_dir)
    shutil.copytree(templates_dir, out_dir + "/templates")
    shutil.copytree(static_dir, out_dir + "/static")
    shutil.copytree(docs_dir, out_dir + "/docs")

    if 'source_mode' in sys.argv or source_mode:
        print("Using uncompiled .py sources")

    else:
        get_dir_tree(out_dir, dist_cythonize)

    print("Complete!")

def update_pyx():
    get_dir_tree(source_dir, src_cythonize)

    print("Complete!")

if __name__ == '__main__':
    update_pyx()