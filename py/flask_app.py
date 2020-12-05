import threading

import settings
settings.load_settings()

import flask_interface

app = flask_interface.app

def start(*args, **kwargs):
    def _start_app(*_args, **_kwargs):
        app.run(*_args, **_kwargs)

    app_thread = threading.Thread(None, _start_app, args=args, kwargs=kwargs)
    app_thread.start()
    return app_thread
