import React, { useEffect, useRef, useState } from "react";
import { t, currentLang, nativeLangName, dateLocale } from "../lib/i18n";
import { track } from "../lib/track";
import { currentCourseId } from "../lib/courses";
import { View, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRoute, type RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Text } from "../ui/Text";
import { PressableScale } from "../ui/PressableScale";
import { XIcon, SpeakerIcon } from "../ui/icons";
import { Chip } from "../ui/Chip";
import { ChoiceGame, type ChoiceRound } from "../game/ChoiceGame";
import { RoundSkeleton } from "../game/RoundSkeleton";
import { demoPlacementFor, estimateLevel } from "../data/demoPlacement";
import {
  startPlacement,
  fetchPlacementStatus,
  finishPlacement,
  acceptPlacement,
  type PlacementQuestion,
  type PlacementAnswer,
  type PlacementRecord,
  type PlacementStatus,
} from "../game/placement";
import { useAuth } from "../lib/AuthContext";
import { updateProfile } from "../lib/updateProfile";
import { saveOnboardingPrefs } from "../lib/onboardingPrefs";
import type { RootStackParams } from "../navigation/RootStack";
import { useTheme, spacing, radii, softShadow, type Palette } from "../theme";
import { sfx } from "../lib/sfx";
import { speakTarget } from "../lib/tts";
import { ConfirmDialog } from "../ui/ConfirmDialog";
import { useBackConfirm } from "../lib/useBackConfirm";

/** Kullanıcının seçebileceği seviyeler — web `PLACEMENT_LEVELS` ile aynı. */
const CHOOSABLE = ["A1", "A2", "B1", "B2", "C1"] as const;

/** Ekranın oynadığı birleşik soru — hem sunucudan geleni hem demo aynı biçime düşer. */
type PQ = {
  round: ChoiceRound;
  level: PlacementAnswer["level"];
  itemId: string;
  stage: PlacementAnswer["stage"];
  /** Okuma metni / dinleme bölümleri — sorunun ÜSTÜNDE gösteriliyor. */
  head?: { title: string; text?: string; segments?: { speaker?: string; text: string }[]; listen: boolean };
};

/**
 * DÖRT AŞAMA TEK SIRADA. Kelime ve dil bilgisi doğrudan şıklı soru; okuma ve
 * dinleme sorunun üstünde metni (ya da dinleme düğmesini) taşıyor. Aşama adı
 * cevapla birlikte gidiyor: sunucu `perSkill`i ondan çıkarıyor.
 */
function realQuestions(items: PlacementQuestion[]): PQ[] {
  return items.map((q, i) => ({
    round: {
      wordId: i,
      question: q.question,
      answer: q.options[q.answer],
      options: q.options,
      prompt:
        q.kind === "vocab"
          ? t("rounds.ask_native", { nativeLang: nativeLangName() })
          : t(q.kind === "grammar" ? "unitkind.grammar" : q.kind === "reading" ? "unitkind.read" : "unitkind.listen"),
    },
    level: q.level,
    itemId: q.itemId,
    stage: q.kind,
    head: q.kind === "reading" || q.kind === "listening"
      ? { title: q.title, text: q.text, segments: q.segments, listen: q.kind === "listening" }
      : undefined,
  }));
}
function demoQuestions(): PQ[] {
  return demoPlacementFor(currentLang(), currentCourseId()).map((q, i) => ({
    round: { wordId: i, question: q.question, answer: q.answer, options: q.options, prompt: t(q.promptKey, { anadil: nativeLangName() }) },
    level: q.level,
    itemId: q.id,
    stage: "vocab" as const,
  }));
}

/** Okuma metni ya da dinleme düğmesi — sorunun üstündeki bağlam. */
/** Aşamanın ne yaptıracağı — web `placement-test` `STAGE_TITLE_KEYS`. */
const STAGE_TITLE_KEY: Record<string, string> = {
  vocab: "plc.vocab", grammar: "plc.grammar", reading: "plc.reading", listening: "plc.listening",
};

/**
 * BECERİ PROFİLİ — web `lib/placement-score` `describePerSkill` karşılığı.
 *
 * Sunucu dört aşamanın her biri için ayrı bir seviye döndürüyor (`perSkill`)
 * ve tanıtım ekranı bunu açıkça vaat ediyor ("sonunda bir seviye önerisi ve
 * BECERİ PROFİLİ alırsın"). Androidde o satır hiç çizilmiyordu: vaat edilen
 * şey veri olarak geliyor, ekranda görünmüyordu. Aşama adları sınavın kendi
 * bölüm adlarıyla aynı — ikinci bir metin yazılmadı.
 */
