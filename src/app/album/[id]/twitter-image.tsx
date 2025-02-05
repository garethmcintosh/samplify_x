import { ImageResponse } from "next/server";
import { getAlbumData } from "./utils";

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
export default async function Image({ params }: { params: { id: string } }) {
  const albumData: any = await getAlbumData(params.id);

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
        {albumData ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={albumData["cover_art_url"]}
              alt="Cover art"
              width={400}
              height={400}
              style={{ marginBottom: "2rem", boxShadow: "0 0 10px #000" }}
            />

            <img
              src="https://samplify.vercel.app/samplify.svg"
              alt="Samplify X Logo"
              width={400}
              height={50}
            />
          </div>
        ) : (
          <>
            <img
              src="https://samplify.vercel.app/samplify.svg"
              alt="Samplify X Logo"
              width={400}
              height={50}
            />
          </>
        )}
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
