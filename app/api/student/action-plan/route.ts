import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";


export async function GET() {
  return NextResponse.json({
    success: true,
    actionPlan: {
      nextMilestone: "Complete Kinematics & Thermodynamics Diagnostic",
      targetExam: "NEST 2027",
    },
  });
}
