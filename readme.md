# xngloai

**xnglo artificial intelligence** — xnglo (xh26) bhasha ka open-source project.

---

## bhasha (language)

| | |
|---|---|
| **naam** | xnglo |
| **code** | xh26 |
| **base** | hindi / xnglo hindi |
| **script** | roman (a-z only) |
| **letters** | 26 |
| **digits** | 0-9 + lyvwpf |

---

## khaas niyam (special rules)

- sirf **a-z** letters (26) — koi special symbol nahi
- `a` -> `x` (anglo = **xnglo**, android = **xndroid**)
- `aa` -> `xx`
- hex digits 10-15 ke liye: **L Y V W P F**

---

## sandkhya (numbers)

**decimal:** `0 1 2 3 4 5 6 7 8 9`

**hex:** `0 1 2 3 4 5 6 7 8 9 L Y V W P F`

| decimal | hex | xnglo |
|---------|-----|-------|
| 10 | A | **L** |
| 11 | B | **Y** |
| 12 | C | **V** |
| 13 | D | **W** |
| 14 | E | **P** |
| 15 | F | **F** |

---

## features

- [x] xnglo dictionary (xh26)
- [x] xnglo characters (xkhr)
- [x] xnglo grammar (wyakrn)
- [x] xnglo hex numbers (lyvwpf)
- [ ] xnglo ai chatbot
- [ ] hugging face models integration
- [ ] web demo

---

## install

    git clone https://github.com/zawa8/xngloai.git
    cd xngloai

---

## usage

    python src/main.py                # interactive mode
    python src/main.py xnglo          # word lookup
    python src/main.py grammar        # wyakrn dekhein
    python src/main.py chars          # a-z + lyvwpf
    python src/main.py hex 26         # 26 -> xnglo hex

---

## structure

    xngloai/
    ├── data/
    │   ├── xnglo_dictionary.json
    │   ├── xnglo_grammar.json
    │   ├── xnglo_characters.json
    │   └── xnglo_numbers.json
    ├── docs/
    │   └── xh26_grammar.md
    ├── src/
    │   └── main.py
    ├── readme.md
    ├── requirements.txt
    └── .gitignore

---

## sarvnam (pronouns)

| xnglo | hindi | english |
|-------|-------|---------|
| mxx | मैं | i |
| tum | तुम | you |
| vxx | वह | he/she |
| hxm | हम | we |
| txm | आप लोग | you all |
| vx | वे | they |

---

## kal (tense)

| kal | suffix | udahran |
|-----|--------|---------|
| bhootkal | `-thx` | bolthx (spoke) |
| vrtman | `-tx` | boltx (speak) |
| bhavishy | `-gx` | bolgx (will speak) |

---

## contributing

pull requests welcome! pehle issue discuss karein.

---

## license

MIT
