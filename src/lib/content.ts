/**
 * Original editorial content for Accent Characters.
 */

export interface AccentType {
  id: string;
  mark: string;
  name: string;
  short: string;
  examples: string;
  body: string;
}

export const ACCENT_TYPES: AccentType[] = [
  {
    id: "acute",
    mark: "´",
    name: "Acute Accent",
    short: "Stress and pitch",
    examples: "á · é · í · ó · ú",
    body: "The acute accent marks a vowel that is stressed, lengthened or raised in pitch. It is one of the most common diacritics worldwide — without it, the French word café would lose its final syllable, and Spanish question words like qué and dónde would read differently.",
  },
  {
    id: "grave",
    mark: "`",
    name: "Grave Accent",
    short: "Open vowels & tone",
    examples: "à · è · ì · ò · ù",
    body: "Placed over a vowel, the grave accent typically signals an open vowel quality or a lower tone. In French it can even change meaning completely — ou means “or”, while où means “where”. Italian, Vietnamese and many African languages rely on it too.",
  },
  {
    id: "circumflex",
    mark: "^",
    name: "Circumflex",
    short: "Vowel quality & history",
    examples: "â · ê · î · ô · û",
    body: "The little “hat” over a vowel often marks a historical letter that has disappeared — the French forêt was once “forest”. In Portuguese, Romanian and Welsh it changes the vowel sound itself, and in pinyin it can mark tone.",
  },
  {
    id: "tilde",
    mark: "~",
    name: "Tilde",
    short: "Nasal sounds",
    examples: "ã · ñ · õ",
    body: "The wavy tilde usually turns a vowel nasal — essential in Portuguese words like São and pão. Its most famous job sits on the Spanish ñ, which is counted as a separate letter of the alphabet, turning “ano” into año and changing the meaning entirely.",
  },
  {
    id: "diaeresis",
    mark: "¨",
    name: "Diaeresis / Umlaut",
    short: "Separate or shifted vowels",
    examples: "ä · ë · ï · ö · ü",
    body: "Two dots, two jobs. A diaeresis tells you to pronounce a vowel on its own rather than as part of a pair (naïve, Zoë). The German umlaut uses the same dots to shift the vowel forward in the mouth — schön versus “schon”.",
  },
  {
    id: "cedilla",
    mark: "¸",
    name: "Cedilla",
    short: "Softens hard consonants",
    examples: "ç · ş · ţ",
    body: "The little hook under a letter softens it. A cedilla under c makes it sound like “s” before a, o and u — which is why façade and garçon read the way they do. Turkish extends the same trick to ş and uses it in thousands of everyday words.",
  },
  {
    id: "macron",
    mark: "¯",
    name: "Macron",
    short: "Long vowels",
    examples: "ā · ē · ī · ō · ū",
    body: "The flat line above a vowel lengthens it. Māori, Hawaiian and Latvian spelling depend on macrons — tū versus tu can draw a line between entirely different words — and romanised Japanese uses ō and ū to keep long vowels honest.",
  },
  {
    id: "caron",
    mark: "ˇ",
    name: "Caron (Háček)",
    short: "Slavic sibilants",
    examples: "č · š · ž · ř · ď",
    body: "The inverted “v” reshapes consonants across Central and Eastern Europe. It gives Czech and Croatian their č, š and ž — the “ch”, “sh” and “zh” sounds — and turns the humble letter r into Dvořák’s famously untranslatable ř.",
  },
  {
    id: "ring",
    mark: "˚",
    name: "Ring Above",
    short: "Scandinavian vowels",
    examples: "å · ů",
    body: "The small circle sits almost exclusively over a and u. Danish, Norwegian and Swedish treat å as a completely separate vowel that sorts at the very end of their alphabets — so Aalborg is filed a long way from “Alborg”.",
  },
  {
    id: "ogonek",
    mark: "˛",
    name: "Ogonek",
    short: "Nasal vowels",
    examples: "ą · ę · į · ų",
    body: "The mirror-image of the cedilla, the ogonek curls to the right and nasalises the vowel above it. Polish leans on ą and ę in some of its most recognisable words — including the language’s own name, język.",
  },
];

