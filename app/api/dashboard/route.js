import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { NextResponse } from "next/server";
import { eq, sql, desc, and } from "drizzle-orm";

export async function GET(req) {
    try {
        const searchParams = req.nextUrl.searchParams;
        const date = searchParams.get('date');
        const grade = searchParams.get('grade');

        const result = await db.select({
            day: ATTENDANCE.day,
            presentCount: sql`count(${ATTENDANCE.day})`
        })
        .from(ATTENDANCE)
        .leftJoin(STUDENTS, and(eq(ATTENDANCE.studentId, STUDENTS.id), eq(ATTENDANCE.date, date)))
        .groupBy(ATTENDANCE.day)
        .where(eq(STUDENTS.grade, grade))
        .orderBy(desc(ATTENDANCE.day))
        .limit(7);

        return NextResponse.json(result);
    } catch (error) {
        console.error("Database error:", error);
        return NextResponse.json({ error: "Database connection issue" }, { status: 500 });
    }
}
