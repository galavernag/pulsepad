export default function EmbedPage() {
  return (
    <main className="flex flex-col items-center justify-center h-screen">
      <div className="p-5 max-w-3xl mx-auto">
        <h1 className="text-2xl font-syne font-medium mb-4">
          Soundboard Embed
        </h1>
        <p className="text-sm text-amber-500 mb-4">
          Important: Click anywhere on this page before using. Google Chrome
          blocks audio from pages that haven't been interacted with.
        </p>

        <div className="border rounded-lg p-4 mb-6 bg-secondary/50">
          <h2 className="text-lg font-medium mb-2">
            How to use this embed in your stream
          </h2>
          <ol className="space-y-3 text-muted-foreground">
            <li>1. Open this page in a separate browser tab.</li>
            <li>
              2. In your broadcasting software (OBS, Streamlabs, etc.), add a
              new <strong>Window Capture</strong> source.
            </li>
            <li>3. Select this browser window/tab from the dropdown menu.</li>
            <li>
              4. Make sure to enable <strong>"Capture Audio"</strong> in the
              source properties.
            </li>
            <li>
              5. Adjust the capture area as needed to fit your stream layout.
            </li>
            <li>
              6. You can now trigger sounds from this page and they will play
              through your stream.
            </li>
          </ol>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Your soundboard will appear here when configured properly.
        </div>
      </div>
    </main>
  );
}
