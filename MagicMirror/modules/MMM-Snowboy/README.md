# MMM-Snowboy

<p align="right">
  <a href="http://choosealicense.com/licenses/mit"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License"></a>
</p>

MMM-Snowboy is a customizable hotword detection module to activate any assistant of your [MagicMirror](https://github.com/MichMich/MagicMirror)

This module can listen any hotword like "Smart mirror" , "Jarvis" or "Alexa" (standard hotwords from Snowboys database)

## Installation and updates

```sh
cd ~/MagicMirror/modules/
git clone https://github.com/bugsounet/MMM-Snowboy
cd MMM-Snowboy
npm install
```

### Automatic update
If you have installed module already, run the following code to update your install:
```sh
cd ~/MagicMirror/modules/MMM-Snowboy
npm run update
```

## mic Configuration helping
You can try to determinate your mic configuration with this command:
```sh
cd ~/MagicMirror/modules/MMM-Snowboy
npm run micConfig
```

### Full MMM-Snowboy rebuild
  * If you want a clean install of MMM-Snowboy
  * If you have some trouble with new a version of MagicMirror
  * If you want install lasted version of `@bugsounet/snowboy` library
```sh
cd ~/MagicMirror/modules/MMM-Snowboy
npm run rebuild
```

## Configuration

MMM-Snowboy is preconfigured for listening 2 keywords:
  * `jarvis`: MMM-GoogleAssitant
  * `alexa`: MMM-Alexa

### Minimal configuration
```js
{
  module: 'MMM-Snowboy',
  configDeepMerge: true,
  config: {
    micConfig: {
      device: "plughw:1",
    }
  }
},
```
### Personalized configuration
 * If you use minimal configuration, `configDeepMerge` script will merge ONLY your needed change
 * You don't have to copy/past this entire configuration, if you don't change `detectors:[]` value

```js
{
  module: 'MMM-Snowboy',
  configDeepMerge: true,
  config: {
    debug: false,
    autoStart: true,
    micConfig: {
      recorder: "arecord",
      device: "plughw:1",
      audioGain: 2.0,
      applyFrontend: true,
    },
    detectors: [
      {
        Model: "alexa",
        Sensitivity: null,
        onDetected: {
          notification: "ALEXA_ACTIVATE",
          parameters: null
        }
      },
      {
        Model: "jarvis",
        Sensitivity: null,
        onDetected: {
          notification: "GA_ACTIVATE",
          parameters: null
        }
      }
    ]
  }
},

```
### Options

- `debug` - turn on/off debug mode.
- `autoStart` - start listening automaticaly on MagicMirror launching
- `MicConfig:{}`
  - `recorder` - record program, `rec`, `arecord`, `sox`, `parec` is available.
    * On RaspberryPi or some linux machines, `arecord` is better.
    * On OSX, `rec` is better.
    * If you prefer to use `pulse audio`, `parec` would be available also.
  - `device` - recording device (microphone) name of your environment. (e.g. "plughw:1")
    * Find proper device name by yourself. (arecord -l will be help on Raspberry Pi)
  - `audioGain` - set the gain of mic. Usually you don't need to set or adjust this value.
  - `applyFrontend` -  set pre-processing of hotword detection. When you use only snowboy and smart_mirror, false is better. But with other models, true is better to recognize.
- `detectors: [Object]` - Parameter of Detection keyword
  - `Model` - set the name of your detector. Available: `smart_mirror`, `jarvis`, `computer`, `snowboy`, `subex`, `neo_ya`, `hey_extreme`, `view_glass` and `alexa`
  - `Sensitivity` - Override default sensitivity value for applied model defined in `Model`. 
    * Value could be within a range from `0.0` to `1.0`.
    * Default sensitivity values for preconfigured models are:
      * smart_mirror: `0.5`
      * jarvis: `0.7`
      * computer: `0.6`
      * snowboy: `0.5`
      * subex: `0.6`
      * neo_ya: `0.7`
      * hey_extreme: `0.6`
      * view_glass: `0.7`
      * alexa: `0.6`
    * `null` will set default sensitivity.
  - `onDetected: {}` - Parameter when detection matched
    - `notification` - notification name to emit when the hotword is detected.
    - `parameters` - payload to send with your notification.

 ### Notification received
 MMM-Snowboy can receive notification for start or stop listening
  * `SNOWBOY_START` or `DETECTOR_START`: Start listening with your prefered hotkey
  * `SNOWBOY_STOP` or `DETECTOR_STOP`: Stop Litening
 ### Notes
  * this module don't need position, because it don't use any visual
  * With `npm run micConfig`, you can generate a proper micConfig {} configuration.

 ### Updates
 
  **2021/05/02**: v2.0.1
    * prepare compatibility for GA v3

  **2021/03/13**: v2.0.0
    * Add: Muti-Keyword support

  **2020/05/27**: v1.2.0
    * Fix: Sample default notification

  **2020/04/22**: v1.1.1
    * Fix: Cleaning old library (not needed)

  **2020/04/21**: v1.1.0
    * ADD: use npm [@bugsounet/snowboy](https://github.com/bugsounet/snowboy) library
    * FIX: new Code for this library

  **2020/04/11**: v1.0.1
    * FIX: Installer
    * ADD: Alexa

  **2020/04/09**: v1.0.0
    * Initial Release

 ### Snowboy
 This module use my personal [@bugsounet/snowboy](https://github.com/bugsounet/snowboy) library build for node and will be maintened<br>
 Original [snowboy@kitt-AI](https://github.com/Kitt-AI/snowboy) source will be unmaintened soon
