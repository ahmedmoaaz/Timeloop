
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

// DELETE Event
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    await prisma.event.deleteMany({ where: { id: params.id, userId: user.id } });
    return NextResponse.json({ message: "Deleted successfully" });
};

// PATCH (Edit) Event — Fixed implementation
export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const body = await req.json();
    if (!body) return NextResponse.json({ error: "Nothing to update" }, { status: 400 });

    const user = await prisma.user.findUnique({ where: { email: session.user.email } });
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    try {
        const updatedEvent = await prisma.event.update({
            where: { id: params.id },
            data: {
                title: body.title,
                content: body.content,
                date: body.date ? new Date(body.date) : undefined,
                tags: body.tags,
                userId: user.id
            },
        });

        return NextResponse.json(updatedEvent);
    } catch (error) {
        return NextResponse.json({ error: "Event update failed" }, { status: 500 });
    }
};

