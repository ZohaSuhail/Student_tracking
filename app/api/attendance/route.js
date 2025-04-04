import { db } from "@/utils"; // Ensure db is a persistent connection from drizzle
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const grade = searchParams.get("grade");
        const month = searchParams.get("month");

        const result = await db
            .select({
                name: STUDENTS.name,
                present: ATTENDANCE.present,
                day: ATTENDANCE.day,
                date: ATTENDANCE.date,
                grade: STUDENTS.grade,
                studentId: STUDENTS.id,
                attendanceId: ATTENDANCE.id,
            })
            .from(STUDENTS)
            .leftJoin(
                ATTENDANCE,
                and(eq(STUDENTS.id, ATTENDANCE.studentId), eq(ATTENDANCE.date, month))
            )
            .where(eq(STUDENTS.grade, grade));

        return NextResponse.json(result);
    } catch (error) {
        //console.error("❌ GET Error:", error);
        return NextResponse.json({ error: "Failed to fetch attendance data" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const data = await req.json();

        const result = await db.insert(ATTENDANCE).values({
            studentId: data.studentId,
            present: data.present,
            day: data.day,
            date: data.date,
        });

        return NextResponse.json({ success: true, insertedId: result.insertId });
    } catch (error) {
        //console.error("❌ POST Error:", error);
        return NextResponse.json({ error: "Failed to insert attendance" }, { status: 500 });
    }
}

export async function DELETE(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const studentId = searchParams.get("studentId");
        const date = searchParams.get("date");
        const day = searchParams.get("day");

        const result = await db
            .delete(ATTENDANCE)
            .where(
                and(
                    eq(ATTENDANCE.studentId, studentId),
                    eq(ATTENDANCE.day, day),
                    eq(ATTENDANCE.date, date)
                )
            );

        return NextResponse.json({ success: true, deletedCount: result.affectedRows });
    } catch (error) {
        //console.error("❌ DELETE Error:", error);
        return NextResponse.json({ error: "Failed to delete attendance" }, { status: 500 });
    }
}
