import sys, build, cythonizer
# build.build("no_build", None, "compile")

from setuptools import setup
setup(
    name="zzz",
    install_requires=["Cython"]
)

cythonizer.run()