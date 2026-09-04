import Link from "next/link";
import { EntityBlock, Ph } from "@/components/legal-shell";
import { FAIR_USE, hasKep, legalPath } from "@/lib/legal";

/**
 * Nutzungsbedingungen — Deutsch. Informative Übersetzung; verbindlich ist der
 * türkische Text unter /terms (siehe Ziffer 12b). Die Nummerierung der
 * Abschnitte bleibt identisch, damit sich beide Fassungen Ziffer für Ziffer
 * vergleichen lassen.
 */
export const TERMS_DE_TITLE = "Nutzungsbedingungen";
export const TERMS_DE_DESCRIPTION =
  "Die Regeln für die Nutzung von Nomi: Konto, zulässige Nutzung, Nutzerinhalte, KI, Abonnement, Verbraucherrechte.";
export const TERMS_DE_SUMMARY =
  "Mit der Nutzung von Nomi nimmst du diese Vereinbarung an. Der Dienst wird von einem in der Türkei ansässigen Entwickler angeboten und unterliegt türkischem Recht; die zwingenden Verbraucherrechte deines Wohnsitzlandes bleiben unberührt. Dein Konto gehört dir und wird respektvoll gegenüber anderen genutzt; was du schreibst, bleibt dein. KI-Antworten können falsch sein. Das Premium-Abonnement wird über Google Play gekauft und dort gekündigt.";

