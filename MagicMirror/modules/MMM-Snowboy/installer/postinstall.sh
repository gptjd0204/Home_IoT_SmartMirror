#!/bin/bash
# +--------------------------------+
# | npm postinstall                |
# | Hotword Installer by Bugsounet |
# | Rev 1.0.6                      |
# +--------------------------------+

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

# check version
Installer_version="$(cat ../package.json | grep version | cut -c15-19 2>/dev/null)"

# the end...
Installer_success "Snowboy v$Installer_version is now installed !"
