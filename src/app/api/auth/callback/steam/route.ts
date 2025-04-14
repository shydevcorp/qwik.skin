import { NextResponse } from "next/server";
import { validateOpenID } from "@/lib/openid";
import { prisma, connectPrisma } from "@/db/client";
import { encode } from "next-auth/jwt";

export async function GET(request: Request) {
  console.log("Steam callback started");

  try {
    await connectPrisma();

    const url = new URL(request.url);
    const params: Record<string, string> = {};

    url.searchParams.forEach((value, key) => {
      params[key] = value;
    });

    console.log("OpenID params:", JSON.stringify(params, null, 2));
    console.log("Number of OpenID params:", Object.keys(params).length);

    const hasClaimed = Boolean(params["openid.claimed_id"]);
    const hasIdentity = Boolean(params["openid.identity"]);
    const hasMode = Boolean(params["openid.mode"]);

    console.log("Has essential params:", { hasClaimed, hasIdentity, hasMode });

    if (!hasClaimed || !hasIdentity || !hasMode) {
      console.error("Missing essential OpenID parameters");
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=MissingParams`,
      );
    }

    try {
      const isValid = await validateOpenID(params);
      console.log("OpenID validation result:", isValid);

      if (!isValid) {
        console.error("Invalid OpenID response");
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=InvalidOpenIDResponse`,
        );
      }
    } catch (validationError) {
      console.error("Error during OpenID validation:", validationError);
      const errorMessage =
        validationError instanceof Error
          ? validationError.message
          : "Unknown validation error";
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=ValidationError&message=${encodeURIComponent(errorMessage)}`,
      );
    }

    try {
      const claimedId = params["openid.claimed_id"];
      console.log("Claimed ID:", claimedId);

      const steamIdMatch = claimedId.match(/\/id\/(\d+)$/);

      if (!steamIdMatch || !steamIdMatch[1]) {
        console.error("Unable to extract Steam ID using regex");

        const steamId = claimedId.split("/").pop();

        if (!steamId) {
          console.error("Steam ID not found in response");
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=SteamIDNotFound`,
          );
        }

        console.log("Extracted Steam ID (fallback):", steamId);
      } else {
        console.log("Extracted Steam ID (regex):", steamIdMatch[1]);
      }

      const steamId = steamIdMatch
        ? steamIdMatch[1]
        : claimedId.split("/").pop();

      console.log("Final Steam ID:", steamId);

      if (!steamId) {
        console.error("Steam ID not found in response after processing");
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=SteamIDNotFound`,
        );
      }

      const apiKey = process.env.STEAM_API_KEY;
      console.log(
        "Using Steam API Key:",
        apiKey ? "Valid (hidden)" : "Missing",
      );

      if (!apiKey) {
        console.error("Steam API Key is missing");
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=MissingAPIKey`,
        );
      }

      let response;
      try {
        response = await fetch(
          `https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${apiKey}&steamids=${steamId}`,
        );

        if (!response.ok) {
          console.error(
            "Failed to fetch Steam profile, status:",
            response.status,
          );
          const responseText = await response.text();
          console.error("Response:", responseText);
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=SteamProfileFetchFailed&status=${response.status}`,
          );
        }
      } catch (fetchError) {
        console.error("Error fetching Steam profile:", fetchError);
        const errorMessage =
          fetchError instanceof Error
            ? fetchError.message
            : "Unknown fetch error";
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=SteamAPIError&message=${encodeURIComponent(errorMessage)}`,
        );
      }

      let data;
      try {
        data = await response.json();
        console.log("Steam API response structure:", Object.keys(data));
        console.log("Players array length:", data.response?.players?.length);
      } catch (jsonError) {
        console.error("Error parsing Steam API response:", jsonError);
        const errorMessage =
          jsonError instanceof Error
            ? jsonError.message
            : "Unknown JSON parse error";
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=InvalidSteamResponse&message=${encodeURIComponent(errorMessage)}`,
        );
      }

      const player = data.response?.players?.[0];

      if (!player) {
        console.error("Player not found in Steam API response");
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=PlayerNotFound`,
        );
      }

      console.log("Player data:", {
        steamid: player.steamid,
        name: player.personaname,
        avatar: player.avatarfull ? "Found" : "Missing",
      });

      try {
        const tableList = await prisma.$queryRaw`
          SELECT table_name 
          FROM information_schema.tables 
          WHERE table_schema = 'public'
        `;
        console.log("Available tables in database:", tableList);
      } catch (tableError) {
        console.error("Error getting table list:", tableError);
      }

      let user;
      try {
        user = await prisma.user.findUnique({
          where: { steamId },
        });

        console.log("Existing user:", user ? "Found" : "Not found");
      } catch (findError) {
        console.error("Error finding user:", findError);
        const errorMessage =
          findError instanceof Error
            ? findError.message
            : "Unknown database error";

        try {
          console.log(
            "Tables might not exist. Attempting to fix by running Prisma migrations directly...",
          );
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=DatabaseNotSetup&message=${encodeURIComponent(errorMessage)}`,
          );
        } catch (migrationError) {
          console.error("Migration error:", migrationError);
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=MigrationError&message=${encodeURIComponent(errorMessage)}`,
          );
        }
      }

      if (!user) {
        console.log("Creating new user with Steam ID:", steamId);
        try {
          user = await prisma.user.create({
            data: {
              name: player.personaname,
              image: player.avatarfull,
              steamId: player.steamid,
              steamUsername: player.personaname,
              steamAvatar: player.avatarfull,
            },
          });
          console.log("New user created with ID:", user.id);
        } catch (createError) {
          console.error("Error creating user:", createError);
          const errorMessage =
            createError instanceof Error
              ? createError.message
              : "Unknown error creating user";
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=DatabaseCreateError&message=${encodeURIComponent(errorMessage)}`,
          );
        }
      } else {
        console.log("Updating existing user:", user.id);
        try {
          user = await prisma.user.update({
            where: { id: user.id },
            data: {
              name: player.personaname,
              image: player.avatarfull,
              steamUsername: player.personaname,
              steamAvatar: player.avatarfull,
            },
          });
          console.log("User updated");
        } catch (updateError) {
          console.error("Error updating user:", updateError);
          const errorMessage =
            updateError instanceof Error
              ? updateError.message
              : "Unknown error updating user";
          return NextResponse.redirect(
            `${process.env.NEXTAUTH_URL}?error=DatabaseUpdateError&message=${encodeURIComponent(errorMessage)}`,
          );
        }
      }

      let token;
      try {
        token = await encode({
          token: {
            name: user.name,
            email: user.email,
            picture: user.image,
            sub: user.id,
            id: user.id,
            steamId: user.steamId,
            steamUsername: user.steamUsername,
            steamAvatar: user.steamAvatar,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60, // 30 days
            jti: crypto.randomUUID(),
          },
          secret: process.env.NEXTAUTH_SECRET as string,
        });

        console.log("Session token created");
      } catch (tokenError) {
        console.error("Error creating session token:", tokenError);
        const errorMessage =
          tokenError instanceof Error
            ? tokenError.message
            : "Unknown token error";
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=TokenCreationError&message=${encodeURIComponent(errorMessage)}`,
        );
      }

      const redirectResponse = NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}/trade`,
      );

      try {
        redirectResponse.cookies.set({
          name: "next-auth.session-token",
          value: token,
          expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          path: "/",
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "lax",
        });

        console.log("Session cookie set, redirecting to /trade");
      } catch (cookieError) {
        console.error("Error setting cookie:", cookieError);
        const errorMessage =
          cookieError instanceof Error
            ? cookieError.message
            : "Unknown cookie error";
        return NextResponse.redirect(
          `${process.env.NEXTAUTH_URL}?error=CookieError&message=${encodeURIComponent(errorMessage)}`,
        );
      }

      return redirectResponse;
    } catch (processingError) {
      console.error("Error processing Steam ID:", processingError);
      const errorMessage =
        processingError instanceof Error
          ? processingError.message
          : "Unknown processing error";
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=ProcessingError&message=${encodeURIComponent(errorMessage)}`,
      );
    }
  } catch (error) {
    console.error("Unhandled error in Steam callback:", error);
    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=SteamAuthError&message=${encodeURIComponent(error.message)}&name=${error.name}`,
      );
    } else {
      return NextResponse.redirect(
        `${process.env.NEXTAUTH_URL}?error=SteamAuthError&message=Unknown%20error`,
      );
    }
  }
}
