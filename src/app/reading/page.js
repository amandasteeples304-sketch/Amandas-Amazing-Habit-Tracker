import { supabase } from "@/utils/supabase/client";
import Link from "next/link";
import NavBar from "@/components/NavBar";
import ProjectFilter from "@/components/ProjectFilter";

export default async function ReadingPage({ searchParams }) {
  const params = await searchParams;
  const status = params.status;

  let query = supabase.schema("habit_tracker").from("reading").select("*");

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  const { data: books, error } = await query.order("created_at", {
    ascending: false,
  });

  if (error)
    return (
      <div className="p-20 text-center">
        Error loading books: {error.message}
      </div>
    );

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <NavBar />
      <div className="flex flex-col md:flex-row md:items-center justify-between mt-8 mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-bold text-(--habit-text)">
            My book-nook
          </h1>
          <p className="opacity-60 mt-2">Tracking Every Page Turn</p>
        </div>
        <ProjectFilter />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books?.length > 0 ? (
          books.map((book) => (
            <Link
              key={book.id}
              href={`/reading/${book.slug}`}
              className="group flex flex-col bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/8 transition-all hover:-translate-y-1 shadow-xl"
            >
              <div
                className="w-full relative overflow-hidden"
                style={{ aspectRatio: "4/3" }}
              >
                {book.image_url ? (
                  <img
                    src={book.image_url}
                    alt={book.book_title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center opacity-20 italic">
                    No Cover Image
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold group-hover:text-blue-400 transition-colors">
                  {book.book_title} by {book.author_name}
                </h3>
                <p className="text-sm opacity-50 mt-2 line-clamp-2 leading-relaxed">
                  {book.review_text ||
                    `Currently on chapter ${book.chapters_read || 0}`}
                </p>
                <div className="mt-6 flex items-center text-xs font-semibold text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  View Book Details →
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div className="col-span-full py-20 text-center border-2 border-dashed border-white/5 rounded-3xl">
            <p className="opacity-40 italic">
              {" "}
              No {status || " "} books found.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
