import subprocess, sys, argparse, os
import cythonizer

def get_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description='Built tool for AngelfishLabs site.')

    cythonizer_args = parser.add_mutually_exclusive_group()
    cythonizer_args.add_argument(
        "-c",
        "--cythonize",
        action='store_const',
        const='compile',
        default='compile',
        dest='cy_action',
        help="Copy 'templates', 'static', and 'py' to './dist'. Cythonize the './dist/' directory. (Default)"
    )
    cythonizer_args.add_argument(
        "-v",
        "--cy_copy",
        action='store_const',
        const='cy_copy',
        dest='cy_action',
        help="Copy 'templates', 'static', and 'py' to './dist'. Do not cythonize the './dist/py' directory."
    )
    cythonizer_args.add_argument(
        "-n",
        "--no_cythonizer",
        action='store_const',
        const='no_build',
        dest='cy_action',
        help="Do not run cythonizer.py"
    )

    # Arguments for building Webpack
    webpack_mode_args = parser.add_mutually_exclusive_group()
    webpack_mode_args.add_argument(
        "-p",
        "--prod",
        action='store_const',
        const='prod',
        default=None,
        dest='wp_mode',
        help="Builds webpack in production mode. (Default)"
    )
    webpack_mode_args.add_argument(
        "-d",
        "--dev",
        action='store_const',
        const='dev',
        dest='wp_mode',
        help="Builds webpack in development mode."
    )
    webpack_mode_args.add_argument(
        "-x",
        "--no_webpack",
        action='store_const',
        const='no_build',
        dest='wp_mode',
        help="Do not build webpack."
    )

    webpack_dest_args = parser.add_mutually_exclusive_group()
    webpack_dest_args.add_argument(
        "-i",
        "--dist",
        action='store_const',
        const='./dist/',
        default=None,
        dest='wp_dest',
        help="Webpack will output to the ./dist/react folder. Used for builds. (Default)"
    )
    webpack_dest_args.add_argument(
        "-r",
        "-s",
        "--src",
        action='store_const',
        const='./',
        dest='wp_dest',
        help="Webpack will output to the ./src/react folder. Used for testing/debugging."
    )

    return parser

def build(wp_mode: str, wp_dest: str, cy_action: str):

    # Build Server
    if cy_action == 'no_build':
        print("Skipping cythonizer.py... ")
    elif cy_action == 'compile':
        cythonizer.run()
    elif cy_action == 'cy_copy':
        cythonizer.run(True)
    else:
        raise ValueError(f"Something has gone horribly wrong: '{cy_action}' is not a valid cy_action.")

    wp_env = os.environ.copy()

    if wp_mode is None:
        print("'webpack.config.js' will use mode from environment...")
    elif wp_mode == 'no_build':
        print("Skipping Webpack build...")
        return
    elif wp_mode == 'prod':
        print("'webpack.config.js' will use production mode...")
        wp_env["WP_MODE"] = "production"
    elif wp_mode == 'dev':
        print("'webpack.config.js' will use development mode...")
        wp_env["WP_MODE"] = "development"
    else:
        raise ValueError(f"Something has gone horribly wrong: '{wp_mode}' is not a valid wp_mode.")

    if wp_dest is None:
        print("'webpack.config.js' will use destination from environment...")
    else:
        print(f"'webpack.config.js' will use '{wp_dest}' as destination from environment...")
        wp_env["WP_DEST"] = wp_dest

    # Build Client
    subprocess.run(
        [
            'npx',
            'webpack'
        ],
        # shell=True,
        env=wp_env,
    )

def main():
    args: argparse.Namespace = get_parser().parse_args(sys.argv[1:])
    build(args.wp_mode, args.wp_dest, args.cy_action)



if __name__ == '__main__':
    main()