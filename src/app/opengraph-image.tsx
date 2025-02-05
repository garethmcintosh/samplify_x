import { ImageResponse } from "next/server";

// Route segment config
export const runtime = "edge";

// Image metadata
export const alt = "Samplify";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

// Image generation
export default async function Image() {
  return new ImageResponse(
    (
      // ImageResponse JSX element
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <img
          src="https://samplify.vercel.app/samplify.svg"
          alt="Samplify X Logo"
          width={400}
          height={50}
        />
        <img
          src="https://samplify.vercel.app/music_notes.svg"
          alt="Samplify X Logo"
          width={50}
          height={50}
        />
      </div>
    ),
    // ImageResponse options
    {
      // For convenience, we can re-use the exported opengraph-image
      // size config to also set the ImageResponse's width and height.
      ...size,
    }
  );
}
