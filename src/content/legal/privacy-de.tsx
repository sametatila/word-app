import Link from "next/link";
import { EntityBlock, Ph } from "@/components/legal-shell";
import { LEGAL_HOSTING_TEXT, PROCESSORS, legalPath, processorRow } from "@/lib/legal";

/**
 * Datenschutzerklärung — Deutsch. Informative Übersetzung; verbindlich ist der
 * türkische Text unter /privacy (siehe Nutzungsbedingungen, Ziffer 12b). Die
 * Nummerierung bleibt identisch, damit sich beide Fassungen Ziffer für Ziffer
 * vergleichen lassen.
 */
export const PRIVACY_DE_TITLE = "Datenschutzerklärung";
export const PRIVACY_DE_DESCRIPTION =
  "Welche Daten Nomi verarbeitet, warum und wie lange; deine Rechte nach DSGVO und türkischem Datenschutzrecht; Konto löschen.";
export const PRIVACY_DE_SUMMARY = [
  "Nomi ist eine Sprachlern-App: Deutsch, Zürichdeutsch und Englisch.",
  "Wir verarbeiten deine E-Mail-Adresse und deinen Namen für dein Konto und deine Fortschrittsdaten für dein Lernen.",
  "Im Gehmodus wird Mikrofon-Audio mit deiner ausdrücklichen Einwilligung zur Verschriftlichung gesendet. Die Aufnahme wird nicht gespeichert.",
  "Keine Werbung, keine Werbe-ID, kein Tracking durch Dritte.",
  "Du kannst dein Konto jederzeit löschen, in der App oder im Web.",
  "In Europa gelten die DSGVO-Rechte, in der Türkei die KVKK-Rechte.",
] as const;

