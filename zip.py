import os
import shutil
import zipfile


def zipdir(path, ziph, include_files):
    for root, dirs, files in os.walk(path):
        for file in files:
            if file in include_files:
                ziph.write(os.path.join(root, file),
                           os.path.relpath(os.path.join(root, file),
                                           os.path.join(path, "..")))


def create_zip(source_dir, target_zip, include_files):
    temp_dir = "temp_dir"
    shutil.rmtree(temp_dir)
    os.makedirs(temp_dir)

    for item in os.listdir(source_dir):
        s = os.path.join(source_dir, item)
        d = os.path.join(temp_dir, item)
        if item in include_files:
            if os.path.isdir(s):
                shutil.copytree(s, d, False, None)
            else:
                shutil.copy2(s, d)

    with zipfile.ZipFile(target_zip, "w", zipfile.ZIP_DEFLATED) as zipf:
        zipdir(temp_dir, zipf, include_files)


def main():
    include_files = ["dist", "icon", "manifest.json", "styles.css"]
    create_zip(".", "extension.zip", include_files)


if __name__ == "__main__":
    main()
