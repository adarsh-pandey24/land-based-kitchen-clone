import "server-only";
import { cacheLife, cacheTag } from "next/cache";

// Google reviews for Joseph's Google Business Profile, fetched server-side from
// the Google Places API (New) "Place Details" endpoint. Needs two env vars:
//   GOOGLE_PLACES_API_KEY  (Google Cloud key with "Places API (New)" enabled)
//   GOOGLE_PLACE_ID        (the business's Place ID)
// Google returns up to 5 reviews per place. Results are cached for a few hours.

export type GoogleReview = {
  author: string;
  authorUrl: string | null;
  photo: string | null;
  rating: number;
  text: string;
  when: string;
};

export type GoogleReviews = {
  rating: number | null;
  total: number;
  mapsUrl: string | null;
  writeReviewUrl: string;
  reviews: GoogleReview[];
};

type PlacesResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: {
    rating?: number;
    relativePublishTimeDescription?: string;
    text?: { text?: string };
    originalText?: { text?: string };
    authorAttribution?: { displayName?: string; uri?: string; photoUri?: string };
  }[];
};

export const googleReviewsConfigured = () => Boolean(process.env.GOOGLE_PLACES_API_KEY && process.env.GOOGLE_PLACE_ID);

export async function getGoogleReviews(): Promise<GoogleReviews | null> {
  "use cache";
  cacheTag("google-reviews");
  cacheLife("hours");

  const key = process.env.GOOGLE_PLACES_API_KEY;
  const placeId = process.env.GOOGLE_PLACE_ID;
  if (!key || !placeId) return null;

  try {
    const res = await fetch(`https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`, {
      headers: {
        "X-Goog-Api-Key": key,
        "X-Goog-FieldMask": "rating,userRatingCount,googleMapsUri,reviews",
      },
    });
    if (!res.ok) {
      console.error(`[google-reviews] Places API returned ${res.status}`);
      return null;
    }
    const data = (await res.json()) as PlacesResponse;
    const reviews = (data.reviews ?? [])
      // Copy document: show 4 and 5 star reviews only.
      .filter((r) => (r.rating ?? 0) >= 4 && (r.text?.text || r.originalText?.text))
      .map((r) => ({
        author: r.authorAttribution?.displayName ?? "Google user",
        authorUrl: r.authorAttribution?.uri ?? null,
        photo: r.authorAttribution?.photoUri ?? null,
        rating: r.rating ?? 5,
        text: r.text?.text ?? r.originalText?.text ?? "",
        when: r.relativePublishTimeDescription ?? "",
      }));
    return {
      rating: data.rating ?? null,
      total: data.userRatingCount ?? 0,
      mapsUrl: data.googleMapsUri ?? null,
      writeReviewUrl: `https://search.google.com/local/writereview?placeid=${encodeURIComponent(placeId)}`,
      reviews,
    };
  } catch (error) {
    console.error("[google-reviews] Could not load Google reviews", error);
    return null;
  }
}