export interface WordShortcut {
  result: string;
  keys: string;
  then: string;
}

/** Microsoft Word accent shortcuts (US keyboard). */
export const WORD_SHORTCUTS: WordShortcut[] = [
  { result: "á é í ó ú ý", keys: "Ctrl + ' (apostrophe)", then: "the vowel" },
  { result: "à è ì ò ù", keys: "Ctrl + ` (grave)", then: "the vowel" },
  { result: "â ê î ô û", keys: "Ctrl + Shift + ^", then: "the vowel" },
  { result: "ã ñ õ", keys: "Ctrl + Shift + ~ (tilde)", then: "a, n or o" },
  { result: "ä ë ï ö ü ÿ", keys: "Ctrl + Shift + : (colon)", then: "the vowel or y" },
  { result: "å Å", keys: "Ctrl + Shift + @", then: "a or A" },
  { result: "æ Æ", keys: "Ctrl + Shift + &", then: "a or A" },
  { result: "œ Œ", keys: "Ctrl + Shift + &", then: "o or O" },
  { result: "ç Ç", keys: "Ctrl + , (comma)", then: "c or C" },
  { result: "ð Ð", keys: "Ctrl + ' (apostrophe)", then: "d or D" },
  { result: "ø Ø", keys: "Ctrl + /", then: "o or O" },
  { result: "ß", keys: "Ctrl + Shift + &", then: "s" },
  { result: "¿", keys: "Alt + Ctrl + Shift + ?", then: "—" },
  { result: "¡", keys: "Alt + Ctrl + Shift + !", then: "—" },
];

export interface MacShortcut {
  accent: string;
  result: string;
  keys: string;
  then: string;
}

/** macOS Option-key accent input. */
export const MAC_SHORTCUTS: MacShortcut[] = [
  { accent: "Acute ´", result: "á é í ó ú", keys: "Option + E", then: "the vowel" },
  { accent: "Grave `", result: "à è ì ò ù", keys: "Option + `", then: "the vowel" },
  { accent: "Circumflex ^", result: "â ê î ô û", keys: "Option + I", then: "the vowel" },
  { accent: "Tilde ~", result: "ã ñ õ", keys: "Option + N", then: "a, n or o" },
  { accent: "Umlaut ¨", result: "ä ë ï ö ü ÿ", keys: "Option + U", then: "the vowel or y" },
  { accent: "Cedilla Ç", result: "ç Ç", keys: "Option + C (Shift for Ç)", then: "—" },
];

export interface Faq {
  q: string;
  a: string;
}

