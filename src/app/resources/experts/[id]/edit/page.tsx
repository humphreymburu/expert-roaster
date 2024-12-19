import { updateExpert } from "./actions";
import { Button } from "@expo/components/ui/button";
import { notFound } from "next/navigation";
import prisma from "@expo/lib/prisma";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

export default async function EditExpert({
  params,
}: {
  params: { id: string };
}) {
  const expert = await prisma.user.findUnique({
    where: { id: params.id },
    include: {
      languages: true,
      experiences: true,
      education: true,
    },
  });

  if (!expert) notFound();

  return (
    <section className="min-h-screen bg-gray-50">
      {/* Header with breadcrumbs and actions */}
      <div className="bg-white border-b px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Link href="/dashboard">Dashboard</Link>
            <span>/</span>
            <Link href="/dashboard">Experts</Link>
            <span>/</span>
            <span className="text-gray-900">Edit</span>
          </div>
          <div className="flex gap-2">
            <Link
              href={`/experts/${params.id}`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
            >
              View Expert
            </Link>
            <Link
              href={`/experts/${params.id}/delete`}
              className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 bg-red-50 text-red-600 hover:bg-red-100 h-9 px-4 py-2"
            >
              Delete
            </Link>
          </div>
        </div>
      </div>

      {/* Main form */}
      <div className="p-8">
        <form action={updateExpert} className="max-w-3xl mx-auto">
          <input type="hidden" name="id" value={expert.id} />

          <div className="bg-white rounded-lg border shadow-sm">
            <div className="px-6 py-4 border-b">
              <h1 className="text-lg font-semibold">Edit Expert Profile</h1>
            </div>

            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    defaultValue={expert.fullName}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    defaultValue={expert.email}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    name="bio"
                    defaultValue={expert.bio || ""}
                    className="w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[100px]"
                  />
                </div>
              </div>
            </div>

            <div className="px-6 py-4 bg-gray-50 border-t flex items-center justify-end gap-2">
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
              >
                Cancel
              </Link>
              <Button type="submit" className="inline-flex items-center">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}
