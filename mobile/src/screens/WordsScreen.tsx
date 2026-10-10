import { exampleOf, glossOf } from "../game/gloss";
import React, { useEffect, useMemo, useState } from "react";
import { t, nativeLangName, targetLangName, formatNumber } from "../lib/i18n";
import { useMe } from "../lib/useMe";
import { trackOnce } from "../lib/track";
import { View, TextInput, FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { Chip } from "../ui/Chip";
import { NoResultsIcon, WarningIcon } from "../ui/icons";
import { EmptyCard, ScreenHeader } from "../social/common";
import { SpeakButton } from "../ui/SpeakButton";
import { ReportFlag } from "../ui/ReportFlag";
import { useLayout } from "../lib/useLayout";
import { Skeleton, SkeletonLine, SkeletonTile, textHeight } from "../ui/Skeleton";
import { useAuth } from "../lib/AuthContext";
import { api } from "../api/client";
import { STATUS_KEY, WORD_STATUS_FILTERS, statusOf, dueLabelKey, type WordRow, type WordStatus } from "../data/words";
import { grammarLine } from "../game/wordGrammar";
import { firstExample } from "../data/example";
import { useTheme, spacing, radii, type Palette } from "../theme";

/** Filtreler — etiket ANAHTAR tutar (durum etiketleriyle aynı sözlük girdileri).
    Beş bant, satırın yazabildiği her etiket (QA F-0053: "tanıdık" çipte yoktu). */
const FILTERS: { key: "" | WordStatus; label: string }[] = [
  { key: "", label: "words.filter_all" },
  ...WORD_STATUS_FILTERS.map((key) => ({ key, label: STATUS_KEY[key] })),
];

/** Seviye süzgeci — boş "hepsi" demek; uç aynı beş değeri kabul ediyor. */
const LEVELS = ["", "A1", "A2", "B1", "B2", "C1"];

/* Renkler web `word-list` `statusOf` tonlarıyla aynı rolde: mastered mint,
   familiar sky, learning flame, leech rose, new soluk. */
function statusColor(s: WordStatus, colors: Palette): string {
  if (s === "leech") return colors.danger;
  if (s === "mastered") return colors.success;
  if (s === "familiar") return colors.info;
  if (s === "learning") return colors.streak;
  return colors.textMuted;
}

/**
 * Örnek cümle — Almanca (italik) + karşılıklar. `rounds` içindeki
 * `ExampleBlock` ile aynı okuma; ayıklama kuralı `data/example` (web ile ortak).
 */
/* Örnek cümle hedef dilde; altındaki çeviri ANADİLDE (`exampleOf`). Türkçe ve
   İngilizce satır her kullanıcıya birlikte çiziliyordu. */
function ExampleLines({ de, tr, en, deNative, colors }: { de: string | null; tr: string | null; en: string | null; deNative: string | null; colors: Palette }) {
  const g = exampleOf({ sentenceTr: firstExample(tr), sentenceEn: firstExample(en), sentenceDe: firstExample(deNative) });
  const d = firstExample(de), x = g?.text ?? null, e = g?.sub ?? null;
  if (!d && !x && !e) return <Text variant="micro" color={colors.textFaint}>{t("words.not_studied")}</Text>;
  return (
    <View>
      {d ? <Text variant="body" color={colors.text} style={{ fontStyle: "italic" }}>{d}</Text> : null}
      {x ? <Text variant="caption" color={colors.textMuted} style={{ marginTop: 3 }}>{x}</Text> : null}
      {e ? <Text variant="caption" color={colors.textFaint} style={{ marginTop: 1 }}>{e}</Text> : null}
    </View>
  );
}

export function WordsScreen() {
  // Tablette satır listesi iki sütuna bölünüyor: görünen kelime sayısı ikiye
  // katlanıyor, satırın kendi genişliği okunur kalıyor (bkz. useLayout).
  const { listColumns } = useLayout();
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [q, setQ] = useState("");
  /* Seviye süzgeci: uç `?level=` destekliyordu (web listesi kullanıyor) ama
     mobil hiç göndermiyordu - kullanıcı yalnız seviyesindeki kelimeleri
     ayıramıyordu. */
  const [level, setLevel] = useState("");
  const [filter, setFilter] = useState<"" | WordStatus>("");
  const [remote, setRemote] = useState<WordRow[] | null>(null);
  const [phase, setPhase] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);
  /*
   * SAYFALAMA. Uç `page` ve `hasMore` alanlarını BAŞTAN BERİ gönderiyor
   * (`/api/words`) ve mobil ikisini de atıyordu: kullanıcı binlerce kelimenin
   * ilk otuzunu görüyor, gerisine ulaşmanın hiçbir yolu olmuyordu - listenin
   * sonunda "hepsi bu kadar" gibi duruyordu. Web ileri/geri düğmeleriyle
   * geziniyor; telefonda doğal karşılığı listenin sonuna eklenen "daha
   * fazla" düğmesi.
   */
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  /** Açık satır — web listesi de tek satırı açıyor (`open`). */
  const [open, setOpen] = useState<number | null>(null);

  // Sunucudan getir (arama/süzgeç değişince). Hata: uydurma liste yok, "tekrar dene".
  useEffect(() => {
    if (!user) { setPhase("error"); return; }
    let alive = true;
    // İlk sayfada iskelet; sonraki sayfalarda liste yerinde kalıyor.
    if (page === 0) setPhase("loading");
    const params = new URLSearchParams();
    /* ARAMA ÖLÇÜLÜYOR — ekran başına bir kez, web kelime listesiyle aynı ad ve
       aynı kind (`trackOnce("search", uzunluk, "words")`). Android'de arama
       kutusu vardı ama hiç ölçülmüyordu: "arama kullanılıyor mu" sorusu yalnız
       webden cevaplanıyor, Android sıfır görünüyordu. */
    if (q.trim()) { params.set("q", q.trim()); trackOnce("search", q.trim().length, "words"); }
    if (filter) params.set("status", filter);
    if (level) params.set("level", level);
    if (page) params.set("page", String(page));
    api<{ words: WordRow[]; hasMore?: boolean }>(`/api/words?${params.toString()}`)
      .then((d) => {
        if (!alive) return;
        setRemote((prev) => (page === 0 ? (d.words ?? []) : [...(prev ?? []), ...(d.words ?? [])]));
        setHasMore(Boolean(d.hasMore));
        setPhase("ready");
      })
      .catch(() => { if (alive) setPhase("error"); });
    return () => { alive = false; };
  }, [user, q, filter, level, attempt, page]);

  /* Arama ya da süzgeç değişince sayfa başa dönüyor: yoksa ikinci sayfadan
     süzülmüş bir liste isteniyor ve kullanıcı boş sonuç görüyordu. */
  useEffect(() => { setPage(0); setOpen(null); }, [q, filter, level]);

  const list = useMemo(() => remote ?? [], [remote]);
  const { me, loading: meLoading } = useMe();
  const seen = me?.levels ? me.levels.reduce((a, l) => a + l.seen, 0) : null;

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      {/* İLERLEME ÖZETİ — web listesi başlığın altında yazıyor; sayılar zaten
          `useMe` içinde geliyor, ek istek yok. */}
      <ScreenHeader
        title={t("words.my_words")}
        /* "görüldü" = ÇALIŞILMIŞ kelime (seviye kırılımının `seen` toplamı), web
           `/words` ve Gelişim ile aynı sayı. `totalWords` sözlüğün TAMAMI ve burada
           "8.695 görüldü" yazıyordu (QA F-0041). Kırılım yoksa (eski uç) satır yok. */
        subtitle={me && seen !== null ? t("words.progress_summary", { mastered: formatNumber(me.mastered), seen: formatNumber(seen), due: me.dueCount ?? 0 }) : undefined}
        /* `me` inerken satırın yeri tipik sayılarla kurulmuş cümlenin iskeleti: başlık büyüyüp liste kaymasın. */
        subtitlePending={meLoading ? t("words.progress_summary", { mastered: formatNumber(120), seen: formatNumber(480), due: 12 }) : null}
      />

      <View style={{ paddingHorizontal: spacing.lg, gap: spacing.md, paddingBottom: spacing.md }}>
        {/* Liste CANLI süzülüyor; return tuşunun işi klavyeyi kapatmak. */}
        <TextInput
          returnKeyType="done"
          value={q}
          onChangeText={setQ}
          placeholder={t("words.search", { target: targetLangName(), nativeLang: nativeLangName() })}
          accessibilityLabel={t("words.search", { target: targetLangName(), nativeLang: nativeLangName() })}
          placeholderTextColor={colors.textFaint}
          autoCapitalize="none"
          style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, paddingHorizontal: spacing.lg, paddingVertical: spacing.md, color: colors.text, fontSize: 15 }}
        />
        {/* Seviye şeridi — web listesindeki seviye süzgecinin karşılığı. */}
        <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
          {LEVELS.map((lv) => (
            <Chip key={lv || "all"} variant="filter" tone="info" role="radio" active={level === lv} onPress={() => setLevel(lv)} label={lv || t("words.filter_all_levels")} />
          ))}
        </View>
        {/* Beş durum + "Tümü" dar ekrana sığmıyor: şerit SARILIYOR (seviye şeridi gibi). */}
        <View style={{ flexDirection: "row", gap: spacing.sm, flexWrap: "wrap" }}>
          {FILTERS.map((f) => (
            <Chip key={f.key || "all"} variant="filter" tone="primary" role="radio" active={filter === f.key} onPress={() => setFilter(f.key)} label={t(f.label)} />
          ))}
        </View>
      </View>

      <FlatList
        data={list}
        keyExtractor={(w) => String(w.id)}
        // `key` sütun sayısıyla değişmeli: FlatList numColumns'un çalışırken
        // değişmesine izin vermiyor, döndürmede hata fırlatırdı.
        key={listColumns}
        numColumns={listColumns}
        columnWrapperStyle={listColumns > 1 ? { gap: spacing.sm } : undefined}
        contentContainerStyle={{ paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.xxl, gap: spacing.sm }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          phase === "loading" ? (
            /* Spinner yerine satır iskeleti: liste dolunca yükseklik değişmiyor.
               Satır DÖRT metin satırı (kelime, anlam, tür, takvim) — iskelet
               ikisini çiziyordu, her satır ~40 px kısa kalıyordu. Geniş
               ekranda liste `listColumns` sütunlu; iskelet de öyle. Satır
               sayısı sütundan bağımsız sekiz: sekiz hücreyi iki sütuna bölmek
               yatay tablette listenin alt yarısını boş bırakıyordu (gerçek
               sayfa 30 kelime, 15 satır). */
            <View style={{ gap: spacing.sm }}>
              {[...Array(8).keys()].map((r) => (
                <View key={r} style={{ flexDirection: "row", gap: spacing.sm }}>
                  {[...Array(listColumns).keys()].map((c) => (
                    <View key={c} style={{ flex: 1, flexDirection: "row", alignItems: "center", gap: spacing.md, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
                      <View style={{ flex: 1 }}>
                        <SkeletonLine variant="bodyStrong" width="55%" />
                        <SkeletonLine variant="caption" width="45%" />
                        <SkeletonLine variant="micro" width="30%" />
                        <SkeletonLine variant="micro" width="38%" />
                      </View>
                      <SkeletonTile size={34} radius={17} />
                      <Skeleton height={textHeight("micro") + 4} width={30} radius={radii.sm} />
                      <SkeletonLine variant="micro" width={40} />
                    </View>
                  ))}
                </View>
              ))}
            </View>
          ) : phase === "error" ? (
            /* Hata da boş hâlle aynı kabukta (`EmptyCard`), duyurulan ve tekrar denenebilen. */
            <View style={{ marginTop: spacing.xl }}>
              <EmptyCard
                live="assertive"
                icon={WarningIcon}
                tint={colors.danger}
                title={t("words.my_words")}
                text={t("words.couldn_t_load_your_words")}
                action={t("common.try_again")}
                onAction={() => setAttempt((n) => n + 1)}
              />
            </View>
          ) : (
            /* Boş hâl EV KALIBINDA (`social/common.tsx` `EmptyCard`): ikon
               karosu + başlık + açıklama + isteğe bağlı düğme. Burada yalnız
               ortalanmış sönük bir cümle vardı. Sebep de ikiye ayrılıyor:
               süzgeçler açıkken listenin boş olmasının yolu süzgeçleri
               kaldırmak, bunu söylemeyen ekran kullanıcıyı listenin gerçekten
               boş olduğuna inandırıyordu. */
            <View style={{ marginTop: spacing.xl }}>
              <EmptyCard
                icon={NoResultsIcon}
                tint={colors.info}
                title={t("words.no_words_found")}
                text={t("words.empty_sub")}
                action={q || level || filter ? t("words.clear_filters") : undefined}
                onAction={q || level || filter ? () => { setQ(""); setLevel(""); setFilter(""); } : undefined}
              />
            </View>
          )
        }
        ListFooterComponent={
          phase === "ready" && hasMore ? (
            <PressableScale onPress={() => setPage((p) => p + 1)} style={{ marginTop: spacing.md, paddingVertical: spacing.md, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.border, alignItems: "center" }}>
              <Text variant="bodyStrong" color={colors.primaryText}>{t("words.load_more")}</Text>
            </PressableScale>
          ) : undefined
        }
        renderItem={({ item: w }) => {
          const st = statusOf(w);
          const sc = statusColor(st, colors);
          const due = dueLabelKey(w.dueAt);
          const isOpen = open === w.id;
          const say = w.artikel ? `${w.artikel} ${w.de}` : w.de;
          // Anlam ANADİLDE; satır herkese Türkçe gösteriyordu.
          const gloss = glossOf(w);
          return (
            // Çok sütunda satır paydan payını alsın; tek sütunda `flex` VERİLMEZ,
            // FlatList'in dikey kabında yüksekliği doldurmaya çalışırdı.
            <View style={{ flex: listColumns > 1 ? 1 : undefined, backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline }}>
              <PressableScale onPress={() => setOpen(isOpen ? null : w.id)} style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, paddingHorizontal: spacing.lg, paddingVertical: spacing.md }}>
                <View style={{ flex: 1 }}>
                  <Text variant="bodyStrong">{say}</Text>
                  {/* İngilizce karşılık AYNI satırda, ayraçla: web listesi de
                      böyle yazıyor - üçüncü bir satır listeyi taramayı
                      zorlaştırırdı. Alan uçtan yeni geliyor. */}
                  <Text variant="caption" color={colors.textMuted}>
                    {gloss.text}{gloss.sub ? ` · ${gloss.sub}` : ""}
                  </Text>
                  {/* Tür ve çoğul — web listesi de aynı satırı yazıyor. */}
                  <Text variant="micro" color={colors.textFaint}>{grammarLine(w, w.tr)}</Text>
                  {/* TEKRAR TAKVİMİ: ne zaman geleceği ve kaç kez zorlanıldığı.
                      Web listesi ikisini de yazıyor; mobil yalnız durumu
                      gösteriyordu, yani "bu kelime beni zorluyor" bilgisi
                      hiçbir yerde yoktu. */}
                  <Text variant="micro" color={colors.textFaint}>
                    {t(due.key, due.n === undefined ? undefined : { n: due.n })}
                    {w.lapses ? ` · ${t("words.n_lapses", { n: w.lapses })}` : ""}
                  </Text>
                </View>
                <SpeakButton word text={say} size={34} />
                <View style={{ backgroundColor: colors.surface2, borderRadius: radii.sm, paddingHorizontal: 7, paddingVertical: 2 }}>
                  <Text variant="micro" color={colors.textMuted}>{w.niveau}</Text>
                </View>
                {/* Durum yalnız RENKLİ ETİKET: önündeki 9 dp'lik nokta etiketin
                    rengini tekrar ediyordu ve tek başına ne olduğu okunmuyordu
                    (QA F-0053). Web satırı da yalnız etiket yazıyor. */}
                <Text variant="micro" color={sc}>{t(STATUS_KEY[st])}</Text>
              </PressableScale>
              {/* ÖRNEK CÜMLE. Web satırı dokununca açılıyor ve örneği
                  çevirisiyle gösteriyor; mobilde hiçbir yerde yoktu - kelime
                  listesi kelimeyi cümle içinde bir kez bile göstermiyordu. */}
              {isOpen ? (
                /* Kelimenin "Bildir"i açılan ayrıntının eylem satırında: satırın
                    kendisi (hoparlör, seviye, durum) dar ekranda zaten dolu. */
                <View style={{ borderTopWidth: 1, borderTopColor: colors.hairline, paddingHorizontal: spacing.lg, paddingTop: spacing.md, paddingBottom: spacing.xs }}>
                  <ExampleLines de={w.beispiel ?? null} tr={w.beispielTr ?? null} en={w.beispielEn ?? null} deNative={w.beispielDe ?? null} colors={colors} />
                  <ReportFlag report={{ surface: "words", target: { type: "word", id: String(w.id) }, snapshot: { word: say, meaning: gloss.text, meaningSub: gloss.sub ?? null, grammar: grammarLine(w, w.tr), level: w.niveau, example: w.beispiel ?? null, exampleTr: w.beispielTr ?? null, exampleEn: w.beispielEn ?? null } }} />
                </View>
              ) : null}
            </View>
          );
        }}
      />
    </View>
  );
}
