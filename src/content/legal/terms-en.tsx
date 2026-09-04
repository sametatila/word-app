import Link from "next/link";
import { EntityBlock, Ph } from "@/components/legal-shell";
import { FAIR_USE, legalPath } from "@/lib/legal";

/**
 * Terms of use — English. Informational translation; the Turkish text at
 * /terms is the binding version (see clause 12b). Keep the section numbering
 * identical to the Turkish document so the two can be compared clause by clause.
 */
export const TERMS_EN_TITLE = "Terms of Use";
export const TERMS_EN_DESCRIPTION =
  "The rules for using Nomi: account, acceptable use, user content, AI, subscription, consumer rights.";
export const TERMS_EN_SUMMARY = [
  "By using Nomi you accept this agreement.",
  "The service is provided from Türkiye and governed by Turkish law. The mandatory consumer rights of your own country are unaffected.",
  "Your account is yours, and is used with respect for others. What you write stays yours.",
  "AI answers can be wrong.",
  "Premium is bought through Google Play and cancelled there.",
] as const;

export function TermsEnBody() {
  return (
    <>
      <h2>1. Parties and acceptance</h2>
      <p>
        This agreement is between the parties identified below (&quot;Nomi&quot;, &quot;we&quot;) and the person using the Nomi
        web app (www.exfe.me) or Android app (&quot;you&quot;). There are two of us: the person who designs and operates the service and is
        responsible for your data, and the person who publishes the app on Google Play and collects the subscription revenue. By creating an account or using the app you accept these terms and the{" "}
        <Link href={legalPath("privacy", "en")}>Privacy Policy</Link>. Under Turkish Law no. 6563 this text is accessible and can be stored
        before the contract is concluded. If you do not accept it, do not use the app.
      </p>
      <EntityBlock party="controller" contact locale="en" />
      <EntityBlock party="publisher" locale="en" />

      <h2>2. The service</h2>
      <p>
        Nomi is a language learning app offering vocabulary, listening, speaking and writing practice: spaced repetition rounds, lessons,
        speaking practice with AI, walk mode, writing assessment, exam preparation, a weekly leaderboard and friend features. The courses
        are German (Hochdeutsch), Zurich German and English; the course list may change over time and not every feature is ready in every
        course at the same time. Features may be added, changed or removed; we announce changes affecting paid features in advance.
      </p>

      <h2>3. Account and age</h2>
      <ul>
        <li>Nomi is intended for adults: you must be 18 or older to create an account. We close accounts we learn belong to someone under 18 and delete their data.</li>
        <li>Your account details must be accurate; never share your password. You are responsible for activity on your account; tell us if you notice unauthorised use.</li>
        <li>You can delete your account at any time: in the app under Profile &rsaquo; Settings &rsaquo; Account, or on the web via the <Link href={legalPath("deleteAccount", "en")}>account deletion page</Link>. Deletion cannot be undone.</li>
      </ul>

      <h2>4. Acceptable use</h2>
      <p>You may not:</p>
      <ul>
        <li>use insults, hate speech, harassment, sexual content, impersonation, disclosure of personal data or advertising in your display name or in any text you share,</li>
        <li>manipulate the leaderboard, streaks or quests through automation, fake accounts or cheating,</li>
        <li>reverse engineer, scrape or overload the service, or block others&apos; access to it,</li>
        <li>use the AI speaking practice to produce unlawful or harmful content, or content targeting other people,</li>
        <li>breach applicable law, including intellectual property, personal data and sanctions rules.</li>
      </ul>
      <p>
        In case of a breach we may remove content, restrict features or close the account; we tell you the decision and its reason, and you
        can appeal at <Ph k="supportEmail" />. Serious breaches do not require prior warning.
      </p>

      <h2>5. Your content and reporting</h2>
      <p>
        The texts you write, the transcripts of what you say and your display name are yours. You grant us only the worldwide,
        non-exclusive, royalty-free licence needed to provide the service: to assess your work, generate feedback and show as much as you
        choose (display name, progress) to other users. We do not use your content for advertising or model training; the licence ends when
        you delete your account.
      </p>
      <p>
        If you see content that is unlawful or breaches these terms (another user&apos;s name or behaviour), you can report it with the
        &quot;Report&quot; button in the app or at <Ph k="supportEmail" />; this is also the single point of contact for notices under the EU
        Digital Services Act (DSA). Reports are reviewed by a human; the decision and the route of appeal are communicated to the reporter
        and to the content owner. The friend features include block and report buttons.
      </p>

      <h2>5a. Social features</h2>
      <ul>
        <li>A username is 3-20 characters of letters, digits and underscores; you may not use someone else&apos;s name, a trademark or a misleading identity. Inappropriate names may be changed.</li>
        <li>Your social profile is public by default; you manage visibility, friend requests and activity sharing under Settings &rsaquo; Social.</li>
        <li>Blocking is mutual and is not notified. Reports are reviewed by a human; false or malicious reports are themselves a breach of the rules.</li>
        <li>There is no private messaging; reactions, nudges and shared quests are limited to your friends.</li>
      </ul>

      <h2>6. AI content</h2>
      <ul>
        <li>Speaking practice and assessments are produced by language models; the app states clearly where you are interacting with an AI. Answers can be wrong, incomplete or inconsistent; grammar corrections must not be treated as definitive.</li>
        <li>You can report an offensive or incorrect answer without leaving the app, using &quot;Report&quot; under that answer.</li>
        <li>AI characters are not real people; they do not give medical, legal or financial advice.</li>
      </ul>

      <h2>7. Premium subscription, payment and withdrawal</h2>
      <ul>
        <li><strong>Purchase:</strong> Premium is bought on Android through Google Play Billing; payment is processed by Google Play and the Google Play Terms of Service also apply. Price, currency, term, trial conditions and taxes are shown by Play at the moment of purchase; this information constitutes the pre-contractual information required by Turkish Law no. 6502 and the Distance Contracts Regulation.</li>
        <li><strong>Renewal and cancellation:</strong> Unless cancelled at least 24 hours before the end of the term, the subscription renews for the same period. Cancellation and management are in Play Store &rsaquo; Payments and subscriptions; deleting your account does not cancel the subscription. If you cancel before a free trial ends, you are not charged.</li>
        <li><strong>Right of withdrawal:</strong> Because performance of a digital content service begins at the moment of purchase, under Art. 15/1-ğ of the Distance Contracts Regulation and Art. 16(m) of the EU Consumer Rights Directive the right of withdrawal ends with your consent to performance beginning; that consent is requested on the purchase screen. Google Play&apos;s refund policy applies in addition, and we honour refunds Play grants.</li>
        <li><strong>Price changes:</strong> We notify price changes through Play before they take effect; if you do not accept one, you can cancel the subscription.</li>
        <li><strong>Proof of purchase:</strong> You buy Premium through Google Play, and Google issues the receipt and sends it to the e-mail address on your Play account; you can request a copy through Google Play support. The publisher is not a company but a natural person, and because the earnings fall within the Turkish income tax exemption for mobile application development, no separate invoice is issued.</li>
      </ul>

      <h2>7a. Fair use</h2>
      <p>
        To protect AI and speech recognition provider quotas for everyone, daily per-account limits apply: {FAIR_USE.roleplayTurnsPerDay}{" "}
        speaking practice turns, {FAIR_USE.sttRequestsPerDay} server speech recognition requests, {FAIR_USE.pronounceRequestsPerDay}{" "}
        pronunciation scoring requests and {FAIR_USE.reportsPerDay} content reports. When you reach a limit the app says so and it reopens
        the next day. The limits sit far above honest heavy use; they exist only to stop automation and abuse and may be updated when needed.
      </p>

      <h2>7b. Third-party services</h2>
      <p>
        Sign-in with Google (Google Account terms), Google Play (Play Terms of Service and refund policy) and your device&apos;s speech
        recognition service are subject to their own providers&apos; terms. The AI and speech recognition providers are listed in the Privacy
        Policy; they are our sub-processors and do not enter into a contract with you directly.
      </p>

      <h2>8. Intellectual property</h2>
      <p>
        The app, its design, the mascot, the sound effects and the lesson content belong to Nomi and are protected by Turkish Law no. 5846
        on Intellectual and Artistic Works and by international conventions. The A1-B1 part of the word lists is based on the official
        Goethe-Institut word lists; Goethe-Institut and telc are trademarks of their respective owners and Nomi is not affiliated with them.
        Copying, distributing or making derivative works is not permitted beyond personal learning use.
      </p>

      <h2>9. Continuity of the service</h2>
      <p>
        We provide the service &quot;as is&quot;. Maintenance, provider outages or quotas can temporarily disable some features (e.g. server
        speech recognition, AI conversation); the app shows this and falls back to the on-device alternative where possible. If a paid
        feature stays unavailable for a long period, we give a proportionate refund or extend the term.
      </p>

      <h2>10. Limitation of liability</h2>
      <p>
        Nomi is a learning tool; it gives no guarantee about an exam result, a level of language proficiency or the correctness of a
        decision. Except for intent and gross negligence, we are not liable for indirect damage arising from the service; our total
        liability is limited to the subscription fees you paid in the last 12 months. Your rights as a consumer under Turkish law and under
        the mandatory provisions of your country of residence are unaffected; this clause does not narrow them.
      </p>

      <h2>10a. Indemnity</h2>
      <p>
        If third parties bring claims against Nomi because you breached these terms or applicable law (e.g. content infringing someone
        else&apos;s rights, an attack on the service, cheating), you are responsible for those claims and damages to the extent of your
        fault. For consumers this clause applies only in cases of intent and gross negligence.
      </p>

      <h2>11. Termination</h2>
      <p>
        You can delete your account whenever you like. We may close an account with reasonable notice if these terms are breached or if the
        service ends; should the service end entirely, we give at least 30 days&apos; notice, offer a way to download your data and refund
        the unused part of any subscription.
      </p>

      <h2>12. Governing law and dispute resolution</h2>
      <p>
        This agreement is governed by the law of the Republic of Türkiye. In a dispute we first seek an amicable solution via{" "}
        <Ph k="supportEmail" />. Consumers in Türkiye may apply, within the applicable monetary thresholds, to the Consumer Arbitration
        Committees and the consumer courts; for other disputes the courts and enforcement offices of <Ph k="court" /> have jurisdiction.
        The rights of consumers resident in the EU and the United Kingdom under the mandatory consumer provisions of their country and their
        right to bring proceedings before their own courts are unaffected; for users in other countries local mandatory provisions are
        reserved.
      </p>

      <h2>12a. Force majeure</h2>
      <p>
        Obligations are suspended for the duration of events beyond the parties&apos; control, such as natural disaster, war, epidemic,
        large-scale internet or infrastructure outage, provider insolvency and administrative decisions; if an interruption exceeds 30 days
        either party may terminate the agreement and the unused subscription period is refunded.
      </p>

      <h2>12b. General provisions</h2>
      <ul>
        <li><strong>Entire agreement:</strong> These terms, the Privacy Policy and the pre-contractual information on the purchase screen form the whole of the agreement between the parties.</li>
        <li><strong>Severability:</strong> If a provision is held invalid, the others are unaffected; the invalid provision is deemed replaced by the valid provision closest to its purpose.</li>
        <li><strong>Assignment:</strong> You may not assign your account or your rights under this agreement. We may assign the agreement in the event of a transfer of the service or if the activity is moved into a company structure, preserving your rights and notifying you.</li>
        <li><strong>Waiver:</strong> Not exercising a right does not mean waiving it.</li>
        <li><strong>Language:</strong> The binding language of the agreement is Turkish; translations are for information. In case of a difference in interpretation, the Turkish text prevails.</li>
        <li><strong>Notices:</strong> Notices to us go to <Ph k="supportEmail" />; notices to you go to the e-mail address on your account or as an in-app message, and are deemed served upon arrival.</li>
        <li><strong>Retention:</strong> This agreement is stored electronically; you may request the version you accepted and its date.</li>
      </ul>

      <h2>13. Changes and contact</h2>
      <p>
        When we update these terms, the effective date and version change; we announce material changes to your detriment at least 30 days
        in advance in the app and by e-mail, and you may close your account if you do not accept them. Questions: <Ph k="supportEmail" />.
        
      </p>
    </>
  );
}
