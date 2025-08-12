import argparse
import importlib
import json
import sys
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent
sys.path.insert(0, str(BASE_DIR))


def main():
    parser = argparse.ArgumentParser(description="Run backend module")
    parser.add_argument('--module', required=True, help='Module name')
    parser.add_argument('--payload', default='{}', help='JSON payload')
    args = parser.parse_args()

    module_name = args.module
    if not module_name.isidentifier():
        print(json.dumps({"error": "Invalid module name"}), file=sys.stderr)
        sys.exit(1)

    try:
        module = importlib.import_module(f'modules.{module_name}')
    except Exception as e:
        print(json.dumps({"error": f"Cannot import module '{module_name}': {e}"}), file=sys.stderr)
        sys.exit(1)

    try:
        payload = json.loads(args.payload) if args.payload else {}
    except Exception as e:
        print(json.dumps({"error": f"Invalid JSON payload: {e}"}), file=sys.stderr)
        sys.exit(1)

    try:
        result = module.run(payload)
        print(json.dumps(result))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)


if __name__ == '__main__':
    try:
        main()
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
