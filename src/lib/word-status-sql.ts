import { sql, type SQL } from "drizzle-orm";
import { userWords } from "@/lib/db/schema";
import { MASTERED_DAYS } from "@/lib/srs";
import { FAMILIAR_DAYS, type WordStatus } from "@/lib/word-status";

/**
 * Durum süzgecinin SQL karşılığı — `wordStatus` etiketiyle AYNI bantlar
 * (`leech` önce: zorlanılan kelime aralığından bağımsız o etiketi taşıyor).
 * `/words` sayfası ve `/api/words` (Android) ikisi de bunu kullanıyor; kural
 * iki yerde ayrı yazılıydı ve sayfada eşik `21` olarak elle duruyordu.
 * `words` ile `user_words` sol birleşimi varsayılıyor.
 */
export function statusFilterSql(status: WordStatus | ""): SQL | null {
  const notLeech = sql`coalesce(${userWords.leech}, false) = false`;
  switch (status) {
    case "new":
      return sql`${userWords.wordId} is null`;
    case "learning":
      return sql`${userWords.wordId} is not null and ${notLeech} and ${userWords.intervalDays} < ${FAMILIAR_DAYS}`;
    case "familiar":
      return sql`${notLeech} and ${userWords.intervalDays} >= ${FAMILIAR_DAYS} and ${userWords.intervalDays} < ${MASTERED_DAYS}`;
    case "mastered":
      return sql`${notLeech} and ${userWords.intervalDays} >= ${MASTERED_DAYS}`;
    case "leech":
      return sql`${userWords.leech} = true`;
    default:
      return null;
  }
}
