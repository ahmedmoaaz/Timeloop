// src/app/api/events/search/route.ts
/*import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Trim params to remove newlines or extra spaces
    const tag = searchParams.get("tag")?.trim();
    const query = searchParams.get("query")?.trim();
    const title = searchParams.get("title")?.trim();
    const from = searchParams.get("from")?.trim();
    const to = searchParams.get("to")?.trim();

    // Convert date strings to JS Date objects if they exist
    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const events = await prisma.event.findMany({
      where: {
        tags: tag ? { has: tag } : undefined,
        date:
          fromDate || toDate
            ? {
                gte: fromDate,
                lte: toDate,
              }
            : undefined,
        OR:
          query || title
            ? [
                ...(query
                  ? [
                      { title: { contains: query, mode: "insensitive" } },
                      { content: { contains: query, mode: "insensitive" } },
                    ]
                  : []),
                ...(title
                  ? [{ title: { contains: title, mode: "insensitive" } }]
                  : []),
              ]
            : undefined,
      },
      orderBy: { date: "desc" },
    });

    console.log("Found events:", events);

    return NextResponse.json(events);
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}

/*import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const tag = searchParams.get("tag")?.trim();
    const query = searchParams.get("query")?.trim();
    const title = searchParams.get("title")?.trim();
    const from = searchParams.get("from")?.trim();
    const to = searchParams.get("to")?.trim();

    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const whereClause = {
      tags: tag ? { has: tag } : undefined,
      date:
        fromDate || toDate
          ? {
              gte: fromDate,
              lte: toDate,
            }
          : undefined,
      OR:
        query || title
          ? [
              ...(query
                ? [
                    { title: { contains: query, mode: "insensitive" } },
                    { content: { contains: query, mode: "insensitive" } },
                  ]
                : []),
              ...(title
                ? [{ title: { contains: title, mode: "insensitive" } }]
                : []),
            ]
          : undefined,
    };

    const events = await prisma.event.findMany({
      where: whereClause,
      orderBy: { date: "desc" },
    });

    console.log("Found events:", events);

    return NextResponse.json(events);
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}*/

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    const tag = searchParams.get("tag")?.trim();
    const query = searchParams.get("query")?.trim();
    const title = searchParams.get("title")?.trim();
    const from = searchParams.get("from")?.trim();
    const to = searchParams.get("to")?.trim();

    const fromDate = from ? new Date(from) : undefined;
    const toDate = to ? new Date(to) : undefined;

    const events = await prisma.event.findMany({
      where: {
        tags: tag ? { has: tag } : undefined,
        date:
          fromDate || toDate
            ? {
                gte: fromDate,
                lte: toDate,
              }
            : undefined,
        OR:
          query || title
            ? [
                ...(query
                  ? [
                      { title: { contains: query, mode: "insensitive" } },
                      { content: { contains: query, mode: "insensitive" } },
                    ]
                  : []),
                ...(title
                  ? [{ title: { contains: title, mode: "insensitive" } }]
                  : []),
              ]
            : undefined,
      },
      orderBy: { date: "desc" },
    });

    console.log("Found events:", events);

    return NextResponse.json(events);
  } catch (err) {
    console.error("Search API error:", err);
    return NextResponse.json(
      { error: "Failed to fetch events" },
      { status: 500 }
    );
  }
}