export const HOME_FAQS: Faq[] = [
  {
    q: "What is an accent letter?",
    a: "An accent letter is a regular alphabet character combined with a diacritical mark — a small sign placed above it (á), below it (ç) or through it (ø). Also called diacritics, these marks fine-tune how a letter sounds: they can stress a vowel, lengthen it, nasalise it or give a consonant an entirely new voice. Languages from French and Spanish to Polish, Vietnamese and Yoruba treat many accented forms as letters in their own right.",
  },
  {
    q: "How do I copy and paste an accented letter?",
    a: "Click any tile on Accent Characters and the character is copied straight to your clipboard — no selection, no keyboard shortcut, no sign-up. Then paste it wherever you like with Ctrl + V (Windows) or Cmd + V (Mac). Every character here is standard Unicode, so it works in Word, Google Docs, Excel, email, social networks and code editors alike.",
  },
  {
    q: "How do I type accent letters on a keyboard?",
    a: "You have three reliable options. On Windows, hold Alt and type the character’s four-digit ALT code on the numeric keypad (for example Alt + 0233 produces é). In Microsoft Word, accent shortcuts are faster: press Ctrl + ' then a vowel for an acute accent. On a Mac, press Option plus the accent key (Option + E for acute), release, then type the letter. And whenever shortcuts fail, the copy-and-paste grid above always works.",
  },
  {
    q: "What are ALT codes for accented letters?",
    a: "ALT codes are number combinations that insert characters on Windows. Hold the Alt key, type the decimal number on the numeric keypad, then release Alt. Codes below 256 work everywhere Windows does — Alt + 0241 gives ñ — while longer codes such as Alt + 7801 (ṙ) work in Word and other Unicode-aware apps. Our ALT codes reference lists one for every letter on this page.",
  },
  {
    q: "How do I type accented characters on a phone or tablet?",
    a: "On iOS and Android, tap and hold a letter key on the on-screen keyboard — a pop-up menu appears with every accented variation, and you simply slide your finger to the one you need. Holding the vowel keys gives you á, à, â, ä and more; holding N reveals ñ. It is the quickest method on mobile, though this page works perfectly in a mobile browser too.",
  },
  {
    q: "Will these accented letters work everywhere?",
    a: "Yes. Each character is an official Unicode code point, not an image or a custom font glyph, so it behaves like ordinary text: searchable, editable and translatable. It will display correctly in modern browsers, Microsoft Office, Google Workspace, Adobe apps, messaging platforms and every major programming environment. Only a few very old systems with legacy encodings may substitute a fallback glyph.",
  },
  {
    q: "What is the difference between a diaeresis and an umlaut?",
    a: "They look identical — two dots above a vowel — but they do different work. A diaeresis, used in French and English loan-words like naïve, tells you to pronounce the vowel separately from its neighbour. An umlaut, used in German, reshapes the vowel itself (schön sounds nothing like “schon”). Unicode assigns both roles to the same character set, so the letters on Accent Characters work for either language.",
  },
  {
    q: "Is Accent Characters free to use?",
    a: "Completely. There is no account, no download and no limit. The collection loads as a single static page, works instantly on desktop and mobile, and every character copies to your clipboard with one click. Bookmark it once and never memorise a key combination again.",
  },
];

export const FAQ_NOTE =
  "Can’t find the character you need? Try the search bar above — it matches names, Unicode values and ALT codes.";

/**
 * Original editorial notes for each letter page — where its accented
 * forms live, and why they matter.
 */