const SKILL_LABEL_KEY: Record<string, string> = {
  vocab: "exam.sec_vocab", grammar: "exam.sec_grammar", reading: "exam.sec_reading", listening: "exam.sec_listening",
};

function StageHead({ head, colors }: { head: { title: string; text?: string; segments?: { speaker?: string; text: string }[]; listen: boolean }; colors: Palette }) {
  const say = () => {
    const parcalar = head.segments?.length ? head.segments.map((sg) => sg.text) : head.text ? [head.text] : [];
    speakTarget(parcalar.join(" "));
  };
  return (
    <View style={{ backgroundColor: colors.surface, borderRadius: radii.lg, borderWidth: 1, borderColor: colors.hairline, padding: spacing.lg, marginBottom: spacing.lg }}>
      <Text variant="micro" color={colors.textMuted} style={{ marginBottom: 6 }}>{head.title}</Text>
      {head.listen ? (
        <PressableScale onPress={say} accessibilityLabel={t("common.listen")} style={{ flexDirection: "row", alignItems: "center", gap: spacing.sm, alignSelf: "flex-start", backgroundColor: colors.surface2, borderRadius: radii.md, paddingHorizontal: spacing.md, paddingVertical: 9 }}>
          <SpeakerIcon color={colors.primaryText} size={20} />
          <Text variant="bodyStrong" color={colors.primaryText}>{t("common.listen")}</Text>
        </PressableScale>
      ) : (
        <Text variant="body" style={{ lineHeight: 22 }}>{head.text ?? head.segments?.map((sg) => sg.text).join(" ")}</Text>
      )}
    </View>
  );
}

/** `perSkill` -> "Kelime B1 · Dilbilgisi A2 · ..." (web `describePerSkill`). */
function describePerSkill(perSkill: Record<string, string | null> | undefined): string {
  if (!perSkill) return "";
  return Object.keys(perSkill)
    .filter((k) => perSkill[k] !== undefined && SKILL_LABEL_KEY[k])
    .map((k) => `${t(SKILL_LABEL_KEY[k])} ${perSkill[k] ?? t("plc.below_a1")}`)
    .join(" · ");
}

