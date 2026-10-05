#!/usr/bin/env python3
"""
xngloai — xnglo (xh26) language tool
alphabet: a-z only | hex: 0-9 + lyvwpf
"""
import json, os, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA = os.path.join(BASE, "data")

HEX_MAP = {"L":10,"Y":11,"V":12,"W":13,"P":14,"F":15}
HEX_REV = {v:k for k,v in HEX_MAP.items()}

def load(fn):
    with open(os.path.join(DATA, fn), "r", encoding="utf-8") as f:
        return json.load(f)

def lookup_word(word, d):
    word = word.lower().strip()
    w = d["words"].get(word)
    if w:
        return f"  {word} ({w['type']})\n  -> english: {w['meaning']}\n  -> hindi:   {w['hindi']}"
    return f"  '{word}' dictionary mein nahi mila."

def to_hex(n):
    if n == 0: return "0"
    neg = n < 0; n = abs(n); out = ""
    while n > 0:
        r = n % 16
        out = (str(r) if r < 10 else HEX_REV[r]) + out
        n //= 16
    return ("-" if neg else "") + out

def from_hex(s):
    s = s.upper().strip()
    neg = s.startswith("-")
    if neg: s = s[1:]
    total = 0
    for ch in s:
        if ch.isdigit(): v = int(ch)
        elif ch in HEX_MAP: v = HEX_MAP[ch]
        else: raise ValueError(f"invalid hex char: {ch}")
        total = total * 16 + v
    return -total if neg else total

def show_chars():
    c = load("xnglo_characters.json")
    print("\n=== xnglo lipi (a-z only) ===")
    print(f"alphabet: {c['alphabet']['letters']}  ({c['alphabet']['count']} letters)")
    print(f"decimal:  {c['digits']['decimal']}")
    print(f"hex full: {c['digits']['full_hex']}")
    print("hex extra: L=10 Y=11 V=12 W=13 P=14 F=15\n")
    print("rules:")
    for r in c["rules"]: print(f"  - {r}")

def show_grammar():
    g = load("xnglo_grammar.json")["grammar"]
    print("\n=== xnglo wyakrn ===\n")
    for k, v in g.items():
        print(f"* {v['title']}")
        if "rule" in v: print(f"   {v['rule']}")
        if "example" in v and isinstance(v["example"], dict):
            for k2, v2 in v["example"].items(): print(f"   {k2}: {v2}")
        if "list" in v:
            for k2, v2 in v["list"].items(): print(f"   {k2} = {v2}")
        if "types" in v:
            if isinstance(v["types"], list): print(f"   {', '.join(v['types'])}")
            else:
                for k2, v2 in v["types"].items(): print(f"   - {k2}: {v2}")
        print()

def main():
    print("+----------------------------------+")
    print("|  xngloai - xh26 (a-z + lyvwpf)   |")
    print("+----------------------------------+")

    if len(sys.argv) > 1:
        cmd = sys.argv[1].lower()
        if cmd in ("chars","xkhr"): show_chars(); return
        if cmd == "grammar": show_grammar(); return
        if cmd == "hex" and len(sys.argv) > 2:
            print(f"{sys.argv[2]} -> {to_hex(int(sys.argv[2]))}"); return
        d = load("xnglo_dictionary.json")
        print("\n" + lookup_word(cmd, d) + "\n"); return

    d = load("xnglo_dictionary.json")
    print(f"language: {d['language']} | code: {d['code']}")
    print("cmds: grammar | chars | hex <n> | <word> | exit\n")

    while True:
        try: q = input("xnglo> ").strip()
        except (EOFError, KeyboardInterrupt): print("\nbye!"); break
        if not q: continue
        if q.lower() in ("exit","quit"): print("bye!"); break
        elif q.lower() == "grammar": show_grammar()
        elif q.lower() in ("chars","xkhr"): show_chars()
        elif q.lower().startswith("hex "):
            try: print(f"  {q[4:].strip()} -> hex: {to_hex(int(q[4:].strip()))}")
            except: print("  use: hex <number>")
        else: print(lookup_word(q, d))

if __name__ == "__main__":
    main()