export const LETTER_NOTES: Record<string, string> = {
  a: "A carries more accents than almost any other letter. French gives us à, Spanish and Portuguese lean on á and â, Germanic and Scandinavian alphabets add ä and å as full letters, and Vietnamese can layer two marks at once — ấ, ậ, ẫ — on a single vowel.",
  b: "Accented forms of B come mostly from African orthographies and phonetic script, where ɓ (B with hook) marks an implosive sound and ƀ (B with stroke) appears in historic spellings. Linguists use the dotted and barred variants ḃ, ḅ and ḇ for precise transcription.",
  c: "C is transformed by two very different marks: the cedilla underneath softens it to an “s” in French and Portuguese (ça, aço), while the caron above turns it into the “ch” of Czech and Croatian (č). Ċ, ċ keeps time in Maltese and Irish uncial script.",
  d: "D gains a caron in Czech and Slovak (ď), a stroke in Bosnian, Croatian, Vietnamese and Sámi (đ, Đ), and a second, older identity in Icelandic and Faroese — the letter eth (ð, Ð), which carries the soft “th” of “this”.",
  e: "E is the workhorse of accented letters. French alone needs four of them — é, è, ê and ë — each with a distinct sound. Macrons (ē) lengthen it in Latvian and romanised Japanese, ę nasalises it in Polish, and ě reshapes it in Czech.",
  f: "F keeps its accents mostly in technical territory: ḟ appears in Irish lenition, and the hooked ƒ serves African languages such as Ewe. Its small collection makes it one of the rarest accented letters.",
  g: "G softens under a cedilla in Latvian (ģ), breathes under a circumflex in Esperanto (ĝ), and gains a caron in Romani (ǧ). Turkish replaces the sound entirely with ğ — the “soft g” that lengthens the vowel before it.",
  h: "H with a stroke (ħ, Ħ) is a full member of the Maltese alphabet, pronounced deep in the throat. Esperanto adds ĥ, and Semitic transliteration uses the underdotted ḥ for the Arabic letter ḥāʾ.",
  i: "I wears the full diacritic wardrobe: acute and grave in Romance languages, circumflex in French and Welsh (î), diaeresis in naïve, tilde in Greenlandic, and a macron in Māori and Latvian. Istanbul’s dotted capital İ is a letter of its own in Turkish.",
  j: "J normally keeps its dot, but ancient Greek scholarship and Czech stack a caron on it (ǰ), Esperanto drops the dot for a circumflex (ĵ), and Dutch digraphs pair it with I as Ĳ on street signs from Amsterdam to Vlissingen.",
  k: "K with an acute (ḱ) marks stress in Macedonian transliteration, while ķ (K with cedilla) belongs to Latvian, where it fronts the consonant. The hooked ƙ serves several West African alphabets.",
  l: "L splits three ways. Polish turns ł into a “w” sound, making Wałęsa nearly impossible to guess from its spelling. Croatian pairs it with j (ǉ). Catalan writes a middle dot (ŀ) between doubled Ls, and Slovak stretches it with acute and caron forms.",
  m: "M’s accented forms — ḿ, ṁ and ṃ — appear mostly in scholarly transliteration, from Sanskrit’s anunāsika to ISO conventions for Semitic scripts, where a dot above or below pins down the exact nasal sound.",
  n: "N’s most famous accent is the Spanish tilde: ñ is a separate letter that sorts after n in Spanish dictionaries, and España simply cannot be spelled without it. Czech adds ň, Polish ń, and phonetics contributes the hooked ɲ.",
  o: "O collects the Scandinavian split: Danish, Norwegian and Faroese make ø a distinct vowel, while Swedish treats ö the same way. Hungarian doubles the acute into ő, Portuguese nasalises it into õ, and Vietnamese crowns it with ố, ồ and ỡ.",
  p: "P with a stroke (ᵽ) serves phonetic notation, and the hooked ƥ (capital Ƥ) appears in historic West African orthographies. Tiny but complete, P’s accented family is a favourite of linguists.",
  q: "Q almost never takes a diacritic — it is the rarest accent letter of all. Its hooked forms ɋ and Ɋ survive in historical Latin transcriptions of Native American and Caucasian languages.",
  r: "R’s accents sort Europe from east to west. Czech and Slovak roll ŕ and famously shape ř — the sound in Dvořák that English speakers can barely pronounce. Romanian tucks a comma beneath (r̦), and Old Norse scholarship keeps the letter ȓ alive.",
  s: "S changes identity with a caron: š is the “sh” of Prague and Sarajevo. Turkish and Romanian place a cedilla below (ş, ș), Esperanto adds a circumflex (ŝ), and German owns the double-s ß outright — a letter with no uppercase twin until ẞ arrived in 2017.",
  t: "T with a caron (ť) belongs to Czech and Slovak; with a cedilla (ţ) to the historic orthographies of Romanian; with a stroke (ŧ) to Sámi, where it marks a dental stop. The hooked ƭ is the voice of several West African scripts.",
  u: "U accumulates Europe’s favourite marks: German ü, French ù and û, Spanish ú, Hungarian ű, and Lithuanian ų. The Czech ring (ů) survives only in this letter — a curiosity dating from the sixteenth century.",
  v: "V rarely accents in living alphabets, which is exactly why its tilde (ṽ) and hook (ʋ) forms matter: phoneticians deploy them to notate the labiodental nasal and approximant sounds of African and Asian languages.",
  w: "W is the only letter accented as a full member of a modern alphabet: Welsh treats ŵ and Ŵ as long “oo” vowels all on their own. Elsewhere, grave (ẁ), acute (ẃ) and diaeresis (ẅ) forms serve African orthographies and older English poetry.",
  x: "X with a dot (ẋ) or diaeresis (ẍ) appears almost exclusively in linguistic transcription — Romance philology uses ẋ to mark a fricative in older Catalan and Occitan texts. Four characters; a complete museum.",
  y: "Y spans two scripts: ý and ÿ serve Czech, Slovak, Icelandic and French usage, while Turkmen promotes Ÿ to alphabet status. The hooked ƴ and stroked ɏ serve Guinea and early Cyrillic transliteration.",
  z: "Z splits into the sharp and the soft: Polish writes both ź and ż, nearly every Slavic and Baltic language shares ž with its “zh” sound, and the medieval ezh ʒ lives on in phonetic transcription as the sound of “measure”.",
};
