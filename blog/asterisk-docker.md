# Quick Setup and Purpose of Running Asterisk in Docker

## Why Run Asterisk in Docker?
Asterisk is one of the world's most popular open source IP telephony systems. Running Asterisk in Docker lets you quickly launch, test, or prototype telephony solutions without lengthy installation or OS compatibility issues. It's ideal for developers, integrators, or anyone who needs to experiment with VoIP environments or automate deployments.

## What is Asterisk & What Does Docker Provide?
- **Asterisk**: A flexible PBX (Private Branch Exchange) software that powers everything from home SIP phone labs to large-scale business call centers. It handles SIP calls, voicemail, IVR, call routing, and much more.
- **Docker**: Allows you to run Asterisk in a container, isolated from your host machine. This removes the need to fight with system dependencies, makes version pinning trivial, and simplifies updating or replicating an instance anywhere.

## How to Set Up Asterisk in Docker (Step-by-Step)

1. **Install Docker** (https://www.docker.com/get-started) if you don't have it.
2. **Prepare your project:**
    - Create a directory (e.g., `asterisk-docker`) and inside it create a folder called `asterisk-config` for custom configs.
3. **Create this `docker-compose.yml` file:**
```yaml
version: '3.8'
services:
  asterisk:
    image: asterisk/asterisk:latest
    ports:
      - "5060:5060/udp"      # SIP signaling (UDP)
      - "5060:5060/tcp"      # SIP signaling (TCP)
      - "8088:8088/tcp"      # Web UI/ARI
    volumes:
      - ./asterisk-config:/etc/asterisk
    restart: unless-stopped
```
4. **Launch your container:**
```sh
docker compose up -d
```
Asterisk is now running! SIP clients can register to your localhost, and you can adjust configs easily.
5. **Basic config:**
    - Edit `asterisk-config/sip.conf` to define users/extensions/SIP endpoints.
    - Edit `asterisk-config/extensions.conf` for call logic.

## What’s Next? Where to Go From Here
- Connect your softphone to SIP on `localhost` (port 5060) using users from `sip.conf`.
- Explore Asterisk's [documentation](https://wiki.asterisk.org/wiki/display/AST/Home) for advanced call flows and features (like voicemail, IVR menus, etc).
- Version your config (Git!) and experiment with different images/tags.
- For production: put Asterisk behind a real firewall, limit exposed ports, and secure all passwords.
- Try advanced modules—recording, ARI (REST API), AMI (manager interface), or external integrations.

**Useful links:**
- [Official Docker Hub: Asterisk](https://hub.docker.com/r/asterisk/asterisk)
- [Asterisk Documentation](https://wiki.asterisk.org/)
