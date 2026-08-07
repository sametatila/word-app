/**
 * Yol haritasının modül (ünite) katmanı.
 *
 * Müfredat her seviyeyi 10 derslik 10 tematik modüle bölüyor
 * (data/lessons-plan/topics-*.md) ama ders verisi bunu taşımıyor: modül,
 * içerik motorunun değil sunumun kavramı. Harita dersleri katalog sırasıyla
 * 10'arlı dilimleyip temayı buradan alıyor — dersin kendisine modül alanı
 * eklemek, 500 dosyalık içerikte tekrarlanan ama yalnızca tek ekranda
 * kullanılan bir alan yaratırdı.
 *
 * Adlar topics dosyalarındaki modül başlıklarının tema kısmı; parantez içi
 * dilbilgisi notları öğrenciye değil üreticiye yazıldığı için burada yok.
 */
export const MODULE_SIZE = 10;

export const MODULE_THEMES: Record<string, string[]> = {
  A1: [
    "Tanışma ve ben",
    "Aile ve insanlar",
    "Yeme-içme",
    "Günlük düzen",
    "Alışveriş",
    "Şehirde",
    "Ev ve yaşam",
    "Boş zaman",
    "Sağlık ve vücut",
    "İletişim ve geçmişe ilk adım",
  ],
  A2: [
    "Geçmişi anlatmak",
    "Benim hikâyem",
    "Sağlık",
    "Ev ve mahalle",
    "İş hayatı",
    "Alışveriş ve hizmetler",
    "Seyahat",
    "Kutlamalar ve ilişkiler",
    "Medya ve teknoloji",
    "Şehir ve resmî işler",
  ],
  B1: [
    "İş dünyası",
    "Ev ve kira dünyası",
    "Bağlaç ustalığı",
    "İlgi cümleleri",
    "Bürokrasi",
    "Eğitim ve gelişim",
    "Fikir ve tartışma",
    "Sağlık sistemi",
    "Çevre ve şehir yaşamı",
    "Duygular ve hayaller",
  ],
  B2: [
    "Profesyonel iletişim",
    "Müzakere ve şikâyet",
    "Edilgenin bütün hâlleri",
    "Medya ve aktarılan söz",
    "Bilim ve teknoloji",
    "Toplum ve ekonomi",
    "Kültür ve sanat",
    "Para ve kariyer stratejisi",
    "İnsan ilişkileri ve psikoloji",
    "Resmî yazışma ve kapanış",
  ],
  C1: [
    "Zarif iş iletişimi",
    "Kip parçacıkları",
    "Retorik ve sunum sanatı",
    "Deyimler ve mecazlar",
    "Basın ve akademik aktarım",
    "Hukuk ve sözleşme dili",
    "Karmaşık yapılar",
    "Toplumsal tartışma",
    "Mizah, ironi ve incelik",
    "Ustalık sahneleri",
  ],
};

/** Modül teması — bilinmeyen seviye ya da taşan dilim için boş döner. */
export function moduleTheme(level: string, moduleIdx: number): string {
  return MODULE_THEMES[level]?.[moduleIdx] ?? "";
}
