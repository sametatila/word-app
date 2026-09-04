import Link from "next/link";
import { EntityBlock, Ph } from "@/components/legal-shell";
import { LEGAL_HOSTING_TEXT, PROCESSORS, legalPath, processorRow } from "@/lib/legal";

/**
 * Privacy policy — English. Informational translation; the Turkish text at
 * /privacy is the binding version (see terms, clause 12b). Section numbering
 * matches the Turkish document so the two can be compared clause by clause.
 */
export const PRIVACY_EN_TITLE = "Privacy Policy";
export const PRIVACY_EN_DESCRIPTION =
  "What data Lernomi processes, why and for how long; your rights under GDPR and Turkish data protection law; deleting your account.";
export const PRIVACY_EN_SUMMARY = [
  "Lernomi is a language learning app: German, Zurich German and English.",
  "We process your e-mail and name to run your account, and your progress data to track your learning.",
  "In walk mode, with your explicit consent, microphone audio is sent to be transcribed. The recording is not kept.",
  "No ads, no advertising identifier, no third-party tracking.",
  "You can delete your account at any time, from the app or the web.",
  "GDPR rights in Europe, KVKK rights in Türkiye.",
] as const;

export function PrivacyEnBody() {
  return (
    <>
      <h2>1. Data controller</h2>
      <p>
        The controller of the personal data covered by this policy, within the meaning of Turkish Law no. 6698 on the Protection of Personal
        Data (KVKK) and the European Union General Data Protection Regulation (GDPR), is the person identified below: they decide what data
        is processed for what purpose, how long it is kept and which providers it goes to. The policy covers the Lernomi web app
        (www.lernomi.app) and the Android app.
      </p>
      <EntityBlock party="controller" contact locale="en" />
      <p>
        The app is published on Google Play and the subscription revenue is collected by a different person. The publisher processes no
        personal data except on the controller&apos;s instructions; for the order, subscription and review data they access through the Play
        Console they act as a <strong>processor</strong>, and a processing agreement between us covers this (Art. 28 GDPR, Art. 12 KVKK).
      </p>
      <EntityBlock party="publisher" locale="en" />
      <p>
        Our servers run on {LEGAL_HOSTING_TEXT.en}; the data is stored there. The controller is not established in Türkiye; for applications made from
        Türkiye and for correspondence with the Turkish authority, the representative identified above has been designated. Designating
        a representative does not remove the controller&apos;s own responsibility.
      </p>
      <p>
        <strong>Collection method and legal ground (KVKK Art. 10):</strong> Data is collected electronically, by automated or partly
        automated means, through registration and settings forms, in-app interactions and the microphone; the legal ground for each item is
        given in the table in section 3.
      </p>

      <h2>2. Which law applies to whom</h2>
      <ul>
        <li><strong>Users in Türkiye:</strong> KVKK and its secondary legislation (Communiqué on the Obligation to Inform, Communiqué on Applications to the Data Controller, rules on transfers abroad).</li>
        <li><strong>Users in the EU/EEA:</strong> because the controller is established in Germany, the GDPR applies by virtue of Art. 3(1) GDPR, together with German data protection law (BDSG); in the United Kingdom, the UK GDPR and the Data Protection Act 2018 also apply. The legal grounds in this policy are mapped to Art. 6 GDPR. As the controller is established within the Union, no separate EU representative under Art. 27 GDPR is required.</li>
        <li><strong>Other countries:</strong> rights under local data protection law are reserved (section 10). We do not sell your personal data and do not share it for behavioural advertising.</li>
      </ul>

      <h2>3. What data we process and why</h2>
      <div className="tablewrap">
        <table>
          <thead>
            <tr><th>Data</th><th>Source</th><th>Purpose</th><th>Legal ground (KVKK / GDPR)</th><th>Retention</th></tr>
          </thead>
          <tbody>
            <tr><td>E-mail address, name, password hash</td><td>Registration form or your Google account</td><td>Account creation, sign-in, password reset, verification e-mail</td><td>Conclusion and performance of a contract (Art. 5/2-c / Art. 6(1)(b))</td><td>For the life of the account</td></tr>
            <tr><td>Display name, avatar choice, level, course, daily goal, voice preference</td><td>You</td><td>Personalisation; the display name is visible to other users on the weekly leaderboard</td><td>Performance of a contract</td><td>For the life of the account</td></tr>
            <tr><td>Learning data: word state, review results, streak, XP, achievements, lesson and exam results</td><td>While you use the app</td><td>Spaced repetition schedule, progress, leaderboard</td><td>Performance of a contract</td><td>For the life of the account</td></tr>
            <tr><td>Texts you write and say (writing tasks, speaking practice, exam answers)</td><td>You</td><td>AI assessment and feedback</td><td>Performance of a contract</td><td>Assessments for the life of the account; speaking practice logs for 30 days</td></tr>
            <tr><td>Microphone audio</td><td>The microphone in walk mode</td><td>Transcribing the word you said</td><td>Explicit consent (Art. 5/1 / Art. 6(1)(a)); in-app consent screen, revocable</td><td>Not kept; deleted as soon as recognition finishes, only the recognised text is retained</td></tr>
            <tr><td>Usage events: which screen opened, round started/finished, screen width and platform</td><td>The app</td><td>Improving the product (first-party analytics)</td><td>Legitimate interest (Art. 5/2-f / Art. 6(1)(f)); can be switched off in settings</td><td>For the life of the account</td></tr>
            <tr><td>IP address and browser/device description (in the session record)</td><td>Your connection</td><td>Session security, abuse prevention and rate limiting</td><td>Legitimate interest (security)</td><td>For the life of the session (at most 30 days)</td></tr>
            <tr><td>Social profile: username, bio, visibility and request preferences</td><td>You</td><td>Letting your friends and, if visibility is &quot;public&quot;, other users find you</td><td>Performance of a contract; consent for the preferences</td><td>For the life of the account</td></tr>
            <tr><td>Friend requests, friend list, blocks, user reports</td><td>You and your friends</td><td>Friend features, safety and moderation</td><td>Performance of a contract; legitimate interest (safety)</td><td>For the life of the account; reports until the review closes</td></tr>
            <tr><td>Activity feed, reactions, nudges, shared quests, inbox notifications</td><td>While you use the app</td><td>Sharing progress with your friends and motivation (visible only to your friends)</td><td>Performance of a contract; can be switched off with the &quot;show my activity&quot; preference</td><td>For the life of the account</td></tr>
            <tr><td>Web push subscription (browser endpoint and encryption keys)</td><td>Your browser, if you allow it</td><td>Reminder notifications on the web</td><td>Consent (browser permission)</td><td>Until the permission is withdrawn or the endpoint expires</td></tr>
            <tr><td>Notification permission and reminder time (Android)</td><td>You</td><td>Local reminders (scheduled on the device, not sent to the server)</td><td>Consent</td><td>On the device</td></tr>
            <tr><td>Purchase and subscription state</td><td>Google Play / RevenueCat</td><td>Unlocking Premium features</td><td>Performance of a contract; legal obligation (accounting)</td><td>For the life of the account; financial records for the statutory period</td></tr>
            <tr><td>Your content reports</td><td>You (&quot;Report&quot;)</td><td>Reviewing inappropriate AI answers</td><td>Legitimate interest (a safe service)</td><td>Until the review closes</td></tr>
            <tr><td>Support messages and rights requests you send us</td><td>You</td><td>Answering the request, statutory record</td><td>Legal obligation (KVKK Art. 13, GDPR Art. 12)</td><td>2 years after the request closes</td></tr>
          </tbody>
        </table>
      </div>
      <p>
        <strong>What we do not collect:</strong> location, contacts, calendar, photos, advertising identifier, device identifier, crash
        reports, special categories of personal data. Lernomi shows no ads, contains no third-party analytics or tracking SDK, and sells no
        data.
      </p>

      <h2>4. Microphone and audio recordings</h2>
      <p>
        In walk mode you hear a prompt in your own language and say the target-language word. While the screen is on, recognition happens on
        your device (the Android speech recognition service). While the screen is off or the phone is in your pocket, audio is sent to our
        server as a 16 kHz mono recording and passed to one of the speech recognition providers listed below. The audio file is not stored
        on our server or at the provider; only the recognised text, the expected word and the clip length are written to the usage record.
      </p>
      <ul>
        <li>The microphone opens only when you start walk mode; a persistent notification is shown and you can stop it from the app.</li>
        <li>While the screen is off, recording runs through Android&apos;s microphone-type foreground service; the system microphone indicator stays on.</li>
        <li>On first use a consent screen explains this processing; the mode does not start without your consent. If you decline, the microphone is never used and the rest of the app works.</li>
        <li>Profanity is masked in the recognition result.</li>
      </ul>
      <h3>Explicit consent text (microphone)</h3>
      <p>
        When you press &quot;I agree, start&quot; in the app you give the following declaration: &quot;I give my explicit consent to my
        microphone recordings in walk mode being transferred to the Lernomi server and to the speech recognition providers listed in section 6
        of this policy, some of which are located abroad, for the purpose of transcribing the word I said; and to the recording being
        deleted as soon as the operation finishes. I know that I can withdraw this consent at any time under Settings &rsaquo; Privacy.&quot;
      </p>

      <h2>4a. Social features and visibility</h2>
      <ul>
        <li>Your display name is visible to all users on the weekly leaderboard; if you do not want to appear there, you can leave your display name empty (you then appear as &quot;Learner&quot;).</li>
        <li>Your social profile (username, bio, level, streak) is <strong>public</strong> by default; under Settings &rsaquo; Social you can set it to &quot;friends only&quot; or &quot;private&quot;, and turn off friend requests and appearing in suggestions.</li>
        <li>The activity feed (round completion, streak milestone) is visible only to your friends; it is turned off with &quot;show my activity&quot;.</li>
        <li>When you block a user, neither side sees the other; when you report someone, the record is reviewed by a human. Block and report records are not shown to the other party.</li>
        <li>Lernomi has no private messaging; interaction happens only through reactions, nudges and shared quests.</li>
      </ul>

      <h2>4b. Automated decision-making and profiling</h2>
      <p>
        The spaced repetition schedule, the content of the daily round, the level suggestion and the weekly leaderboard are computed
        automatically from your learning data. These are part of how the product works; they do not profile you comprehensively and produce
        no legal or similarly significant effect for you (there is no decision within the scope of Art. 22 GDPR). You can change the
        suggested level yourself at any time.
      </p>

      <h2>5. Texts processed by AI</h2>
      <p>
        Your speaking practice (roleplay), writing tasks and exam answers are sent to language model providers in order to generate
        feedback. What is sent is only the text you wrote or said and the scenario of the lesson; your name and e-mail are not sent. The
        providers operate under API terms and data processing agreements in which they undertake not to use the data for model training. The
        app states clearly that AI characters are not real people (transparency under Art. 50 of the EU AI Act). Answers can contain
        mistakes; you can send them to us with the &quot;Report&quot; button under each answer, and reports are reviewed by a human. Lernomi
        makes no decision about you that is based solely on automated processing and produces a legal effect.
      </p>

      <h2>6. Service providers that receive data, and transfers abroad</h2>
      <p>
        The providers below work only for the stated purpose and only with the data that task requires; none of them may use the data for
        their own purposes. Our servers are in Germany. The safeguard used for transfers from Türkiye to the EU and from the EU to the
        USA/United Kingdom is in the last column: the standard contract published by the Turkish Board under KVKK Art. 9, and standard
        contractual clauses or an adequacy decision under Chapter V GDPR.
      </p>
      <div className="tablewrap">
        <table>
          <thead><tr><th>Provider</th><th>For what</th><th>Which data</th><th>Region</th><th>Safeguard</th><th>When</th></tr></thead>
          <tbody>
            {PROCESSORS.map((p) => {
              const r = processorRow(p, "en");
              return <tr key={p.name}><td>{r.name}</td><td>{r.purpose}</td><td>{r.data}</td><td>{r.region}</td><td>{r.safeguard}</td><td>{r.when}</td></tr>;
            })}
          </tbody>
        </table>
      </div>
      <p>Data is transferred to public authorities only where there is a legal obligation or a request from a competent authority, and only within the scope of that request.</p>

      <h2>7. Cookies and local storage</h2>
      <p>
        On the web only the strictly necessary session cookie is used (to remember that you are signed in, for 30 days); for that reason
        there is no cookie consent banner. We use no marketing or tracking cookies. Browser and app local storage holds things like theme,
        sound and notification preferences, avatar choice and an unfinished lesson; these never leave your device.
      </p>

      <h2>8. Product analytics and switching them off</h2>
      <p>
        To understand which features are used, Lernomi writes short usage events to its own server (e.g. &quot;round completed&quot;).
        What such an event may contain is tightly bounded:
      </p>
      <ul>
        <li>Event names come from a closed, predefined list.</li>
        <li>Each event may carry a technical label of at most 32 characters (such as &quot;single:artikel&quot; or &quot;level:B1&quot;).</li>
        <li>The label accepts only letters, digits, underscore, colon and hyphen, and cannot consist of digits alone. It therefore cannot hold an e-mail address, a link or a phone number.</li>
        <li>Nothing else is sent as free text, and the events go to no third party.</li>
      </ul>
      <p>
        You can switch this off with the &quot;Send usage data&quot; toggle under Settings &rsaquo; Privacy. This is the right to object
        under KVKK and Art. 21 GDPR. Once it is off, only the records strictly necessary for the service are kept.
      </p>

      <h2>8a. Commercial electronic messages</h2>
      <p>
        We send you only service-related messages: e-mail verification, password reset, account and security notices, and the reminders you
        allowed. We send no commercial electronic messages within the meaning of Turkish Law no. 6563; if we ever want to send marketing
        messages, we will obtain your separate consent through the Turkish Message Management System (İYS) and every message will carry an
        opt-out.
      </p>

      <h2>9. Retention periods</h2>
      <ul>
        <li>Account and learning data: as long as the account exists; when the account is deleted, all of it is deleted.</li>
        <li>Speaking practice logs (the sentence you said and the model&apos;s reply): 30 days, then deleted automatically.</li>
        <li>Audio recordings: not kept.</li>
        <li>Session records (IP, device description): for the life of the session, at most 30 days.</li>
        <li>Financial records (subscription invoices): the period required by the Turkish Commercial Code and the Tax Procedure Law (10 years), and only to the extent Google Play passes them to us.</li>
        <li>Correspondence about rights requests: 2 years after the request closes.</li>
        <li>Server backups: deleted data drops out of the backups within <Ph k="backupRetentionDays" /> days at the latest; backups are used only for disaster recovery, and a deleted account is never restored from a backup.</li>
      </ul>

      <h2>10. Your rights</h2>
      <p>Under KVKK Art. 11 and Art. 15-22 GDPR you may ask to:</p>
      <ul>
        <li>learn whether your data is processed, request information about it and receive a copy in a machine-readable format (access and portability),</li>
        <li>correct incomplete or inaccurate data (you can change your name and preferences yourself in Settings),</li>
        <li>have your data erased or destroyed (the account deletion route in section 11),</li>
        <li>restrict processing and object to processing based on legitimate interest (the analytics toggle),</li>
        <li>withdraw your explicit consent (the microphone consent; withdrawal does not affect the lawfulness of earlier processing),</li>
        <li>request that corrections and erasure be notified to third parties to whom the data was transferred,</li>
        <li>claim compensation if you suffer damage.</li>
      </ul>
      <p>
        <strong>Making a request:</strong> write to <Ph k="privacyEmailEu" /> for requests under the GDPR or UK GDPR, or to <Ph k="privacyEmailTr" /> for requests under Turkish data protection law (KVKK); writing from the e-mail address on your account is enough to
        verify your identity. In Türkiye, under the Communiqué on the Procedures for Applications to the Data Controller, you may also
        apply in writing with a wet signature, with a qualified electronic signature, or from the e-mail address registered on your
        account. We resolve requests free of charge within 30 days at
        the latest; under the GDPR this period may be extended by two months where necessary, and you will be told.
      </p>
      <p>
        <strong>Complaints:</strong> in Türkiye to the Personal Data Protection Board (kvkk.gov.tr). In the EU the controller&apos;s
        competent supervisory authority is, by place of establishment, the State Commissioner for Data Protection and Freedom of
        Information of North Rhine-Westphalia (LDI NRW). Under Art. 77 GDPR you may also complain to the authority in your own
        country. In the United Kingdom, the ICO. We would ask you to write to us first; we can resolve most requests
        directly.
      </p>

      <h2>11. Deleting your account and your data</h2>
      <p>
        You can delete your account in two ways: in the app under <strong>Profile &rsaquo; Settings &rsaquo; Account &rsaquo; Delete
        account</strong>, or on the web at{" "}
        <Link href={legalPath("deleteAccount", "en")}>www.lernomi.app{legalPath("deleteAccount", "en")}</Link>. At the moment of deletion your
        account, your progress, your texts, your speaking logs, your usage events and your social traces (friendships, reactions) are
        permanently deleted; this cannot be undone. Financial records subject to a statutory retention obligation are kept in anonymised
        form. If you have a Google Play subscription, you need to cancel it separately in the Play Store.
      </p>

      <h2>12. Children</h2>
      <p>
        Lernomi is not designed for people under 18 and does not knowingly collect data from them; the terms of use limit account creation to
        people aged 18 and over (see terms, clause 3). The content is aimed at adult learners and at Goethe/telc exam preparation; because
        the app contains open-ended AI conversation and user interaction, it is not suitable for a child audience. If we discover that
        someone under 18 has created an account, we delete the account and the data; parents can write to <Ph k="privacyEmailEu" />.
      </p>

      <h2>13. Security</h2>
      <p>
        All connections are encrypted with HTTPS. Passwords are stored as irreversible hashes. Access to the server is limited to keys;
        sign-in attempts are rate limited. Destructive operations such as account deletion require a password or a fresh session. In the
        event of a breach affecting personal data we notify the authorities (in Türkiye the Board within 72 hours) under KVKK and Art.
        33-34 GDPR, and we inform you.
      </p>

      <h2>14. Changes</h2>
      <p>
        When we change this policy, the effective date and version on this page are updated; for a change that broadens the purposes of
        processing we inform you in the app and, where necessary, ask for consent again. Questions: <Ph k="privacyEmailEu" />.
      </p>
    </>
  );
}
