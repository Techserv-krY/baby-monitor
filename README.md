# baby-monitor

A WebRTC audio/video streaming system featuring bidirectional streams between Raspberry PI devices and a server instance, accessed via a Web UI.

[![Demo video]({youtube.png?raw=true})]({https://www.youtube.com/watch?v=qYF7NukS90A} "Demo video")

![flowchart](https://raw.githubusercontent.com/leerikss/baby-monitor/master/flowchart.jpg)

## My goal
This is a little audio/video monitoring system I created for my own needs whilst on my paternity leave.
I had a few Raspberrys lying around, and thought I'd do something with them.

My requirements:
- Stream IR video and Audio from multiple Raspberry devices
- Play a lullaby song through a speaker as well as stream audio back from a phone microphone to the Raspberry
- Access the system with a Web UI (iow not write separate mobile clients)
- Not restricted to WLAN (therefore needed a public Server)
- Multiple clients must be able to view the streams simultaneously (=> Janus)
- Should work well on phones (iPhone + Android), as well as on a desktop browser

I achieved my goals, and it's good enough for my personal needs, but there's certainly plenty of room for improvement.

## Installation
To simplify installation I created some shell scripts.

### Server
Refer to [server](https://github.com/leerikss/baby-monitor/tree/master/server)

### Raspberry

Includes three different services:

1) Stream WebRTC Audio and Video (gstreamer RTP/UDP => Janus)
   - Refer to [janus-stream](https://github.com/leerikss/baby-monitor/tree/master/rpi/janus-stream)
2) Play selected song on a Speaker
   - Refer to [music-client](https://github.com/leerikss/baby-monitor/tree/master/rpi/music-client)
3) Stream microphone Audio to a Speaker
   - Refer to [speaker-client](https://github.com/leerikss/baby-monitor/tree/master/rpi/speaker-client)

## Tested on
- Android: Chrome, FireFox (Video did not work on my MI9 presumibly due to lack of H264 support)
- IOS: Safari
- Desktop (Ubuntu): Firefox, Chrome

## TODO
- A better solution for streaming the phone microphone audio data to the RPI speaker. Maybe integrate WebRTC two-way (UV4L?) instead of a dedicated WebSocket Audio Proxy
- Improve security. Currently authentication is required to access the WebRTC live audio/video feeds, as well as for establishing WebSocket connections. The password however is currently static, and stored plaintext in Janus configuration, as well as in different NodeJS .env files on both the Server as well as on the Raspberrys.
- Dockerize all the Services
- The UI is written in vanilla HTML, JS and CSS; maybe integrate ReactJS and/or some other fancy framework(s)
