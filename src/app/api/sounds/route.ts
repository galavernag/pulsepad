import { AppError } from "@/errors/app-error";
import { env } from "@/lib/env";
import { Sound } from "@/types";
import * as cheerio from "cheerio";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const name = searchParams.get("name");

    if (!name) {
      // Comportamento original do GET
      const url = new URL(env.MYINSTANTS_ENDPOINT);
      const response = await fetch(url);
      const data = await response.text();

      const $ = cheerio.load(data);
      const sounds: Sound[] = [];

      $("div.instants.result-page div.instant").each((index, element) => {
        const title = $(element).find("a.instant-link").text().trim();
        const button = $(element).find("button.small-button");
        const onclickAttr = button.attr("onclick");

        if (onclickAttr) {
          const match = onclickAttr.match(/play\('([^']+)'/);
          if (match) {
            sounds.push({
              id: index.toString(),
              name: title,
              url: new URL(match[1], env.MYINSTANTS_ENDPOINT).href,
            });
          }
        }
      });

      return NextResponse.json(sounds);
    }

    // Comportamento original do POST
    const searchUrl = new URL(
      `/search?name=${encodeURIComponent(name)}`,
      env.MYINSTANTS_ENDPOINT
    ).href;

    const response = await fetch(searchUrl, {
      method: "GET",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    const data = await response.text();
    const $ = cheerio.load(data);
    const sounds: Sound[] = [];

    $("div.instants.result-page div.instant").each((index, element) => {
      const title = $(element).find("a.instant-link").text().trim();
      const button = $(element).find("button.small-button");
      const onclickAttr = button.attr("onclick");

      if (onclickAttr) {
        const match = onclickAttr.match(/play\('([^']+)'/);
        if (match) {
          sounds.push({
            id: index.toString(),
            name: title,
            url: new URL(match[1], env.MYINSTANTS_ENDPOINT).href,
          });
        }
      }
    });

    return NextResponse.json(sounds, {
      status: 200,
      headers: {
        "Cache-Control": "public, s-maxage=1",
        "CDN-Cache-Control": "public, s-maxage=60",
        "Vercel-CDN-Cache-Control": "public, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error(error);
    throw new AppError("MyInstantsAPI", "Error getting sounds.");
  }
}