export function TermsDeBody() {
  return (
    <>
      <h2>1. Parteien und Annahme</h2>
      <p>
        Diese Vereinbarung besteht zwischen dem unten bezeichneten Diensteanbieter (&quot;Nomi&quot;, &quot;wir&quot;) und der Person, die
        die Nomi-Webanwendung (www.exfe.me) oder die Android-App nutzt (&quot;du&quot;). Mit der Erstellung eines Kontos oder der Nutzung
        der App nimmst du diese Bedingungen und die <Link href={legalPath("privacy", "de")}>Datenschutzerklärung</Link> an. Nach dem
        türkischen Gesetz Nr. 6563 ist dieser Text vor Vertragsschluss zugänglich und speicherbar. Wenn du ihn nicht annimmst, nutze die
        App nicht.
      </p>
      <EntityBlock locale="de" />

      <h2>2. Der Dienst</h2>
      <p>
        Nomi ist eine Sprachlern-App mit Übungen zu Wortschatz, Hören, Sprechen und Schreiben: Wiederholungsrunden nach dem
        Spaced-Repetition-Prinzip, Lektionen, Sprechpraxis mit KI, Gehmodus, Schreibbewertung, Prüfungsvorbereitung, eine
        Wochen-Rangliste und Freundesfunktionen. Die Kurse sind Deutsch (Hochdeutsch), Zürichdeutsch und Englisch; die Kursliste kann sich
        im Laufe der Zeit ändern, und nicht jede Funktion ist in jedem Kurs gleichzeitig verfügbar. Funktionen können hinzugefügt, geändert
        oder entfernt werden; Änderungen, die bezahlte Funktionen betreffen, kündigen wir vorher an.
      </p>

      <h2>3. Konto und Alter</h2>
      <ul>
        <li>Nomi richtet sich an Erwachsene: Für ein Konto musst du mindestens 18 Jahre alt sein. Konten, von denen wir erfahren, dass sie einer Person unter 18 gehören, schließen wir und löschen die Daten.</li>
        <li>Deine Kontodaten müssen richtig sein; gib dein Passwort niemals weiter. Für Aktivitäten über dein Konto bist du verantwortlich; melde uns unbefugte Nutzung.</li>
        <li>Du kannst dein Konto jederzeit löschen: in der App unter Profil &rsaquo; Einstellungen &rsaquo; Konto oder im Web über die <Link href={legalPath("deleteAccount", "de")}>Seite zur Kontolöschung</Link>. Die Löschung ist unwiderruflich.</li>
      </ul>

      <h2>4. Zulässige Nutzung</h2>
      <p>Untersagt ist:</p>
      <ul>
        <li>Beleidigungen, Hassrede, Belästigung, sexuelle Inhalte, Identitätsvortäuschung, Offenlegung personenbezogener Daten oder Werbung im Anzeigenamen oder in Texten, die du teilst,</li>
        <li>die Rangliste, Serien und Aufgaben durch Automatisierung, Fake-Konten oder Betrug zu manipulieren,</li>
        <li>den Dienst zu reverse-engineeren, zu scrapen, zu überlasten oder den Zugang anderer zu blockieren,</li>
        <li>die KI-Sprechpraxis zu nutzen, um rechtswidrige, schädliche oder gegen andere gerichtete Inhalte zu erzeugen,</li>
        <li>geltendes Recht zu verletzen, einschließlich Urheberrecht, Datenschutzrecht und Sanktionsvorschriften.</li>
      </ul>
      <p>
        Bei einem Verstoß können wir Inhalte entfernen, Funktionen einschränken oder das Konto schließen; wir teilen dir die Entscheidung
        und ihre Begründung mit, und du kannst unter <Ph k="supportEmail" /> Widerspruch einlegen. Schwere Verstöße erfordern keine
        Vorwarnung.
      </p>

      <h2>5. Deine Inhalte und Meldungen</h2>
      <p>
        Die Texte, die du schreibst, die Transkripte dessen, was du sprichst, und dein Anzeigename gehören dir. Du erteilst uns nur das
        weltweite, nicht ausschließliche und unentgeltliche Nutzungsrecht, das zur Erbringung des Dienstes erforderlich ist: bewerten,
        Rückmeldung erzeugen und so viel wie du auswählst (Anzeigename, Fortschritt) anderen Nutzern zeigen. Wir nutzen deine Inhalte nicht
        für Werbung oder Modelltraining; mit der Löschung deines Kontos endet das Nutzungsrecht.
      </p>
      <p>
        Wenn du einen rechtswidrigen oder diesen Bedingungen widersprechenden Inhalt siehst (Name oder Verhalten eines anderen Nutzers),
        kannst du ihn über die Schaltfläche &quot;Melden&quot; in der App oder unter <Ph k="supportEmail" /> melden; dies ist auch die
        einzige Kontaktstelle für Meldungen nach dem EU-Gesetz über digitale Dienste (DSA). Meldungen werden von einem Menschen geprüft;
        Entscheidung und Rechtsbehelf werden der meldenden Person und dem Inhaber des Inhalts mitgeteilt. Die Freundesfunktionen enthalten
        Schaltflächen zum Blockieren und Melden.
      </p>

      <h2>5a. Soziale Funktionen</h2>
      <ul>
        <li>Ein Benutzername besteht aus 3-20 Zeichen (Buchstaben, Ziffern, Unterstrich); den Namen einer anderen Person, eine Marke oder eine irreführende Identität darfst du nicht verwenden. Unangemessene Namen können geändert werden.</li>
        <li>Dein soziales Profil ist standardmäßig öffentlich; Sichtbarkeit, Freundschaftsanfragen und das Teilen von Aktivität verwaltest du unter Einstellungen &rsaquo; Soziales.</li>
        <li>Blockieren wirkt beidseitig und wird nicht mitgeteilt. Meldungen werden von einem Menschen geprüft; unwahre oder missbräuchliche Meldungen sind selbst ein Regelverstoß.</li>
        <li>Es gibt keine privaten Nachrichten; Reaktionen, Anstöße und gemeinsame Aufgaben sind auf deine Freunde beschränkt.</li>
      </ul>

      <h2>6. KI-Inhalte</h2>
      <ul>
        <li>Sprechpraxis und Bewertungen werden von Sprachmodellen erzeugt; die App weist deutlich darauf hin, wo du mit einer KI interagierst. Antworten können falsch, unvollständig oder widersprüchlich sein; Grammatikkorrekturen dürfen nicht als endgültig richtig gelten.</li>
        <li>Eine anstößige oder fehlerhafte Antwort kannst du ohne die App zu verlassen über &quot;Melden&quot; unter der Antwort melden.</li>
        <li>KI-Figuren sind keine echten Personen; sie erteilen keine medizinische, rechtliche oder finanzielle Beratung.</li>
      </ul>

      <h2>7. Premium-Abonnement, Zahlung und Widerruf</h2>
      <ul>
        <li><strong>Kauf:</strong> Premium wird unter Android über Google Play Billing gekauft; die Zahlung wird von Google Play abgewickelt, und die Google Play-Nutzungsbedingungen gelten zusätzlich. Preis, Währung, Laufzeit, Testbedingungen und Steuern zeigt Play im Moment des Kaufs an; diese Angaben bilden die vorvertragliche Information nach dem türkischen Gesetz Nr. 6502 und der Fernabsatzverordnung.</li>
        <li><strong>Verlängerung und Kündigung:</strong> Wird das Abonnement nicht mindestens 24 Stunden vor Ende der Laufzeit gekündigt, verlängert es sich um denselben Zeitraum. Kündigung und Verwaltung finden sich im Play Store &rsaquo; Zahlungen und Abos; das Löschen des Kontos kündigt das Abonnement nicht. Kündigst du vor Ende einer kostenlosen Testphase, fällt keine Gebühr an.</li>
        <li><strong>Widerrufsrecht:</strong> Da die Erbringung eines digitalen Inhaltsdienstes im Moment des Kaufs beginnt, endet das Widerrufsrecht nach Art. 15/1-ğ der türkischen Fernabsatzverordnung und Art. 16(m) der EU-Verbraucherrechterichtlinie mit deiner Zustimmung zum Beginn der Erbringung; diese Zustimmung wird auf dem Kaufbildschirm eingeholt. Die Rückerstattungsrichtlinie von Google Play gilt zusätzlich, und von Play gewährte Rückerstattungen erkennen wir an.</li>
        <li><strong>Preisänderung:</strong> Preisänderungen teilen wir vor ihrem Inkrafttreten über Play mit; nimmst du eine nicht an, kannst du das Abonnement kündigen.</li>
        <li><strong>Kaufbeleg:</strong> Premium kaufst du über Google Play; den Beleg stellt Google aus und sendet ihn an die E-Mail-Adresse deines Play-Kontos. Eine Kopie kannst du über den Google-Play-Support anfordern. Anbieter des Dienstes ist keine Gesellschaft, sondern eine natürliche Person; da die Einkünfte unter die türkische Einkommensteuerbefreiung für die Entwicklung mobiler Anwendungen fallen, wird keine gesonderte Rechnung ausgestellt.</li>
      </ul>

      <h2>7a. Fair Use</h2>
      <p>
        Um die Kontingente der KI- und Spracherkennungsanbieter für alle zu schützen, gelten tägliche Grenzen pro Konto:{" "}
        {FAIR_USE.roleplayTurnsPerDay} Runden Sprechpraxis, {FAIR_USE.sttRequestsPerDay} serverseitige Spracherkennungsanfragen,{" "}
        {FAIR_USE.pronounceRequestsPerDay} Anfragen zur Aussprachebewertung und {FAIR_USE.reportsPerDay} Inhaltsmeldungen. Ist eine Grenze
        erreicht, zeigt die App es an, und am nächsten Tag ist sie wieder offen. Die Grenzen liegen weit über ehrlicher intensiver Nutzung;
        sie bestehen nur, um Automatisierung und Missbrauch zu verhindern, und können bei Bedarf angepasst werden.
      </p>

      <h2>7b. Dienste Dritter</h2>
      <p>
        Die Anmeldung mit Google (Google-Konto-Bedingungen), Google Play (Play-Nutzungsbedingungen und Rückerstattungsrichtlinie) und der
        Spracherkennungsdienst deines Geräts unterliegen den Bedingungen ihrer jeweiligen Anbieter. Die KI- und Spracherkennungsanbieter
        sind in der Datenschutzerklärung aufgeführt; sie sind unsere Unterauftragsverarbeiter und schließen keinen Vertrag direkt mit dir.
      </p>

      <h2>8. Geistiges Eigentum</h2>
      <p>
        Die App, das Design, das Maskottchen, die Soundeffekte und die Lektionsinhalte gehören Nomi und sind durch das türkische Gesetz
        Nr. 5846 über geistige und künstlerische Werke sowie durch internationale Abkommen geschützt. Der A1-B1-Teil der Wortlisten beruht
        auf den offiziellen Wortlisten des Goethe-Instituts; Goethe-Institut und telc sind Marken ihrer jeweiligen Inhaber, und Nomi ist
        nicht mit ihnen verbunden. Über den persönlichen Lerngebrauch hinaus ist Kopieren, Verbreiten oder das Erstellen abgeleiteter Werke
        nicht erlaubt.
      </p>

      <h2>9. Verfügbarkeit des Dienstes</h2>
      <p>
        Wir stellen den Dienst &quot;wie besehen&quot; bereit. Wartung, Anbieterausfälle oder Kontingente können einzelne Funktionen
        zeitweise abschalten (z. B. serverseitige Spracherkennung, KI-Gespräch); die App zeigt das an und weicht, wo möglich, auf die
        geräteinterne Alternative aus. Bleibt eine bezahlte Funktion längere Zeit abgeschaltet, erstatten wir anteilig oder verlängern die
        Laufzeit.
      </p>

      <h2>10. Haftungsbeschränkung</h2>
      <p>
        Nomi ist ein Lernwerkzeug; es gibt keine Garantie für ein Prüfungsergebnis, ein Sprachniveau oder die Richtigkeit einer
        Entscheidung. Außer bei Vorsatz und grober Fahrlässigkeit haften wir nicht für mittelbare Schäden aus dem Dienst; unsere
        Gesamthaftung ist auf die in den letzten 12 Monaten von dir gezahlten Abonnementgebühren begrenzt. Deine Rechte als Verbraucher
        nach türkischem Recht und nach den zwingenden Vorschriften deines Wohnsitzlandes bleiben unberührt; diese Ziffer schränkt sie nicht
        ein.
      </p>

      <h2>10a. Freistellung</h2>
      <p>
        Machen Dritte gegenüber Nomi Ansprüche geltend, weil du diese Bedingungen oder geltendes Recht verletzt hast (z. B. Inhalte, die
        Rechte anderer verletzen, ein Angriff auf den Dienst, Betrug), haftest du im Umfang deines Verschuldens für diese Ansprüche und
        Schäden. Für Verbraucher gilt diese Ziffer nur bei Vorsatz und grober Fahrlässigkeit.
      </p>

      <h2>11. Beendigung</h2>
      <p>
        Du kannst dein Konto jederzeit löschen. Wir können ein Konto mit angemessener Vorankündigung schließen, wenn diese Bedingungen
        verletzt werden oder der Dienst endet; endet der Dienst vollständig, kündigen wir dies mindestens 30 Tage vorher an, bieten eine
        Möglichkeit zum Herunterladen deiner Daten und erstatten die nicht genutzte Abonnementlaufzeit.
      </p>

      <h2>12. Anwendbares Recht und Streitbeilegung</h2>
      <p>
        Diese Vereinbarung unterliegt dem Recht der Republik Türkei. Bei Streitigkeiten suchen wir zunächst über <Ph k="supportEmail" />{" "}
        eine gütliche Lösung. Verbraucher in der Türkei können sich innerhalb der geltenden Wertgrenzen an die
        Verbraucherschlichtungsausschüsse und die Verbrauchergerichte wenden; für sonstige Streitigkeiten sind die Gerichte und
        Vollstreckungsbehörden in <Ph k="court" /> zuständig. Die Rechte von in der EU und im Vereinigten Königreich wohnhaften
        Verbrauchern aus den zwingenden Verbraucherschutzvorschriften ihres Landes und ihr Recht, die Gerichte ihres eigenen Landes
        anzurufen, bleiben unberührt; für Nutzer in anderen Ländern gelten die dortigen zwingenden Vorschriften.
      </p>

      <h2>12a. Höhere Gewalt</h2>
      <p>
        Für die Dauer von Ereignissen außerhalb der Kontrolle der Parteien — Naturkatastrophe, Krieg, Epidemie, großflächiger Internet-
        oder Infrastrukturausfall, Insolvenz eines Anbieters, behördliche Entscheidungen — sind die Pflichten ausgesetzt; dauert eine
        Unterbrechung länger als 30 Tage, kann jede Partei die Vereinbarung beenden, und die nicht genutzte Abonnementlaufzeit wird
        erstattet.
      </p>

      <h2>12b. Allgemeine Bestimmungen</h2>
      <ul>
        <li><strong>Vollständigkeit:</strong> Diese Bedingungen, die Datenschutzerklärung und die vorvertragliche Information auf dem Kaufbildschirm bilden die gesamte Vereinbarung zwischen den Parteien.</li>
        <li><strong>Salvatorische Klausel:</strong> Ist eine Bestimmung unwirksam, bleiben die übrigen unberührt; die unwirksame Bestimmung gilt als durch die wirksame Bestimmung ersetzt, die ihrem Zweck am nächsten kommt.</li>
        <li><strong>Übertragung:</strong> Du darfst dein Konto und deine Rechte aus dieser Vereinbarung nicht übertragen. Wir dürfen die Vereinbarung bei einer Übertragung des Dienstes oder bei Überführung der Tätigkeit in eine Gesellschaftsform übertragen, wobei deine Rechte gewahrt bleiben und wir dich informieren.</li>
        <li><strong>Verzicht:</strong> Die Nichtausübung eines Rechts bedeutet keinen Verzicht darauf.</li>
        <li><strong>Sprache:</strong> Verbindliche Sprache der Vereinbarung ist Türkisch; Übersetzungen dienen der Information. Bei Auslegungsunterschieden ist der türkische Text maßgebend.</li>
        <li><strong>Zustellung:</strong> Mitteilungen an uns gehen an <Ph k="supportEmail" />{hasKep() ? <> oder an die registrierte E-Mail-Adresse (KEP, <Ph k="kep" />)</> : null}; Mitteilungen an dich gehen an die E-Mail-Adresse deines Kontos oder erfolgen als Nachricht in der App und gelten mit Zugang als zugestellt.</li>
        <li><strong>Aufbewahrung:</strong> Diese Vereinbarung wird elektronisch aufbewahrt; du kannst die von dir angenommene Fassung und ihr Datum anfordern.</li>
      </ul>

      <h2>13. Änderungen und Kontakt</h2>
      <p>
        Wenn wir diese Bedingungen aktualisieren, ändern sich Gültigkeitsdatum und Version; wesentliche Änderungen zu deinem Nachteil
        kündigen wir mindestens 30 Tage vorher in der App und per E-Mail an, und du kannst dein Konto schließen, wenn du sie nicht
        annimmst. Fragen: <Ph k="supportEmail" />.
        {hasKep() ? <> Für die förmliche Zustellung KEP: <Ph k="kep" />.</> : null}
      </p>
    </>
  );
}
