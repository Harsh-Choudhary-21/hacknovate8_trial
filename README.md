# Sleek Clock Animation

A clean, modern, and large analog clock web app where the minute hand contains the text "Hacknovate 8" and rotates a full 360 degrees every 10 seconds.

## Running the Clock

1. **Start a Local Server**
   Run either of these commands in the project folder to start a server:
   ```bash
   npx serve
   # or
   npx http-server
   # or
   python -m http.server
   ```

2. **Open in Browser**
   Open your browser and navigate directly to:
   ```text
   http://localhost:3000/clock.html
   ```
   *(Replace `3000` with the port shown in your terminal, e.g., `5000` or `8080`)*

## Development
To recompile after making changes to `clock.ts`:
```bash
npx tsc clock.ts --target es6 --ignoreConfig
```