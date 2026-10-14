/** The complete sample journal: readers can make it their own without signing in. */
export type ReadingStatus = "Reading" | "Finished" | "Want to read" | "DNF";
export type BookFormat = "Paperback" | "Ebook" | "Audiobook" | "Hardcover";
export type Book = {
  id: string; title: string; author: string; genre: string; pages: number; progress: number;
  cover: string; color: string; status: ReadingStatus; format: BookFormat; rating: number;
  started: string; finished: string; moods: string[]; shelves: string[]; tropes: string[];
  spotify: string; notes?: { chapter: string; text: string }[]; summary: string; review: string; reread: boolean;
};
export type Quote = { id: string; bookId: string; text: string; page: number; favorite: boolean };
export type ReadingSession = { id: string; bookId: string; date: string; minutes: number; pages: number };
export type ReadingData = {
  name: string; books: Book[]; quotes: Quote[]; sessions: ReadingSession[];
  annualGoal: number; monthlyGoal: number; pagesGoal: number; darkMode: boolean;
  fontSize: "small" | "medium" | "large"; spotify: string;
  links: { goodreads: string; storygraph: string; library: string }; shelves: string[];
};

export const STORAGE_KEY = "pagewise-reading-journal-v1";
export const makeId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.random().toString(36).slice(2)}`;
const date = (daysAgo: number) => {
  const result = new Date();
  result.setDate(result.getDate() - daysAgo);
  return result.toISOString().slice(0, 10);
};
const demoBooks: Book[] = [
  { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", genre: "Personal growth", pages: 320, progress: 320, cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", color: "fern", status: "Finished", format: "Paperback", rating: 5, started: date(51), finished: date(38), moods: ["Inspiring", "Practical"], shelves: ["Personal growth"], tropes: ["Small steps", "Fresh start"], spotify: "", summary: "A practical guide to making small, remarkable changes by building systems that stick.", review: "A gentle nudge to make the good choice the easy choice. I keep coming back to the little changes.", reread: true },
  { id: "piranesi", title: "Piranesi", author: "Susanna Clarke", genre: "Literary fiction", pages: 272, progress: 272, cover: "https://covers.openlibrary.org/b/isbn/9781635575637-L.jpg", color: "blue", status: "Finished", format: "Ebook", rating: 5, started: date(35), finished: date(25), moods: ["Dreamlike", "Mysterious"], shelves: ["Fiction"], tropes: ["An impossible house", "Found journals"], spotify: "", summary: "An enigmatic story, told through the notebooks of a man living in an extraordinary house.", review: "Strange and lovely in exactly the right measure. The world stayed with me long after the last page.", reread: true },
  { id: "klara", title: "Klara and the Sun", author: "Kazuo Ishiguro", genre: "Literary fiction", pages: 320, progress: 194, cover: "https://covers.openlibrary.org/b/isbn/9780593311295-L.jpg", color: "ochre", status: "Reading", format: "Paperback", rating: 0, started: date(7), finished: "", moods: ["Reflective", "Moving"], shelves: ["Fiction"], tropes: ["Unreliable narrator", "Found family"], spotify: "", summary: "", review: "", reread: false },
  { id: "covenant", title: "The Thursday Murder Club", author: "Richard Osman", genre: "Mystery", pages: 368, progress: 92, cover: "https://covers.openlibrary.org/b/isbn/9781984880987-L.jpg", color: "terracotta", status: "Reading", format: "Paperback", rating: 0, started: date(4), finished: "", moods: ["Cosy", "Funny"], shelves: ["Fiction"], tropes: ["Amateur sleuths", "Found family"], spotify: "", summary: "", review: "", reread: false },
  { id: "braiding", title: "Braiding Sweetgrass", author: "Robin Wall Kimmerer", genre: "Nature writing", pages: 408, progress: 408, cover: "https://covers.openlibrary.org/b/isbn/9781571313560-L.jpg", color: "sage", status: "Finished", format: "Audiobook", rating: 5, started: date(74), finished: date(59), moods: ["Healing", "Reflective"], shelves: ["Personal growth"], tropes: ["Nature", "Indigenous wisdom"], spotify: "", summary: "An invitation to listen to the gifts and teachings of the living world.", review: "So generous, grounded, and wise. Robin Wall Kimmerer's narration makes it a wonderful listen.", reread: true },
  { id: "tomorrow", title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", genre: "Contemporary fiction", pages: 416, progress: 416, cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg", color: "rose", status: "Finished", format: "Ebook", rating: 4, started: date(104), finished: date(87), moods: ["Emotional", "Creative"], shelves: ["Fiction"], tropes: ["Creative partners", "Second chances"], spotify: "", summary: "A decades-spanning friendship shaped by play, collaboration, and second chances.", review: "A beautifully observed story about the love language of making something together.", reread: false },
  { id: "immense", title: "An Immense World", author: "Ed Yong", genre: "Science", pages: 464, progress: 0, cover: "https://covers.openlibrary.org/b/isbn/9780593133255-L.jpg", color: "teal", status: "Want to read", format: "Hardcover" as BookFormat, rating: 0, started: "", finished: "", moods: ["Curious", "Nature"], shelves: ["To explore"], tropes: [], spotify: "", summary: "", review: "", reread: false },
  { id: "small-things", title: "Small Things Like These", author: "Claire Keegan", genre: "Literary fiction", pages: 128, progress: 0, cover: "https://covers.openlibrary.org/b/isbn/9780802158741-L.jpg", color: "burgundy", status: "Want to read", format: "Paperback", rating: 0, started: "", finished: "", moods: ["Thoughtful", "Quiet"], shelves: ["Fiction"], tropes: [], spotify: "", summary: "", review: "", reread: false },
];
const demoSessions: ReadingSession[] = Array.from({ length: 42 }, (_, index) => {
  const daysAgo = index * 2 + (index % 4);
  return { id: `demo-session-${index}`, bookId: demoBooks[index % 6]?.id ?? "klara", date: date(daysAgo), minutes: 18 + (index * 13) % 42, pages: 8 + (index * 7) % 38 };
});
export const DEMO_DATA: ReadingData = {
  name: "Reader", books: demoBooks,
  quotes: [
    { id: "quote-1", bookId: "piranesi", text: "The Beauty of the House is immeasurable; its Kindness infinite.", page: 6, favorite: true },
    { id: "quote-2", bookId: "braiding", text: "Knowing that you love the earth changes you, activates you to defend and protect and celebrate.", page: 343, favorite: false },
    { id: "quote-3", bookId: "atomic-habits", text: "Every action you take is a vote for the type of person you wish to become.", page: 38, favorite: true },
    { id: "quote-4", bookId: "tomorrow", text: "What is a game? It is tomorrow, and tomorrow, and tomorrow.", page: 350, favorite: false },
  ], sessions: demoSessions, annualGoal: 24, monthlyGoal: 2, pagesGoal: 1200,
  darkMode: false, fontSize: "medium", spotify: "", links: { goodreads: "", storygraph: "", library: "" },
  shelves: ["Fiction", "Personal growth", "To explore"],
};
export function loadReadingData(): ReadingData {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEMO_DATA;
    const parsed: unknown = JSON.parse(stored);
    if (parsed && typeof parsed === "object" && Array.isArray((parsed as ReadingData).books)) {
      return { ...DEMO_DATA, ...(parsed as ReadingData) };
    }
  } catch {
    // A broken or older journal gracefully falls back to the sample library.
  }
  return DEMO_DATA;
}
export function saveReadingData(data: ReadingData) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(data)); } catch { /* The app remains usable when storage is unavailable. */ }
}

// ---- Per-user journal in the database (Supabase) ----
import { supabase } from "./supabase";

function asJournal(value: unknown): ReadingData | null {
  if (value && typeof value === "object" && Array.isArray((value as ReadingData).books)) {
    return { ...DEMO_DATA, ...(value as ReadingData) };
  }
  return null;
}

/** The signed-in person's saved journal, or null if they have not saved one yet. */
export async function loadUserJournal(userId: string): Promise<ReadingData | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("journals").select("data").eq("user_id", userId).maybeSingle();
  if (error) throw new Error(error.message);
  return data ? asJournal(data.data) : null;
}

/** Create or update the signed-in person's journal. */
export async function saveUserJournal(userId: string, journal: ReadingData): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase
    .from("journals")
    .upsert({ user_id: userId, data: journal, updated_at: new Date().toISOString() });
  if (error) throw new Error(error.message);
}

/** A journal saved in this browser before accounts existed (one-time import), or null. */
export function loadLocalJournal(): ReadingData | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? asJournal(JSON.parse(stored)) : null;
  } catch {
    return null;
  }
}

/** Remove the old browser copy once it is safely in the account (so another person on this computer never sees it). */
export function clearLocalJournal() {
  try { localStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
}