export function PrivacyDeBody() {
  return (
    <>
      <h2>1. Verantwortlicher</h2>
      <p>
        Verantwortlicher für die von dieser Erklärung erfassten personenbezogenen Daten im Sinne des türkischen Gesetzes Nr. 6698 zum
        Schutz personenbezogener Daten (KVKK) und der Datenschutz-Grundverordnung der Europäischen Union (DSGVO) ist die unten bezeichnete
        Person. Diese Person entscheidet, welche Daten zu welchem Zweck verarbeitet, wie lange sie gespeichert und an welche Anbieter sie übermittelt
        werden. Die Erklärung gilt für die Nomi-Webanwendung (www.exfe.me) und die Android-App.
      </p>
      <EntityBlock party="controller" contact locale="de" />
      <p>
        Die App wird von einer anderen Person bei Google Play veröffentlicht, die auch die Abonnementeinnahmen vereinnahmt. Der Herausgeber
        verarbeitet personenbezogene Daten ausschließlich auf Weisung des Verantwortlichen; für die über die Play Console zugänglichen
        Bestell-, Abonnement- und Rezensionsdaten handelt er als <strong>Auftragsverarbeiter</strong>, und zwischen uns besteht dazu ein
        Auftragsverarbeitungsvertrag (Art. 28 DSGVO, Art. 12 KVKK).
      </p>
      <EntityBlock party="publisher" locale="de" />
      <p>
        Unsere Server laufen bei {LEGAL_HOSTING_TEXT.de}; dort werden die Daten gespeichert. Der Verantwortliche ist nicht in der Türkei niedergelassen; für Anträge
        aus der Türkei und für die Korrespondenz mit der türkischen Behörde ist der oben genannte Vertreter benannt. Die Benennung eines
        Vertreters berührt die eigene Verantwortlichkeit des Verantwortlichen nicht.
      </p>
      <p>
        <strong>Art der Erhebung und Rechtsgrundlage (Art. 10 KVKK):</strong> Die Daten werden elektronisch, automatisiert oder teilweise
        automatisiert über Registrierungs- und Einstellungsformulare, Interaktionen in der App und das Mikrofon erhoben; die Rechtsgrundlage
        für jede Angabe steht in der Tabelle in Abschnitt 3.
      </p>

      <h2>2. Wer welchem Recht unterliegt</h2>
      <ul>
        <li><strong>Nutzer in der Türkei:</strong> KVKK und seine Durchführungsvorschriften (Mitteilung zur Informationspflicht, Mitteilung zu Anträgen an den Verantwortlichen, Regeln zur Übermittlung ins Ausland).</li>
        <li><strong>Nutzer in der EU/im EWR:</strong> Da der Verantwortliche in Deutschland niedergelassen ist, gilt die DSGVO nach Art. 3 Abs. 1 DSGVO zusammen mit dem BDSG; im Vereinigten Königreich gelten zusätzlich die UK GDPR und der Data Protection Act 2018. Die Rechtsgrundlagen dieser Erklärung sind Art. 6 DSGVO zugeordnet. Da der Verantwortliche in der Union niedergelassen ist, ist kein gesonderter EU-Vertreter nach Art. 27 DSGVO erforderlich.</li>
        <li><strong>Andere Länder:</strong> Rechte aus dem örtlichen Datenschutzrecht bleiben vorbehalten (Abschnitt 10). Wir verkaufen deine personenbezogenen Daten nicht und geben sie nicht für verhaltensbasierte Werbung weiter.</li>
      </ul>

      <h2>3. Welche Daten wir verarbeiten und warum</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Daten</th><th>Herkunft</th><th>Zweck</th><th>Rechtsgrundlage (KVKK / DSGVO)</th><th>Speicherdauer</th></tr>
          </thead>
          <tbody>
            <tr><td>E-Mail-Adresse, Name, Passwort-Hash</td><td>Registrierungsformular oder dein Google-Konto</td><td>Kontoerstellung, Anmeldung, Passwort-Reset, Bestätigungs-E-Mail</td><td>Abschluss und Erfüllung eines Vertrags (Art. 5/2-c / Art. 6 Abs. 1 lit. b)</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>Anzeigename, Avatar-Auswahl, Niveau, Kurs, Tagesziel, Stimmpräferenz</td><td>Du</td><td>Personalisierung; der Anzeigename ist für andere Nutzer in der Wochen-Rangliste sichtbar</td><td>Erfüllung eines Vertrags</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>Lerndaten: Wortstatus, Wiederholungsergebnisse, Serie, XP, Erfolge, Lektions- und Prüfungsergebnisse</td><td>Während der Nutzung der App</td><td>Wiederholungsplan, Fortschritt, Rangliste</td><td>Erfüllung eines Vertrags</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>Texte, die du schreibst und sprichst (Schreibaufgaben, Sprechpraxis, Prüfungsantworten)</td><td>Du</td><td>Bewertung und Rückmeldung durch KI</td><td>Erfüllung eines Vertrags</td><td>Bewertungen für die Dauer des Kontos; Protokolle der Sprechpraxis 30 Tage</td></tr>
            <tr><td>Mikrofon-Audio</td><td>Mikrofon im Gehmodus</td><td>Verschriftlichung des gesprochenen Wortes</td><td>Ausdrückliche Einwilligung (Art. 5/1 / Art. 6 Abs. 1 lit. a); Einwilligungsbildschirm in der App, widerruflich</td><td>Wird nicht gespeichert; nach Abschluss der Erkennung gelöscht, nur der erkannte Text bleibt</td></tr>
            <tr><td>Nutzungsereignisse: welcher Bildschirm geöffnet wurde, Runde begonnen/beendet, Bildschirmbreite und Plattform</td><td>Die App</td><td>Verbesserung des Produkts (eigene Analyse, keine Dritten)</td><td>Berechtigtes Interesse (Art. 5/2-f / Art. 6 Abs. 1 lit. f); in den Einstellungen abschaltbar</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>IP-Adresse und Browser-/Gerätebezeichnung (im Sitzungsdatensatz)</td><td>Deine Verbindung</td><td>Sitzungssicherheit, Missbrauchsabwehr und Ratenbegrenzung</td><td>Berechtigtes Interesse (Sicherheit)</td><td>Für die Dauer der Sitzung (höchstens 30 Tage)</td></tr>
            <tr><td>Soziales Profil: Benutzername, Bio, Sichtbarkeits- und Anfrageeinstellungen</td><td>Du</td><td>Damit deine Freunde und — bei Sichtbarkeit &quot;öffentlich&quot; — andere Nutzer dich finden</td><td>Erfüllung eines Vertrags; Einwilligung für die Einstellungen</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>Freundschaftsanfragen, Freundesliste, Blockierungen, Nutzermeldungen</td><td>Du und deine Freunde</td><td>Freundesfunktionen, Sicherheit und Moderation</td><td>Erfüllung eines Vertrags; berechtigtes Interesse (Sicherheit)</td><td>Für die Dauer des Kontos; Meldungen bis zum Abschluss der Prüfung</td></tr>
            <tr><td>Aktivitäts-Feed, Reaktionen, Anstöße, gemeinsame Aufgaben, Posteingangs-Benachrichtigungen</td><td>Während der Nutzung der App</td><td>Teilen des Fortschritts mit deinen Freunden und Motivation (nur für deine Freunde sichtbar)</td><td>Erfüllung eines Vertrags; über die Einstellung &quot;Aktivität zeigen&quot; abschaltbar</td><td>Für die Dauer des Kontos</td></tr>
            <tr><td>Web-Push-Abonnement (Browser-Endpunkt und Verschlüsselungsschlüssel)</td><td>Dein Browser, wenn du es erlaubst</td><td>Erinnerungen im Web</td><td>Einwilligung (Browser-Berechtigung)</td><td>Bis zum Widerruf der Berechtigung oder zum Ungültigwerden des Endpunkts</td></tr>
            <tr><td>Benachrichtigungsberechtigung und Erinnerungszeit (Android)</td><td>Du</td><td>Lokale Erinnerungen (auf dem Gerät geplant, nicht an den Server gesendet)</td><td>Einwilligung</td><td>Auf dem Gerät</td></tr>
            <tr><td>Kauf- und Abonnementstatus</td><td>Google Play / RevenueCat</td><td>Freischalten der Premium-Funktionen</td><td>Erfüllung eines Vertrags; rechtliche Verpflichtung (Buchhaltung)</td><td>Für die Dauer des Kontos; Finanzunterlagen für die gesetzliche Frist</td></tr>
            <tr><td>Deine Inhaltsmeldungen</td><td>Du (&quot;Melden&quot;)</td><td>Prüfung unangemessener KI-Antworten</td><td>Berechtigtes Interesse (sicherer Dienst)</td><td>Bis zum Abschluss der Prüfung</td></tr>
            <tr><td>Support-Nachrichten und Rechteanfragen an uns</td><td>Du</td><td>Beantwortung der Anfrage, gesetzliche Dokumentation</td><td>Rechtliche Verpflichtung (Art. 13 KVKK, Art. 12 DSGVO)</td><td>2 Jahre nach Abschluss der Anfrage</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>Was wir nicht erheben:</strong> Standort, Kontakte, Kalender, Fotos, Werbe-ID, Geräte-ID, Absturzberichte, besondere
        Kategorien personenbezogener Daten. Nomi zeigt keine Werbung, enthält kein Analyse- oder Tracking-SDK Dritter und verkauft keine
        Daten.
      </p>

      <h2>4. Mikrofon und Audioaufnahmen</h2>
      <p>
        Im Gehmodus hörst du eine Vorgabe in deiner Sprache und sprichst das Wort in der Zielsprache. Bei eingeschaltetem Bildschirm findet
        die Erkennung auf deinem Gerät statt (Spracherkennungsdienst von Android). Bei ausgeschaltetem Bildschirm oder wenn das Telefon in
        der Tasche steckt, wird das Audio als 16-kHz-Mono-Aufnahme an unseren Server gesendet und an einen der unten aufgeführten
        Spracherkennungsanbieter weitergegeben. Die Audiodatei wird weder auf dem Server noch beim Anbieter gespeichert; nur der erkannte
        Text, das erwartete Wort und die Cliplänge werden im Nutzungsdatensatz festgehalten.
      </p>
      <ul>
        <li>Das Mikrofon wird nur geöffnet, wenn du den Gehmodus startest; eine dauerhafte Benachrichtigung ist sichtbar, und du kannst ihn aus der App beenden.</li>
        <li>Bei ausgeschaltetem Bildschirm läuft die Aufnahme über den Vordergrunddienst vom Typ &quot;Mikrofon&quot; von Android; die System-Mikrofonanzeige bleibt an.</li>
        <li>Beim ersten Mal erklärt ein Einwilligungsbildschirm diese Verarbeitung; ohne Einwilligung startet der Modus nicht. Erteilst du sie nicht, wird das Mikrofon nie genutzt, und der Rest der App funktioniert.</li>
        <li>Im Erkennungsergebnis werden Schimpfwörter maskiert.</li>
      </ul>
      <h3>Text der ausdrücklichen Einwilligung (Mikrofon)</h3>
      <p>
        Wenn du in der App auf &quot;Ich stimme zu, los&quot; tippst, gibst du folgende Erklärung ab: &quot;Ich willige ausdrücklich ein,
        dass meine Mikrofonaufnahmen im Gehmodus zum Zweck der Verschriftlichung des von mir gesprochenen Wortes an den Nomi-Server und an
        die in Abschnitt 6 dieser Erklärung aufgeführten, teils im Ausland ansässigen Spracherkennungsanbieter übermittelt werden und dass
        die Aufnahme unmittelbar nach dem Vorgang gelöscht wird. Mir ist bekannt, dass ich diese Einwilligung jederzeit unter Einstellungen
        &rsaquo; Datenschutz widerrufen kann.&quot;
      </p>

      <h2>4a. Soziale Funktionen und Sichtbarkeit</h2>
      <ul>
        <li>Dein Anzeigename ist für alle Nutzer in der Wochen-Rangliste sichtbar; willst du dort nicht erscheinen, kannst du den Anzeigenamen leer lassen (du erscheinst dann als &quot;Lernende/r&quot;).</li>
        <li>Dein soziales Profil (Benutzername, Bio, Niveau, Serie) ist standardmäßig <strong>öffentlich</strong>; unter Einstellungen &rsaquo; Soziales kannst du es auf &quot;nur Freunde&quot; oder &quot;privat&quot; stellen und Freundschaftsanfragen sowie das Erscheinen in Vorschlägen abschalten.</li>
        <li>Der Aktivitäts-Feed (abgeschlossene Runde, Serien-Meilenstein) ist nur für deine Freunde sichtbar; er wird über &quot;Aktivität zeigen&quot; abgeschaltet.</li>
        <li>Blockierst du eine Person, sehen sich beide Seiten nicht mehr; meldest du jemanden, wird der Vorgang von einem Menschen geprüft. Blockier- und Meldevorgänge werden der Gegenseite nicht angezeigt.</li>
        <li>Nomi hat keine privaten Nachrichten; Interaktion findet nur über Reaktionen, Anstöße und gemeinsame Aufgaben statt.</li>
      </ul>

      <h2>4b. Automatisierte Entscheidungen und Profiling</h2>
      <p>
        Der Wiederholungsplan, der Inhalt der Tagesrunde, der Niveauvorschlag und die Wochen-Rangliste werden automatisch aus deinen
        Lerndaten berechnet. Diese Berechnungen sind Teil der Funktionsweise des Produkts, erstellen kein umfassendes Profil von dir und entfalten dir
        gegenüber keine rechtliche oder ähnlich erhebliche Wirkung (es gibt keine Entscheidung im Sinne von Art. 22 DSGVO). Den
        vorgeschlagenen Niveauwert kannst du jederzeit selbst ändern.
      </p>

      <h2>5. Von KI verarbeitete Texte</h2>
      <p>
        Deine Sprechpraxis (Rollenspiel), Schreibaufgaben und Prüfungsantworten werden zur Erzeugung von Rückmeldungen an Anbieter von
        Sprachmodellen gesendet. Gesendet wird nur der von dir geschriebene oder gesprochene Text und das Szenario der Lektion; Name und
        E-Mail-Adresse werden nicht gesendet. Die Anbieter arbeiten unter API-Bedingungen und Auftragsverarbeitungsverträgen, in denen sie
        zusagen, die Daten nicht für Modelltraining zu verwenden. Die App weist deutlich darauf hin, dass KI-Figuren keine echten Personen
        sind (Transparenz nach Art. 50 der KI-Verordnung der EU). Antworten können Fehler enthalten; du kannst sie uns über die
        Schaltfläche &quot;Melden&quot; unter jeder Antwort mitteilen, und Meldungen werden von einem Menschen geprüft. Nomi trifft über
        dich keine ausschließlich auf automatisierter Verarbeitung beruhende Entscheidung mit rechtlicher Wirkung.
      </p>

      <h2>6. Dienstleister, die Daten erhalten, und Übermittlung ins Ausland</h2>
      <p>
        Die folgenden Anbieter arbeiten nur zum angegebenen Zweck und nur mit den für diese Aufgabe erforderlichen Daten; keiner von ihnen
        darf die Daten für eigene Zwecke verwenden. Unsere Server stehen in Deutschland. Die für Übermittlungen aus der Türkei in die EU und
        aus der EU in die USA bzw. das Vereinigte Königreich verwendete Garantie steht in der letzten Spalte: der von der türkischen Behörde
        nach Art. 9 KVKK veröffentlichte Standardvertrag sowie Standardvertragsklauseln oder ein Angemessenheitsbeschluss nach Kapitel V
        DSGVO.
      </p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Anbieter</th><th>Wofür</th><th>Welche Daten</th><th>Region</th><th>Garantie</th><th>Wann</th></tr></thead>
          <tbody>
            {PROCESSORS.map((p) => {
              const r = processorRow(p, "de");
              return <tr key={p.name}><td>{r.name}</td><td>{r.purpose}</td><td>{r.data}</td><td>{r.region}</td><td>{r.safeguard}</td><td>{r.when}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <p>Eine Übermittlung an Behörden erfolgt nur bei einer rechtlichen Verpflichtung oder auf Verlangen einer zuständigen Stelle und nur im Umfang dieses Verlangens.</p>

      <h2>7. Cookies und lokale Speicherung</h2>
      <p>
        Im Web wird nur das unbedingt erforderliche Sitzungs-Cookie verwendet (um zu merken, dass du angemeldet bist, 30 Tage); deshalb
        gibt es kein Cookie-Banner. Marketing- oder Tracking-Cookies setzen wir nicht ein. In der lokalen Speicherung von Browser und App
        liegen Angaben wie Design-, Ton- und Benachrichtigungseinstellungen, Avatar-Auswahl und eine unterbrochene Lektion; diese verlassen
        dein Gerät nicht.
      </p>

      <h2>8. Produktanalyse und Abschalten</h2>
      <p>
        Um zu verstehen, welche Funktionen genutzt werden, schreibt Nomi kurze Nutzungsereignisse auf den eigenen Server (z. B. &quot;Runde
        abgeschlossen&quot;). Was ein solches Ereignis enthalten darf, ist eng begrenzt:
      </p>
      <ul>
        <li>Die Ereignisnamen stammen aus einer geschlossenen, vorab festgelegten Liste.</li>
        <li>Jedes Ereignis kann eine technische Kennzeichnung von höchstens 32 Zeichen tragen (etwa &quot;single:artikel&quot; oder &quot;level:B1&quot;).</li>
        <li>Die Kennzeichnung lässt nur Buchstaben, Ziffern, Unterstrich, Doppelpunkt und Bindestrich zu und darf nicht ausschließlich aus Ziffern bestehen. Sie kann daher weder eine E-Mail-Adresse noch einen Link oder eine Telefonnummer enthalten.</li>
        <li>Darüber hinaus wird kein Freitext gesendet, und die Ereignisse gehen an keinen Dritten.</li>
      </ul>
      <p>
        Über den Schalter &quot;Nutzungsdaten senden&quot; unter Einstellungen &rsaquo; Datenschutz kannst du das abschalten. Das ist das
        Widerspruchsrecht nach KVKK und Art. 21 DSGVO. Danach werden nur die für den Dienst zwingend erforderlichen Datensätze geführt.
      </p>

      <h2>8a. Kommerzielle elektronische Nachrichten</h2>
      <p>
        Wir senden dir nur dienstbezogene Nachrichten: E-Mail-Bestätigung, Passwort-Reset, Konto- und Sicherheitshinweise sowie die von dir
        erlaubten Erinnerungen. Kommerzielle elektronische Nachrichten im Sinne des türkischen Gesetzes Nr. 6563 versenden wir nicht; sollten
        wir künftig Marketingnachrichten senden wollen, holen wir deine gesonderte Zustimmung über das türkische
        Nachrichtenverwaltungssystem (İYS) ein, und jede Nachricht enthält eine Abmeldemöglichkeit.
      </p>

      <h2>9. Speicherfristen</h2>
      <ul>
        <li>Konto- und Lerndaten: solange das Konto besteht; mit der Löschung des Kontos wird alles gelöscht.</li>
        <li>Protokolle der Sprechpraxis (dein Satz und die Antwort des Modells): 30 Tage, danach automatische Löschung.</li>
        <li>Audioaufnahmen: werden nicht gespeichert.</li>
        <li>Sitzungsdatensätze (IP, Gerätebezeichnung): für die Dauer der Sitzung, höchstens 30 Tage.</li>
        <li>Finanzunterlagen (Abonnementrechnungen): die vom türkischen Handelsgesetzbuch und vom Steuerverfahrensgesetz vorgesehene Frist (10 Jahre), und nur soweit Google Play sie uns übermittelt.</li>
        <li>Schriftwechsel zu Rechteanfragen: 2 Jahre nach Abschluss der Anfrage.</li>
        <li>Server-Backups: gelöschte Daten fallen spätestens innerhalb von <Ph k="backupRetentionDays" /> Tagen aus den Backups heraus; Backups dienen nur der Notfallwiederherstellung, und ein gelöschtes Konto wird nie aus einem Backup wiederhergestellt.</li>
      </ul>

      <h2>10. Deine Rechte</h2>
      <p>Nach Art. 11 KVKK und Art. 15-22 DSGVO kannst du verlangen:</p>
      <ul>
        <li>zu erfahren, ob deine Daten verarbeitet werden, Auskunft darüber zu erhalten und eine Kopie in einem maschinenlesbaren Format zu bekommen (Auskunft und Datenübertragbarkeit),</li>
        <li>unvollständige oder unrichtige Daten berichtigen zu lassen (Name und Einstellungen kannst du in den Einstellungen selbst ändern),</li>
        <li>die Löschung oder Vernichtung deiner Daten (Weg zur Kontolöschung in Abschnitt 11),</li>
        <li>die Einschränkung der Verarbeitung und Widerspruch gegen eine auf berechtigtem Interesse beruhende Verarbeitung (Analyse-Schalter),</li>
        <li>den Widerruf deiner ausdrücklichen Einwilligung (Mikrofon-Einwilligung; der Widerruf berührt die Rechtmäßigkeit der bisherigen Verarbeitung nicht),</li>
        <li>dass Berichtigung und Löschung den Dritten mitgeteilt werden, an die die Daten übermittelt wurden,</li>
        <li>Schadensersatz, wenn dir ein Schaden entstanden ist.</li>
      </ul>
      <p>
        <strong>Antragstellung:</strong> Schreibe für Anträge nach DSGVO oder UK GDPR an <Ph k="privacyEmailEu" /> und für Anträge nach türkischem Datenschutzrecht (KVKK) an <Ph k="privacyEmailTr" />; zur Identitätsprüfung genügt es, von der E-Mail-Adresse deines
        Kontos zu schreiben. In der Türkei kannst du nach der Mitteilung über das Verfahren für Anträge an den Verantwortlichen den
        Antrag auch schriftlich mit eigenhändiger Unterschrift, mit qualifizierter elektronischer Signatur oder von der in deinem Konto
        hinterlegten E-Mail-Adresse aus stellen. Wir bearbeiten Anträge kostenlos
        innerhalb von höchstens 30 Tagen; nach der DSGVO kann diese Frist bei Bedarf um zwei Monate verlängert werden, worüber wir dich
        informieren.
      </p>
      <p>
        <strong>Beschwerde:</strong> in der Türkei bei der Behörde zum Schutz personenbezogener Daten (kvkk.gov.tr). In der EU ist die
        zuständige Aufsichtsbehörde des Verantwortlichen nach dem Ort der Niederlassung die Landesbeauftragte für Datenschutz und
        Informationsfreiheit Nordrhein-Westfalen (LDI NRW). Nach Art. 77 DSGVO kannst du dich auch an die Behörde in deinem eigenen
        Land wenden. Im Vereinigten Königreich beim ICO. Wir bitten dich, dich zuerst an uns zu wenden; die meisten
        Anliegen können wir direkt lösen.
      </p>

      <h2>11. Konto und Daten löschen</h2>
      <p>
        Du kannst dein Konto auf zwei Wegen löschen: in der App unter <strong>Profil &rsaquo; Einstellungen &rsaquo; Konto &rsaquo; Konto
        löschen</strong> oder im Web unter{" "}
        <Link href={legalPath("deleteAccount", "de")}>www.exfe.me{legalPath("deleteAccount", "de")}</Link>. Im Moment der Löschung werden
        dein Konto, dein Fortschritt, deine Texte, deine Sprechprotokolle, deine Nutzungsereignisse und deine sozialen Spuren
        (Freundschaften, Reaktionen) dauerhaft gelöscht; das ist unwiderruflich. Finanzunterlagen, die einer gesetzlichen Aufbewahrungspflicht
        unterliegen, werden anonymisiert aufbewahrt. Hast du ein Google-Play-Abonnement, musst du es zusätzlich im Play Store kündigen.
      </p>

      <h2>12. Kinder</h2>
      <p>
        Nomi ist nicht für Personen unter 18 Jahren gestaltet und erhebt von ihnen wissentlich keine Daten. Die Nutzungsbedingungen
        beschränken die Kontoerstellung auf Personen ab 18 Jahren (siehe Nutzungsbedingungen, Ziffer 3). Die Inhalte richten sich an
        erwachsene Lernende und an die Prüfungsvorbereitung für Goethe/telc; da die App offene KI-Gespräche und Interaktion zwischen Nutzern
        enthält, ist sie für ein kindliches Publikum nicht geeignet. Erfahren wir, dass eine Person unter 18 Jahren ein Konto erstellt hat,
        löschen wir Konto und Daten; Eltern können an <Ph k="privacyEmailEu" /> schreiben.
      </p>

      <h2>13. Sicherheit</h2>
      <p>
        Alle Verbindungen sind mit HTTPS verschlüsselt. Passwörter werden als nicht umkehrbare Hashes gespeichert. Der Zugriff auf den
        Server ist auf Schlüssel beschränkt; Anmeldeversuche unterliegen einer Ratenbegrenzung. Für zerstörende Vorgänge wie die
        Kontolöschung sind ein Passwort oder eine frische Sitzung erforderlich. Bei einer Verletzung des Schutzes personenbezogener Daten
        benachrichtigen wir die Behörden (in der Türkei die Behörde innerhalb von 72 Stunden) nach KVKK und Art. 33-34 DSGVO und
        informieren dich.
      </p>

      <h2>14. Änderungen</h2>
      <p>
        Wenn wir diese Erklärung ändern, werden Gültigkeitsdatum und Version auf dieser Seite aktualisiert; bei einer Änderung, die die
        Verarbeitungszwecke erweitert, informieren wir in der App und holen erforderlichenfalls erneut eine Einwilligung ein. Fragen:{" "}
        <Ph k="privacyEmailEu" />.
      </p>
    </>
  );
}
