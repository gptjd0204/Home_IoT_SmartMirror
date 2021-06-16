#!/bin/bash
# +-----------------+
# | Snowboy rebuild |
# | by Bugsounet    |
# | Rev 2.0.0       |
# +-----------------+
# get the installer directory
Installer_get_current_dir () {
  SOURCE="${BASH_SOURCE[0]}"
  while [ -h "$SOURCE" ]; do
    DIR="$( cd -P "$( dirname "$SOURCE" )" && pwd )"
    SOURCE="$(readlink "$SOURCE")"
    [[ $SOURCE != /* ]] && SOURCE="$DIR/$SOURCE"
  done
  echo "$( cd -P "$( dirname "$SOURCE" )" && pwd )"
}

Installer_dir="$(Installer_get_current_dir)"

# move to installler directory
cd "$Installer_dir"
source utils.sh

Installer_info "Welcome to MMM-Snowboy rebuild !"
Installer_info "This program will reinstall MMM-Snowboy"
Installer_yesno "Do you want to continue ?" || exit 0
echo

Installer_info "Deleting: package-lock.json node_modules"
cd ~/MagicMirror/modules/MMM-Snowboy
# deleting package.json because npm install add/update package
rm -rf package-lock.json node_modules
Installer_success "Done."
echo

Installer_info "Fetch Last Version of MMM-Snowboy..."
git reset --hard HEAD
git pull
Installer_success "Done."
echo

Installer_info "ReInstalling MMM-Snowboy..."
# launch installer
npm install