export function PlacementScreen() {
  const { colors } = useTheme();
  const insets = useSafeAreaInsets();
  const nav = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { params } = useRoute<RouteProp<RootStackParams, "Placement">>();
  const onboarding = params?.onboarding === true;
  // Onboarding'de bu ekran yığının köküdür; çıkış = giriş duvarı (Auth). Uygulama
  // içinde tekrar testte ise geri döner.
  const leave = () => { if (onboarding) nav.reset({ index: 0, routes: [{ name: "Auth" }] }); else nav.goBack(); };
  const { user } = useAuth();

  // Gerçek test (oturum açıksa sunucudan). Yüklenene dek loading; hata → demo.
  const [real, setReal] = useState<PlacementQuestion[] | null>(null);
  const [loading, setLoading] = useState<boolean>(!!user);
  const [loadError, setLoadError] = useState(false);
  const [attempt, setAttempt] = useState(0);
  const [idx, setIdx] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [result, setResult] = useState<PlacementRecord | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [saved, setSaved] = useState(false);
  /* Bekleme süresi: sunucu bunu bildiriyor ama ZORLAMIYOR (bkz.
     `fetchPlacementStatus`). Onboarding'de sorulmuyor - orada zaten ilk kez
     alınıyor ve hesap bile yeni. */
  const [status, setStatus] = useState<PlacementStatus | null>(null);
  /** Sonuç sunucuya yazılamadı: seviye yine de profile yazılıyor. */
  const [notSaved, setNotSaved] = useState(false);
  /*
   * SEVİYEYİ KULLANICI SEÇEBİLİYOR.
   *
   * Sunucu öneriyi veriyor ama `accept` HANGİ seviyeyi kabul ettiğini ayrıca
   * alıyor (`acceptPlacement(id, level)`) - yani "önerine katılmıyorum, ben
   * B1'den başlayacağım" baştan beri mümkündü. Mobil her zaman öneriyi
   * uyguluyordu; kendi seviyesini bilen kullanıcının burada söyleyecek sözü
   * yoktu. Web beş seviyeyi çip olarak gösteriyor (`placement-test`).
   */
  const [chosen, setChosen] = useState<string | null>(null);
  /*
   * TANITIM EKRANI — web `placement/placement-test` `phase === "intro"`.
   *
   * Android testi DOĞRUDAN başlatıyordu: kaç aşama olduğunu, ne kadar
   * süreceğini ve sonunda seviyeyi YİNE KENDİSİNİN seçeceğini hiçbir yerde
   * okumadan ilk sorunun içinde buluyordu. Yerleştirme sınavı kullanıcının
   * uygulamayla ilk ciddi teması; ne olduğunu bilmeden girilen on beş
   * dakikalık bir ölçüm yarıda bırakılıyor.
   */
  const [started, setStarted] = useState(false);
  const answers = useRef<PlacementAnswer[]>([]);

  useEffect(() => {
    if (!user) { setReal(null); setLoading(false); return; }
    let alive = true;
    setLoading(true);
    setLoadError(false);
    // Oturumlu kullanıcıda gerçek test gelmezse "örnek" sorulara DÜŞÜLMEZ (uydurma sonuç
    // seviyeyi yanlış ayarlardı); hata gösterilir, tekrar denenir. Misafir (onboarding)
    // yerleşik soru setini kullanır — o akışın gerçek testi budur.
    if (!onboarding) {
      /* Durum test İSTEĞİNDEN önce gelmiyor: iki istek paralel gidiyor ve
         bekleme süresi doluysa ekran soruları hiç göstermeden kapanıyor.
         Sıralı yapmak açılışı iki gecikme kadar yavaşlatırdı. */
      fetchPlacementStatus().then((st) => { if (alive) setStatus(st); }).catch(() => { /* durum yoksa test yine açılır */ });
    }
    startPlacement()
      .then((items) => { if (alive) { if (items.length) setReal(items); else setLoadError(true); setLoading(false); } })
      .catch(() => { if (alive) { setLoadError(true); setLoading(false); } });
    return () => { alive = false; };
  }, [user, attempt, onboarding]);

  const usingReal = !!real;
  const questions = usingReal ? realQuestions(real) : user ? [] : demoQuestions();
  const total = questions.length;
  const done = idx >= total;
  /*
   * ÇIKIŞ ONAYA BAĞLI — sınav ekranındaki aynı boşluk.
   *
   * Çarpı ve donanım geri tuşu on beş dakikalık testi tek dokunuşta çöpe
   * atıyordu: cevaplar hiçbir yere kaydedilmiyor, test baştan başlıyor ve
   * bekleme süresi de işlemeye devam ediyor. Tanıtım ekranında ve sonuçta
   * onay YOK — orada kaybedilecek bir şey yok.
   */
  const back = useBackConfirm(started && !done);
  // Önerilen seviye: gerçek modda sunucudan (result), yoksa yerel tahmin.
  const level = chosen ?? result?.suggested ?? estimateLevel(correct);

  /**
   * Aşamayı atla: o aşamanın kalan soruları CEVAPSIZ geçiliyor (web
   * `leaveStage` de öyle - atlanan aşama puanlamada yok sayılıyor).
   */
  function skipStage() {
    const cur = questions[idx]?.stage;
    let next = idx;
    while (next < total && questions[next].stage === cur) next += 1;
    setIdx(next);
    if (next >= total) finishNow();
  }

  /** Test bitti: ses, ve gerçek modda cevapları sunucuya ver. */
  function finishNow() {
    sfx("finish"); // tamamlanma sesi (sonuç ekranı)
    if (!usingReal || !user) return;
    setSubmitting(true);
    finishPlacement(answers.current)
      .then((r) => setResult(r))
      /* Sunucu hata → yerel tahmin gösteriliyor AMA bunun söylenmesi şart:
         kayıt yok demek, sonraki açılışta "son alma" satırının boş olması ve
         bekleme süresinin işlememesi demek. Web aynı notu gösteriyor. */
      .catch(() => setNotSaved(true))
      .finally(() => setSubmitting(false));
  }

  function onDone(ok: boolean) {
    const q = questions[idx];
    if (q) answers.current.push({ stage: q.stage, level: q.level, itemId: q.itemId, correct: ok });
    if (ok) setCorrect((c) => c + 1);
    const next = idx + 1;
    setIdx(next);
    if (next >= total) finishNow();
  }

  async function applyLevel() {
    /* Yerleştirme SONUCU uygulandı — web `demo-placement` ile aynı ad, aynı
       değer (yüzde) ve aynı kind biçimi. Mobil hiç yazmıyordu: kaç kişinin
       seviyesini yerleştirmeye göre ayarladığı ölçülmüyordu. */
    track("placement_finish", total ? Math.round((correct / total) * 100) : 0, `${usingReal ? "real" : "demo"}:${String(level).toLowerCase()}`);
    // Onboarding'de misafir: seviye yerel prefs'e; hesap açınca profile taşınır.
    if (onboarding) await saveOnboardingPrefs({ level });
    if (user) {
      try {
        if (result) await acceptPlacement(result.id, level);
        else await updateProfile({ level });
      } catch { /* yut: yine de kapat */ }
    }
    setSaved(true);
    setTimeout(leave, 700);
  }

  // Misafir yolunda bu paritenin hazır seti yoksa soru üretilemez; sessiz boş
  // ekran yerine sebebi söylenir (onboarding bu seçeneği zaten göstermiyor).
  if (!user && !questions.length) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("placement.no_demo")}</Text>
        <PressableScale onPress={leave} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.close")}</Text>
        </PressableScale>
      </View>
    );
  }

  if (user && !loading && loadError) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center" }}>{t("placement.couldn_t_load_test")}</Text>
        <PressableScale onPress={() => setAttempt((n) => n + 1)} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.try_again")}</Text>
        </PressableScale>
        <PressableScale onPress={leave} style={{ paddingVertical: spacing.sm }}><Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text></PressableScale>
      </View>
    );
  }

  if (loading) return <RoundSkeleton label />;

  /*
   * BEKLEME SÜRESİ DOLMADIYSA TEST AÇILMIYOR.
   *
   * Test 30 günde bir alınabiliyor; sunucu bunu yalnız BİLDİRİYOR, kapıyı
   * istemci tutuyor. Mobil hiç sormadığı için Android'de test istenildiği
   * kadar tekrarlanabiliyor ve her bitiş seviyeyi yeniden yazabiliyordu.
   * Web aynı yerde son almayı ve kalan süreyi söylüyor (`placement-test`).
   */
  if (user && status && !status.canRetake) {
    const last = status.last;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, alignItems: "center", justifyContent: "center", gap: spacing.md, padding: spacing.xl }}>
        <Text variant="h2" style={{ textAlign: "center" }}>{t("placement.title")}</Text>
        {last ? (
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 20 }}>
            {t("placement.last_taken", { date: new Date(last.at).toLocaleDateString(dateLocale(), { day: "numeric", month: "short", year: "numeric" }) })} {last.suggested}
            {last.accepted ? ` ${t("placement.you_chose", { level: last.accepted })}` : ""}
          </Text>
        ) : null}
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", lineHeight: 22 }}>{t("placement.retake_in", { n: status.retakeDays })}</Text>
        <PressableScale onPress={leave} style={[{ paddingHorizontal: 22, paddingVertical: 12, borderRadius: radii.lg, backgroundColor: colors.primary }, softShadow(colors.primary, 8)]}>
          <Text variant="bodyStrong" color={colors.onPrimary}>{t("common.close")}</Text>
        </PressableScale>
      </View>
    );
  }

  /* TANITIM — soru gelmeden çizilmiyor: "başla" düğmesi boş bir teste
     götürürdü. `exam_start` de tam burada yazılıyor; eskiden ekranı AÇAN
     herkes "başladı" sayılıyordu ve huninin payı olduğundan büyüktü. */
  if (!started && !done && total > 0) {
    const last = status?.last;
    return (
      <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg, justifyContent: "center" }}>
        <Text variant="h1" style={{ textAlign: "center" }}>{t("onboarding.kisa_yerlestirme_sinavi")}</Text>
        <Text variant="body" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.md, lineHeight: 22 }}>{t("plc.intro")}</Text>
        {last ? (
          <Text variant="caption" color={colors.textMuted} style={{ textAlign: "center", marginTop: spacing.lg, lineHeight: 20 }}>
            {t("placement.last_taken", { date: new Date(last.at).toLocaleDateString(dateLocale(), { day: "numeric", month: "short", year: "numeric" }) })} {last.suggested}
            {last.accepted ? ` ${t("placement.you_chose", { level: last.accepted })}` : ""}
          </Text>
        ) : null}
        <PressableScale
          onPress={() => { track("exam_start", 0, "placement:A1"); setStarted(true); }}
          style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: 16, alignItems: "center", marginTop: spacing.xxl }, softShadow(colors.primary, 10)]}
        >
          <Text variant="h3" color={colors.onPrimary}>{t("common.start")}</Text>
        </PressableScale>
        <PressableScale onPress={leave} style={{ paddingVertical: spacing.lg, marginTop: spacing.sm }}>
          <Text variant="bodyStrong" color={colors.textMuted}>{t("common.later")}</Text>
        </PressableScale>
      </View>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg, paddingTop: insets.top + spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: insets.bottom + spacing.lg }}>
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md, marginBottom: spacing.xl }}>
        {/* Simge tek başına: ekran okuyucu için adı olmalı - öteki ekranların
            kapatma düğmeleri baştan beri `common.close` taşıyor. */}
        <PressableScale hitSlop={4} onPress={started && !done ? back.ask : leave} accessibilityLabel={t(started && !done ? "plc.quit_title" : "common.close")} style={{ width: 44, height: 44, borderRadius: radii.md, alignItems: "center", justifyContent: "center", backgroundColor: colors.surface2 }}>
          <XIcon color={colors.textMuted} size={22} />
        </PressableScale>
        <View style={{ flex: 1, height: 10, borderRadius: 5, backgroundColor: colors.surface2, overflow: "hidden" }}>
          <View style={{ height: "100%", width: `${total ? Math.round((Math.min(idx, total) / total) * 100) : 0}%`, backgroundColor: colors.primary, borderRadius: 5 }} />
        </View>
        <Text variant="bodyStrong" color={colors.textMuted}>{Math.min(idx + (done ? 0 : 1), total)}/{total}</Text>
      </View>

      {!done ? (
        <>
          <Text variant="micro" color={colors.textMuted} style={{ textAlign: "center", marginBottom: spacing.md, textTransform: "uppercase", letterSpacing: 1 }}>
            {t("placement.title")}{usingReal ? "" : t("placement.sample")}
          </Text>
          {/*
            OKUMA VE DİNLEME BAŞLIĞI. Okuma sorusunun üstünde metin duruyor;
            dinlemede metin GÖRÜNMÜYOR, bölümler sesli okunuyor (dinleme
            ölçümünün anlamı bu). Web aynı ayrımı yapıyor (`placement-test`
            okuma metnini yazıyor, dinlemede oynat düğmesi veriyor).
          */}
          {/*
            AŞAMA NE SORUYOR + ATLAMA + "BİLMİYORUM". Üçü de mobilde yoktu:
            ekran doğrudan soruya başlıyordu. Bilmeyen kullanıcının tek yolu
            TAHMİN etmekti ve tutan bir tahmin yerleştirme seviyesini
            yükseltiyordu - ölçümün kendisini bozan bir eksiklik. Web üçünü de
            veriyor (`placement/placement-test`); "bilmiyorum" yanlış cevapla
            aynı, farkı tahmini ortadan kaldırması.
          */}
          <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm, marginBottom: spacing.sm }}>
            <Text variant="caption" color={colors.textMuted} style={{ flex: 1, lineHeight: 19 }}>
              {t(STAGE_TITLE_KEY[questions[idx].stage] ?? "plc.vocab")}
            </Text>
            <PressableScale onPress={skipStage} hitSlop={6}>
              <Text variant="caption" color={colors.primaryText}>{t("plc.skip_stage")}</Text>
            </PressableScale>
          </View>
          {questions[idx].head ? <StageHead head={questions[idx].head!} colors={colors} /> : null}
          {/* GERÇEK testte cevap açılmıyor, DEMO'da açılıyor: web de tam
              böyle bölünmüş (`placement-test` yalnız seçimi işaretliyor,
              `demo-placement` cevabı açıyor). Androidde ikisi de açıyordu,
              yani kullanıcının seviyesini ölçen test aynı zamanda ona
              öğretiyordu ve sonraki cevaplar bundan etkileniyordu. */}
          <ChoiceGame key={idx} round={questions[idx].round} onDone={onDone} reveal={!usingReal} />
          <PressableScale onPress={() => onDone(false)} style={{ marginTop: spacing.md, paddingVertical: 12, alignItems: "center", borderRadius: radii.lg, borderWidth: 1.5, borderColor: colors.border }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("plc.dont_know")}</Text>
          </PressableScale>
        </>
      ) : submitting ? (
        /* Seviye hesaplanirken ekran tamamen bu dala geciyor ve sessizdi;
           webde ayni dal `role="status" aria-busy` tasiyor. */
        <View accessibilityLiveRegion="polite" accessibilityRole="progressbar" accessibilityState={{ busy: true }} style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <ActivityIndicator color={colors.primaryText} />
          <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.md }}>{t("placement.calculating_your_level")}</Text>
        </View>
      ) : (
        <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
          <View style={[{ width: 110, height: 110, borderRadius: 55, alignItems: "center", justifyContent: "center", backgroundColor: colors.primary }, softShadow(colors.primary, 14)]}>
            <Text variant="display" color={colors.onPrimary} style={{ fontSize: 40 }}>{level}</Text>
          </View>
          <Text variant="h1" style={{ marginTop: spacing.xl }}>{t("placement.your_level", { level: level })}</Text>
          <Text variant="body" color={colors.textMuted} style={{ marginTop: spacing.xs, textAlign: "center" }}>
            {t("placement.result", { total: total, correct: correct })}
          </Text>
          {result && describePerSkill(result.perSkill) ? (
            <Text variant="caption" color={colors.textMuted} style={{ marginTop: spacing.sm, textAlign: "center", lineHeight: 20 }}>
              {describePerSkill(result.perSkill)}
            </Text>
          ) : null}
          {/* SONUÇ YAZILAMADI uyarısı çiplerden ÖNCE: kullanıcı seviyesini
              seçmeden önce bilmeli. Web aynı sırayı tutuyor. */}
          {notSaved ? <Text variant="caption" color={colors.dangerText} style={{ textAlign: "center", marginBottom: spacing.md, lineHeight: 19 }}>{t("placement.not_saved")}</Text> : null}
          {/* ÖNERİ NEREDEN GELİYOR. Beş çip seçilebilir duruyordu ama neden
              birinin işaretli olduğu ve seçimin gerçekten kullanıcıda olduğu
              hiçbir yerde yazmıyordu. Web aynı yerde söylüyor. */}
          {user && result ? (
            <Text variant="caption" color={colors.textFaint} style={{ marginTop: spacing.md, marginBottom: spacing.lg, textAlign: "center", lineHeight: 19 }}>{t("placew.median_note")}</Text>
          ) : null}
          <View style={{ height: spacing.lg }} />
          {/* Beş seviye: öneri işaretli, seçim kullanıcının. Yalnız oturumlu
              kullanıcıda - misafir akışında kabul edilecek bir kayıt yok. */}
          {user && result ? (
            <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", gap: spacing.sm, marginBottom: spacing.lg }}>
              {CHOOSABLE.map((l) => (
                <Chip key={l} role="radio" label={l === result.suggested ? `${l} · ${t("placement.suggested")}` : l} active={level === l} onPress={() => setChosen(l)} />
              ))}
            </View>
          ) : null}
          {saved && <Text accessibilityLiveRegion="polite" variant="bodyStrong" color={colors.successText} style={{ marginBottom: spacing.md }}>{t("placement.saved")}</Text>}
          <PressableScale onPress={applyLevel} style={[{ width: "100%", backgroundColor: colors.primary, borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center" }, softShadow(colors.primary, 10)]}>
            <Text variant="h3" color={colors.onPrimary}>
              {user && result
                ? t(level === result.suggested ? "placement.continue_with" : "placement.pick_and_continue", { level: String(level) })
                : t(user ? "placement.set_level" : "placement.understood")}
            </Text>
          </PressableScale>
          <PressableScale onPress={leave} style={{ width: "100%", borderRadius: radii.lg, paddingVertical: spacing.lg, alignItems: "center", marginTop: spacing.sm }}>
            <Text variant="bodyStrong" color={colors.textMuted}>{t("common.close")}</Text>
          </PressableScale>
        </View>
      )}
      <ConfirmDialog
        visible={back.visible}
        title={t("plc.quit_title")}
        message={t("plc.quit_body")}
        confirmLabel={t("common.exit")}
        cancelLabel={t("common.continue_2")}
        destructive
        onConfirm={() => { back.cancel(); leave(); }}
        onCancel={back.cancel}
      />
    </View>
  );
}
